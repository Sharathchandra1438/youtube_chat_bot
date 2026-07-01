const status = document.getElementById("status");
const chatBox = document.getElementById("chatBox");

function addMessage(text, type) {

    const div = document.createElement("div");

    div.className = `message ${type}`;

    div.innerHTML = text;

    chatBox.appendChild(div);

    chatBox.scrollTop = chatBox.scrollHeight;
}

document.getElementById("loadVideo").addEventListener("click", async () => {

    const videoId = document.getElementById("videoId").value.trim();

    if (!videoId) {
        status.innerHTML = "Enter a Video ID";
        return;
    }

    status.innerHTML = "Loading transcript...";

    try {

        const response = await fetch("http://127.0.0.1:8000/load-video", {

            method: "POST",

            headers: {
                "Content-Type": "application/json"
            },

            body: JSON.stringify({
                video_id: videoId
            })

        });

        if (response.ok) {

            status.innerHTML = "Video Loaded Successfully";

        } else {

            status.innerHTML = "Failed to load video";

        }

    }

    catch (e) {

        status.innerHTML = "Backend Not Running";

    }

});

document.getElementById("ask").addEventListener("click", async () => {

    const questionInput = document.getElementById("question");

    const question = questionInput.value.trim();

    if (!question)
        return;

    addMessage(question, "user");

    questionInput.value = "";

    status.innerHTML = "Thinking...";

    try {

        const response = await fetch("http://127.0.0.1:8000/chat", {

            method: "POST",

            headers: {
                "Content-Type": "application/json"
            },

            body: JSON.stringify({
                question: question
            })

        });

        const data = await response.json();

        addMessage(data.answer, "bot");

        status.innerHTML = "Ready";

    }

    catch (e) {

        addMessage("Unable to connect to backend.", "bot");

        status.innerHTML = "Error";

    }

});