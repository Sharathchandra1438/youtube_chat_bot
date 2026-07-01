let currentVideoId = "";

const status = document.getElementById("status");
const chatBox = document.getElementById("chatBox");

function addMessage(text, type){

    const div = document.createElement("div");

    div.className = "message " + type;

    div.innerHTML = text;

    chatBox.appendChild(div);

    chatBox.scrollTop = chatBox.scrollHeight;

}

async function detectVideo() {

    try {

        const tabs = await chrome.tabs.query({
            active: true,
            currentWindow: true
        });

        console.log("Tabs:", tabs);

        if (tabs.length === 0) {
            console.log("No active tab");
            return;
        }

        const tab = tabs[0];

        console.log(tab);

        if (!tab.url) {
            console.log("tab.url is undefined");
            document.getElementById("videoTitle").innerText =
                "Cannot access this page";
            return;
        }

        console.log("URL:", tab.url);

        const url = new URL(tab.url);

        currentVideoId = url.searchParams.get("v");

        console.log("Video ID:", currentVideoId);

        document.getElementById("videoTitle").innerText = tab.title;
        document.getElementById("videoId").innerText = currentVideoId;

    } catch (err) {
        console.error(err);
    }

}

detectVideo();

document.getElementById("loadVideo").addEventListener("click",async()=>{

    console.log("Load button clicked");

    console.log("Current Video ID:", currentVideoId);

    if(currentVideoId==""){

        status.innerHTML="No Video Found";

        return;

    }

    status.innerHTML="Loading Transcript...";

    try{

        const response = await fetch("http://127.0.0.1:8000/load-video",{

            method:"POST",

            headers:{

                "Content-Type":"application/json"

            },

            body:JSON.stringify({

                video_id:currentVideoId

            })

        });

        if(response.ok){

            status.innerHTML="Transcript Loaded";

        }

        else{

            status.innerHTML="Failed";

        }

    }

    catch{

        status.innerHTML="Backend Not Running";

    }

});

document.getElementById("ask").addEventListener("click",async()=>{

    const questionBox=document.getElementById("question");

    const question=questionBox.value.trim();

    if(question=="")
        return;

    addMessage(question,"user");

    questionBox.value="";

    status.innerHTML="Thinking...";

    try{

        const response=await fetch("http://127.0.0.1:8000/chat",{

            method:"POST",

            headers:{

                "Content-Type":"application/json"

            },

            body:JSON.stringify({

                question:question

            })

        });

        const data=await response.json();

        addMessage(data.answer,"bot");

        status.innerHTML="Ready";

    }

    catch{

        addMessage("Unable to connect to backend.","bot");

        status.innerHTML="Error";

    }

});

document.getElementById("question").addEventListener("keypress",function(e){

    if(e.key==="Enter"){

        document.getElementById("ask").click();

    }

});
