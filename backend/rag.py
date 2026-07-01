from dotenv import load_dotenv
import warnings

warnings.filterwarnings("ignore", category=DeprecationWarning)

from youtube_transcript_api import YouTubeTranscriptApi
from youtube_transcript_api._errors import (
    TranscriptsDisabled,
    NoTranscriptFound,
)

from langchain_huggingface import (
    ChatHuggingFace,
    HuggingFaceEndpoint,
    HuggingFaceEmbeddings,
)

from langchain_text_splitters import RecursiveCharacterTextSplitter

from langchain_community.vectorstores import FAISS

from langchain_core.prompts import PromptTemplate

from langchain_core.runnables import (
    RunnableParallel,
    RunnablePassthrough,
    RunnableLambda,
)

from langchain_core.output_parsers import StrOutputParser


load_dotenv()


llm = HuggingFaceEndpoint(
    repo_id="meta-llama/Llama-3.1-8B-Instruct",
    task="text_generation",
)

model = ChatHuggingFace(llm=llm)

embeddings = HuggingFaceEmbeddings(
    model_name="sentence-transformers/all-MiniLM-L6-v2"
)


main_chain = None
current_video = None


def format_docs(docs):
    return "\n\n".join(doc.page_content for doc in docs)


def load_video(video_id: str):

    global main_chain
    global current_video

    try:

        fetched_transcript = YouTubeTranscriptApi().fetch(
            video_id,
            languages=["en", "en-US", "en-GB"]
        )

        transcript_list = fetched_transcript.to_raw_data()

        transcript = " ".join(
            chunk["text"] for chunk in transcript_list
        )

    except TranscriptsDisabled:
        raise Exception("Transcript is disabled for this video.")

    except NoTranscriptFound:
        raise Exception("No English transcript found.")

    except Exception as e:
        raise Exception(str(e))

    splitter = RecursiveCharacterTextSplitter(
        chunk_size=1000,
        chunk_overlap=200,
    )

    chunks = splitter.create_documents([transcript])

    vector_store = FAISS.from_documents(
        chunks,
        embeddings,
    )

    retriever = vector_store.as_retriever(
        search_type="similarity",
        search_kwargs={"k": 4},
    )

    prompt = PromptTemplate(
        template="""
You are a helpful AI assistant.

Answer ONLY from the provided transcript.

If the answer is not present in the transcript,
reply with:

"I don't know based on the provided transcript."

Transcript:

{context}

Question:
{question}

Answer:
""",
        input_variables=["context", "question"],
    )

    parallel_chain = RunnableParallel(
        {
            "context": retriever | RunnableLambda(format_docs),
            "question": RunnablePassthrough(),
        }
    )

    parser = StrOutputParser()

    main_chain = (
        parallel_chain| prompt| model| parser
    )

    current_video = video_id

    return {
        "status": "success",
        "video_id": video_id,
        "chunks": len(chunks),
    }

def ask_question(question: str):

    global main_chain

    if main_chain is None:
        raise Exception(
            "No video loaded. Load a video first."
        )

    answer = main_chain.invoke(question)

    return answer

def get_current_video():
    return current_video