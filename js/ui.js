/* TODO: Show status of consultant */
/* SHOW offline */

offline = document.querySelector('.offline');
offline.classList.remove('hide');
/* SHOW ayesha logging in: online*/
setTimeout(
    () => {
        offline.classList.add('hide');

        online = document.querySelector('.online');
        online.classList.remove('hide');
    }
    , 1600)


dark = true;
function sendElementSomeText(id, text, dark = true) {
    target = document.querySelector(id);
    let ran = Math.floor(Math.random() * 10) + 4;
    if (ran < 0 || ran > 12) { ran = 6 }
    let speechBubble
    if (dark) {
        speechBubble = `<div class="container-fluid p-2 my-2  text-white ">
                        <div class="row">
                            <div class="col-md-${ran} p-3 mx-1 bg-dark message">
                                ${text}
                            </div>
                        </div>
                    </div>`;
    } else {
        if (ran>5){ran=5}
        speechBubble = `<div class="container-fluid p-2 my-2 text-dark ">
                                        <div class="row">
                                            <div class="col-md-${ran} p-3 bg-white message right">
                                                ${text}
                                            </div>
                                        </div>
                                    </div>`;
    }

    target.innerHTML += speechBubble;
}

function sendMessage(id = 1, dark = true) {
    xhr = new XMLHttpRequest();
    url = `ajax/hajjMessages.ajax.php?id=${id}`;
    xhr.open("GET", url, true);
    xhr.onreadystatechange = function () {
        if (xhr.readyState < 4) {
            console.log("loading");
        }
        if (xhr.readyState == 4 && xhr.status == 200) {
            sendElementSomeText('#output', xhr.responseText, dark);
        }
        if (xhr.readyState == 4 && xhr.status != 200) {
            console.log("failed to grab ajax message");
        }
    };
    xhr.send();
}

id = 0;
time = 1300

setTimeout(() => {
    sendMessage(id);
    id++
    setTimeout(() => {
        sendMessage(id);
        id++
        setTimeout(() => {
            sendMessage(id);
            id++
            setTimeout(() => {
                sendMessage(id);
                id++
            }, time)
        }, time)
    }, time)

}, time)

function receiveMessage(){
    receiver = document.querySelector("#receiver");
    userMessage = receiver.value;
    sendElementSomeText("#output",userMessage,false)
        setTimeout(() => {
            sendMessage(id);
            id++
            setTimeout(() => {
                sendMessage(id);
                id++
            }, time)

        }, time)
    /* TODO: clear input */
    receiver.value = "";
    receiver.style.placeholder = "46 Tennyson Street Mandalay";    
}

document.querySelector("#sendMessage").onclick = receiveMessage;



/* submitdocs = document.querySelector('#submitdocs');

function uploadDocuments() {
    xhr = new XMLHttpRequest();
    url = "./ajax/upload.ajax.php";

    var formData = new FormData();
    formData.append("file", document.querySelector("#file").files[0]);



    xhr.open("POST", url, true);
    xhr.onreadystatechange = function () {
        if (xhr.readyState < 4) {
            console.log("Connecting to file uploader");
        }
        if (xhr.readyState == 4 && xhr.status == 200) {
            alert("something went right");
            window.location.href = 'home.php';
            alert(xhr.responseText);
        }
        if (xhr.readyState == 4 && xhr.status != 200) {
            alert("something went wrong");
            alert(xhr.responseText);
        }
    };
    xhr.send(formData);
    console.log(formData);
}

submitdocs.onclick = uploadDocuments; */