# 🎥 YouTube AI Chat Extension

An AI-powered Chrome Extension that allows users to chat with any YouTube video using Retrieval-Augmented Generation (RAG).

The extension automatically detects the currently opened YouTube video, retrieves its transcript, creates a semantic vector database using FAISS, and answers user questions using Llama 3.1 through LangChain.

---

# 🚀 Features

- 🎥 Automatically detects the current YouTube video
- 📜 Retrieves English YouTube transcripts
- 🤖 Chat with any supported YouTube video
- 🧠 Retrieval-Augmented Generation (RAG)
- 🔍 Semantic search using FAISS
- ⚡ FastAPI backend
- 🦜 LangChain pipeline
- 💬 Interactive Chrome Extension UI
- 🚀 Easily deployable backend

---

# 📸 Demo Workflow

```
Open YouTube Video
        │
        ▼
Click Extension
        │
        ▼
Automatically Detect Video ID
        │
        ▼
Load Transcript
        │
        ▼
Build FAISS Vector Store
        │
        ▼
Ask Questions
        │
        ▼
AI Answers from Transcript
```

---

# 🏗️ Architecture

```
                     User

                      │
                      ▼

          Chrome Extension (Popup)

                      │
                      ▼

              FastAPI Backend

                      │

      ┌───────────────┴───────────────┐
      ▼                               ▼

YouTube Transcript API          Hugging Face Llama 3.1

      │                               ▲
      ▼                               │

Transcript                LangChain Prompt

      │
      ▼

Text Splitter

      │
      ▼

Sentence Transformers

      │
      ▼

FAISS Vector Store

      │
      ▼

Retriever

      │
      ▼

AI Response
```

---

# 📂 Project Structure

```
youtube-chat-extension/

│

├── backend/

│   ├── app.py
│   ├── rag.py
│   ├── requirements.txt
│   ├── .env
│   └── ...

│

└── extension/

    ├── manifest.json
    ├── popup.html
    ├── popup.css
    ├── popup.js
    ├── icon.png
    └── ...
```

---

# 🛠 Technologies Used

## Backend

- Python
- FastAPI
- LangChain
- HuggingFace
- FAISS
- Sentence Transformers
- YouTube Transcript API

## Frontend

- HTML
- CSS
- JavaScript
- Chrome Extension Manifest V3

## AI

- Llama 3.1 8B Instruct
- all-MiniLM-L6-v2 Embeddings

---

# ⚙️ Installation

## Clone Repository

```bash
git clone https://github.com/yourusername/youtube-chat-extension.git

cd youtube-chat-extension
```

---

## Create Virtual Environment

Windows

```bash
python -m venv venv

venv\Scripts\activate
```

Linux / macOS

```bash
python3 -m venv venv

source venv/bin/activate
```

---

## Install Dependencies

```bash
pip install -r requirements.txt
```

---

## Configure Environment Variables

Create a `.env` file inside the backend folder.

```env
HF_TOKEN=YOUR_HUGGINGFACE_API_KEY
```

---

# ▶️ Run Backend

Navigate to backend

```bash
cd backend
```

Start FastAPI

```bash
uvicorn app:app --reload
```

Backend URL

```
http://127.0.0.1:8000
```

Swagger API

```
http://127.0.0.1:8000/docs
```

---

# 🧩 Load Chrome Extension

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

Select the **extension** folder.

---

# 💬 Usage

1. Open any YouTube video.
2. Click the extension icon.
3. The extension automatically detects the current video.
4. Click **Load Transcript**.
5. Wait until the transcript is processed.
6. Ask questions about the video.
7. Receive AI-generated answers based only on the transcript.

---

# 📡 API Endpoints

## Load Video

### POST

```
/load-video
```

Request

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

### POST

```
/chat
```

Request

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

# 🧠 RAG Pipeline

```
YouTube Video

      │

      ▼

Fetch Transcript

      │

      ▼

Split into Chunks

      │

      ▼

Generate Embeddings

      │

      ▼

Store in FAISS

      │

      ▼

Retrieve Similar Chunks

      │

      ▼

Prompt Llama 3.1

      │

      ▼

Generate Answer
```

---

# 🔒 Environment Variables

```
HF_TOKEN=YOUR_HUGGINGFACE_API_KEY
```

Never expose your Hugging Face API key inside the Chrome extension.

---

# 📌 Current Limitations

- Only supports videos with **English transcripts**.
- Videos without transcripts are not supported.
- Hindi-only or other non-English transcripts are not supported.
- Builds a new FAISS index whenever a new video is loaded.
- Requires an active FastAPI backend.

---

# 🚀 Future Improvements

- 🌍 Support transcript translation
- 💬 Conversation history
- ⚡ Streaming AI responses
- 📋 Copy AI responses
- 🌙 Dark mode
- 🔊 Voice input
- 📄 Export conversations
- 🗂 Cache FAISS indexes by video ID
- ☁️ Deploy backend to Railway/Render/AWS
- 🐳 Docker support
- 🔐 User authentication
- 🤖 Multiple LLM providers (Gemini, OpenAI, Groq)

---

# ☁️ Deployment

The backend can be deployed to:

- Railway
- Render
- Google Cloud Run
- Microsoft Azure
- AWS
- DigitalOcean

Once deployed, update the API URL in `popup.js` to point to your hosted backend.

---

# 📚 Learning Concepts

This project demonstrates:

- Chrome Extension Development
- FastAPI
- LangChain
- Retrieval-Augmented Generation (RAG)
- FAISS Vector Database
- Embedding Models
- Hugging Face Inference API
- Prompt Engineering
- Semantic Search
- REST APIs

---

# 🤝 Contributing

Contributions are welcome!

1. Fork the repository.
2. Create a feature branch.
3. Commit your changes.
4. Push to your branch.
5. Open a Pull Request.

---

# 📄 License

This project is licensed under the MIT License.

---

# 🙏 Acknowledgements

- LangChain
- FastAPI
- Hugging Face
- FAISS
- Sentence Transformers
- YouTube Transcript API
- Google Chrome Extensions

---

# ⭐ Support

If you found this project helpful, please consider giving it a ⭐ on GitHub.

Your support helps improve the project and motivates future development.
