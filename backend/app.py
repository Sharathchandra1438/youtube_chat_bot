from fastapi import FastAPI
from pydantic import BaseModel

from rag import load_video, ask_question

app = FastAPI()


class VideoRequest(BaseModel):
    video_id: str


class ChatRequest(BaseModel):
    question: str


@app.post("/load-video")
def load(req: VideoRequest):

    result = load_video(req.video_id)

    return result


@app.post("/chat")
def chat(req: ChatRequest):

    answer = ask_question(req.question)

    return {
        "answer": answer
    }