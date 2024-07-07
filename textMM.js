// Function to send a message
function sendMessage() {
    var message = document.getElementById("messageInput").value;
    if (message.trim() !== "") {
        // Clear input field after sending message
        document.getElementById("messageInput").value = "";

        // Append message to the message area (assuming you have a message area div)
        appendMessage(message, true);

        // Simulate receiving a response message (for demonstration)
        receiveMessage("Received: " + message);
    }
}

// Function to simulate receiving a message
function receiveMessage(message) {
    // Append message to the message area (assuming you have a message area div)
    appendMessage(message, false);
}

// Function to append a message to the message area
function appendMessage(message, isSender) {
    const messageArea = document.getElementById('messageArea');
    const messageElement = document.createElement('div');
    messageElement.classList.add('message', isSender ? 'sent' : 'received');
    messageElement.innerHTML = `
        <div class="message-content">${message}</div>
        <div class="message-meta">${new Date().toLocaleTimeString()}</div>
    `;
    messageArea.appendChild(messageElement);
    messageArea.scrollTop = messageArea.scrollHeight; // Scroll to bottom
}

// Event listener for sending a message (assuming you have a send button)
document.getElementById('sendMessageButton').addEventListener('click', function(e) {
    e.preventDefault();
    sendMessage();
});
