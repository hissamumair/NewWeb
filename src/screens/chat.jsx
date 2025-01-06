import { useState, useEffect, useRef } from "react";

const Chat = () => {
  const [messages, setMessages] = useState([
    { sender: "Admin", text: "Hello! How can I help you today?" },
    { sender: "Client", text: "I need help with my order." },
  ]);
  const [inputMessage, setInputMessage] = useState("");
  const chatEndRef = useRef(null);

  const handleSendMessage = () => {
    if (inputMessage.trim() === "") return;
    setMessages((prevMessages) => [
      ...prevMessages,
      { sender: "Client", text: inputMessage },
    ]);
    setInputMessage("");
  };

  // Scroll to the bottom whenever a new message is added
  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  return (
    <div style={styles.container}>
      <div style={styles.chatHeader}>
        <h2 style={styles.headerText}>Chat with Admin</h2>
      </div>
      <div style={styles.chatBody}>
        {messages.map((message, index) => (
          <div
            key={index}
            style={{
              ...styles.message,
              alignSelf: message.sender === "Admin" ? "flex-start" : "flex-end",
              backgroundColor:
                message.sender === "Admin" ? "#f1f1f1" : "#4A90E2",
              color: message.sender === "Admin" ? "#333" : "#fff",
              boxShadow:
                message.sender === "Admin"
                  ? "0 2px 5px rgba(0, 0, 0, 0.1)"
                  : "0 2px 5px rgba(0, 0, 0, 0.2)",
            }}
          >
            <strong>{message.sender}:</strong> {message.text}
          </div>
        ))}
        {/* Reference to scroll to the bottom when new message is added */}
        <div ref={chatEndRef} />
      </div>
      <div style={styles.chatInputContainer}>
        <input
          type="text"
          placeholder="Type a message..."
          value={inputMessage}
          onChange={(e) => setInputMessage(e.target.value)}
          style={styles.chatInput}
        />
        <button onClick={handleSendMessage} style={styles.sendButton}>
          Send
        </button>
      </div>
    </div>
  );
};

const styles = {
  container: {
    display: "flex",
    flexDirection: "column",
    width: "400px",
    height: "600px",
    border: "1px solid #ddd",
    borderRadius: "10px",
    overflow: "hidden",
    fontFamily: "'Roboto', Arial, sans-serif",
    boxShadow: "0 4px 10px rgba(0, 0, 0, 0.1)",
    backgroundColor: "#fff",
  },
  chatHeader: {
    padding: "15px",
    backgroundColor: "#4A90E2",
    color: "#fff",
    textAlign: "center",
    boxShadow: "0 2px 5px rgba(0, 0, 0, 0.1)",
  },
  headerText: {
    margin: 0,
    fontSize: "18px",
    fontWeight: "bold",
  },
  chatBody: {
    flex: 1,
    padding: "15px",
    overflowY: "auto",
    display: "flex",
    flexDirection: "column",
    gap: "10px",
    backgroundColor: "#f9f9f9",
  },
  message: {
    maxWidth: "70%",
    padding: "12px",
    borderRadius: "12px",
    fontSize: "14px",
    lineHeight: "1.4",
  },
  chatInputContainer: {
    display: "flex",
    alignItems: "center",
    padding: "10px",
    borderTop: "1px solid #ddd",
    backgroundColor: "#fff",
  },
  chatInput: {
    flex: 1,
    padding: "12px",
    fontSize: "14px",
    borderRadius: "20px",
    border: "1px solid #ddd",
    outline: "none",
    boxShadow: "inset 0 2px 4px rgba(0, 0, 0, 0.1)",
    transition: "border-color 0.2s",
  },
  sendButton: {
    padding: "10px 20px",
    marginLeft: "10px",
    backgroundColor: "#4A90E2",
    color: "#fff",
    border: "none",
    borderRadius: "20px",
    cursor: "pointer",
    fontSize: "14px",
    fontWeight: "bold",
    boxShadow: "0 2px 5px rgba(0, 0, 0, 0.2)",
    transition: "background-color 0.2s",
  },
};

export default Chat;
