// ============================================
// CONFIGURATION - CONNECT YOUR BACKEND HERE
// ============================================

// STEP 1: Replace this with your Python Flask backend URL
// If your Python runs on port 5000, use: 'http://localhost:5000/chat'
// If your Python runs on port 8000, use: 'http://localhost:8000/chat'
const BACKEND_URL = 'http://localhost:5000/chat';

// STEP 2: Set to true when you want to connect to your backend
// false = Mock responses (for testing HTML without backend)
// true = Real responses from your Python Gemini API
const USE_BACKEND = true;  // ← Change this to true when your backend is running!

// ============================================
// CHATBOT LOGIC - NO NEED TO CHANGE BELOW
// ============================================

const messagesContainer = document.getElementById('messagesContainer');
const messageInput = document.getElementById('messageInput');
const sendBtn = document.getElementById('sendBtn');
const typingIndicator = document.getElementById('typingIndicator');

// Set initial timestamp
document.getElementById('initialTime').textContent = getCurrentTime();

function getCurrentTime() {
    const now = new Date();
    return now.toLocaleTimeString('en-US', { 
        hour: '2-digit', 
        minute: '2-digit' 
    });
}

function scrollToBottom() {
    messagesContainer.scrollTop = messagesContainer.scrollHeight;
}

function addMessage(text, isBot = false) {
    const messageDiv = document.createElement('div');
    messageDiv.className = `message ${isBot ? 'bot' : 'user'}`;
    
    const avatar = document.createElement('div');
    avatar.className = 'message-avatar';
    avatar.textContent = isBot ? '🤖' : '👤';
    
    const content = document.createElement('div');
    content.className = 'message-content';
    
    const bubble = document.createElement('div');
    bubble.className = 'message-bubble';
    bubble.textContent = text;
    
    const time = document.createElement('div');
    time.className = 'message-time';
    time.textContent = getCurrentTime();
    
    content.appendChild(bubble);
    content.appendChild(time);
    messageDiv.appendChild(avatar);
    messageDiv.appendChild(content);
    
    // Insert before typing indicator
    messagesContainer.insertBefore(messageDiv, typingIndicator);
    scrollToBottom();
}

function showTyping() {
    typingIndicator.classList.add('active');
    scrollToBottom();
}

function hideTyping() {
    typingIndicator.classList.remove('active');
}

// Mock response function (used when USE_BACKEND is false)
async function getMockResponse(userMessage) {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 1500));
    return "This is a mock response. Set USE_BACKEND = true and configure your BACKEND_URL to connect to your Python Gemini API!";
}

// Real backend API call
async function getBackendResponse(userMessage) {
    const response = await fetch(BACKEND_URL, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            message: userMessage
        })
    });

    if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();

    // backend returns: { reply: "text" }
    return data.reply;
}

async function sendMessage() {
    const message = messageInput.value.trim();
    if (!message) return;

    // Add user message
    addMessage(message, false);
    messageInput.value = '';
    sendBtn.disabled = true;

    // Show typing indicator
    showTyping();

    try {
        let botResponse;
        
        if (USE_BACKEND) {
            // Use real backend
            botResponse = await getBackendResponse(message);
        } else {
            // Use mock response
            botResponse = await getMockResponse(message);
        }

        hideTyping();
        addMessage(botResponse, true);
        
    } catch (error) {
        console.error('Error:', error);
        hideTyping();
        addMessage('Sorry, I encountered an error. Please check the console and your backend connection.', true);
    }

    sendBtn.disabled = false;
    messageInput.focus();
}

// Event listeners
sendBtn.addEventListener('click', sendMessage);

messageInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        sendMessage();
    }
});

// Focus input on load
messageInput.focus();