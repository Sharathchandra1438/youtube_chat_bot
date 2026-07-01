# 🎥 YouTube AI Chat Chrome Extension

An AI-powered Chrome Extension that lets users chat with any YouTube video's transcript using **LangChain**, **FAISS**, **FastAPI**, and **Llama 3.1**.

Simply enter a YouTube Video ID, load the transcript, and ask questions about the video. The extension retrieves relevant transcript chunks using Retrieval-Augmented Generation (RAG) and answers questions based only on the video's content.

---

# 🚀 Features

- 📺 Chat with any YouTube video transcript
- 🤖 AI-powered answers using Llama 3.1
- 🔍 Retrieval-Augmented Generation (RAG)
- 📑 Automatic transcript retrieval
- ⚡ FAISS vector database for semantic search
- 🧠 Sentence Transformer embeddings
- 🌐 Chrome Extension frontend
- 🚀 FastAPI backend
- ☁️ Deployable backend (Railway, Render, Azure, AWS, etc.)

---

# 🏗️ Project Architecture

```
                    User

          Chrome Extension
        (popup.html + popup.js)
                 │
                 │ HTTP Request
                 ▼
         FastAPI Backend
         (Python + LangChain)
                 │
      -------------------------
      │                       │
      ▼                       ▼
YouTube Transcript API     HuggingFace
                            Llama 3.1

                 │
                 ▼
          Sentence Transformer
          Embeddings

                 │
                 ▼
             FAISS Index

                 │
                 ▼
            Relevant Context

                 │
                 ▼
             AI Response
```

---

# 📁 Project Structure

```
youtube-chat-extension/

│
├── backend/
│   │
│   ├── app.py
│   ├── rag.py
│   ├── requirements.txt
│   ├── .env
│   └── ...
│
└── extension/
    │
    ├── manifest.json
    ├── popup.html
    ├── popup.css
    ├── popup.js
    ├── icon.png
    └── ...
```

---

# 🛠️ Technologies Used

### Backend

- Python
- FastAPI
- LangChain
- HuggingFace
- Llama 3.1 8B
- FAISS
- Sentence Transformers
- YouTube Transcript API

### Frontend

- HTML
- CSS
- JavaScript
- Chrome Extension Manifest V3

---

# ⚙️ Installation

## 1. Clone Repository

```bash
git clone https://github.com/yourusername/youtube-chat-extension.git

cd youtube-chat-extension
```

---

## 2. Create Virtual Environment

Windows

```bash
python -m venv venv

venv\Scripts\activate
```

Linux / Mac

```bash
python3 -m venv venv

source venv/bin/activate
```

---

## 3. Install Dependencies

```bash
pip install -r requirements.txt
```

---

## 4. Create .env File

Inside the backend folder create

```
.env
```

Add your HuggingFace API Key

```env
HF_TOKEN=YOUR_HUGGINGFACE_API_KEY
```

---

# ▶️ Running the Backend

Navigate to backend

```bash
cd backend
```

Start FastAPI

```bash
uvicorn app:app --reload
```

Backend will run on

```
http://127.0.0.1:8000
```

Swagger Documentation

```
http://127.0.0.1:8000/docs
```

---

# 📦 API Endpoints

## Load Video

```
POST /load-video
```

Example

```json
{
    "video_id":"LPZh9BOjkQs"
}
```

Response

```json
{
    "status":"success"
}
```

---

## Chat

```
POST /chat
```

Example

```json
{
    "question":"What is this video about?"
}
```

Response

```json
{
    "answer":"..."
}
```

---

# 🌐 Loading Chrome Extension

Open Chrome

```
chrome://extensions
```

Enable

```
Developer Mode
```

Click

```
Load unpacked
```

Select

```
extension/
```

The extension is now installed.

---

# 💬 Using the Extension

1. Open the extension.
2. Enter a YouTube Video ID.
3. Click **Load Video**.
4. Wait until the transcript is indexed.
5. Ask any question.
6. Receive answers generated from the transcript.

---

# 🧠 How RAG Works

### Step 1

Fetch Transcript

```
YouTube Transcript API
```

↓

### Step 2

Split transcript

```
RecursiveCharacterTextSplitter
```

↓

### Step 3

Generate embeddings

```
all-MiniLM-L6-v2
```

↓

### Step 4

Store embeddings

```
FAISS
```

↓

### Step 5

Retrieve relevant chunks

↓

### Step 6

Send context to Llama 3.1

↓

### Step 7

Generate final answer

---

# 📚 Example Workflow

```
User Question

        │

        ▼

Retrieve Similar Chunks

        │

        ▼

Prompt Template

        │

        ▼

Llama 3.1

        │

        ▼

Answer
```

---

# 🔒 Environment Variables

```
HF_TOKEN=your_huggingface_api_key
```

Never expose this key in the Chrome Extension.

---

# 📌 Current Limitations

- Requires transcript availability.
- Supports English transcripts.
- Builds a new FAISS index when a different video is loaded.
- Uses Hugging Face Inference API (subject to API limits).

---

# 🚀 Future Improvements

- Automatically detect the current YouTube video ID.
- Conversation history.
- Streaming AI responses.
- Multiple LLM providers (OpenAI, Gemini, Groq).
- Persistent FAISS caching.
- Voice input.
- Dark mode.
- Export conversation.
- Support multilingual transcripts.
- User authentication.
- Cloud deployment.
- Docker support.

---

# ☁️ Deployment

The backend can be deployed to:

- Railway
- Render
- Google Cloud Run
- Microsoft Azure
- AWS
- DigitalOcean

Update the extension's API URL to point to your deployed backend.

---

# 📄 License

This project is licensed under the MIT License.

---

# 🙌 Acknowledgements

- LangChain
- Hugging Face
- FastAPI
- FAISS
- Sentence Transformers
- YouTube Transcript API

---

# ⭐ Support

If you found this project useful, consider giving it a ⭐ on GitHub.

Contributions, issues, and feature requests are welcome!
