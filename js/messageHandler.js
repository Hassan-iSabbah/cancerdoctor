/* SETUP SECTION */
/* SHOW ayesha logging in: online*/
setTimeout(
    () => {
        $(".offline").fadeToggle('hide');
        $(".online").slideToggle('hide');
    }
    , 1600)

$("#talkToBot").toggle(1000);
$("#talkForm").toggle(3000);
$("#documentary").toggle();

/* END OF SETUP */

/* HANDLE CONVERSATION */

$(document).ready(function () {
    conversationData();
});

function conversationData() {
    var currentIndex = 0;

    $.ajax({
        url: "./xml/conversation_hajj.xml",
        dataType: "xml",
        success: function (data) {
            console.log("found the file baby");
            $("#output").children().remove();

            // Check if there are messages
            var messages = $(data).find("message");
            if (messages.length > 0) {
                displayMessage(messages, currentIndex);
            }
        }
    });

    var fulfilled = true;
    function displayMessage(messages, index) {
        var currentMessage = messages.eq(index);

        if (currentMessage.length > 0) {
            type = currentMessage.find("messageType").text();
            time = currentMessage.find("time").text();
            text = currentMessage.find("text").text();
            var info = "<li>text: " + text + "</li><li>message type: " +
                type + "</li><li>time delay:" + time + "</li><br>";
            posterman = `<div class="container-fluid p-2 my-2  text-white ">
                <div class="row">
                    <div class="col-md-3 p-3 mx-1 bg-dark message">
                        ${text}
                    </div>
                </div>
            </div>`;
            $("#output").append(posterman);

            if (type === "post") {

                // Move to the next message after a delay
                var timeDelay = parseInt(currentMessage.find("time").text()) || 1000; // Default delay is 1000 milliseconds
                setTimeout(function () {
                    currentIndex++;
                    displayMessage(messages, currentIndex);
                }, timeDelay);
            } else {
                if (fulfilled) {
                    // Move to the next message after a delay
                    var timeDelay = parseInt(currentMessage.find("time").text()) || 1000; // Default delay is 1000 milliseconds
                    setTimeout(function () {
                        currentIndex++;
                        displayMessage(messages, currentIndex);
                    }, timeDelay);
                }
            }

        }
    }
}
