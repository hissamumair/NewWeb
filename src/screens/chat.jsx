// import { useState, useEffect, useRef } from "react";

// const Chat = () => {
//   const [messages, setMessages] = useState([
    
//   ]);
//   const [inputMessage, setInputMessage] = useState("");
//   const chatEndRef = useRef(null);

//   const handleSendMessage = () => {
//     if (inputMessage.trim() === "") return;
//     setMessages((prevMessages) => [
//       ...prevMessages,
//       { sender: "Client", text: inputMessage },
//     ]);
//     setInputMessage("");
//   };

//   // Scroll to the bottom whenever a new message is added
//   useEffect(() => {
//     chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
//   }, [messages]);

//   return (
//     <div style={styles.container}>
//       <div style={styles.chatHeader}>
//         <h2 style={styles.headerText}>Chat with Admin</h2>
//       </div>
//       <div style={styles.chatBody}>
//         {messages.map((message, index) => (
//           <div
//             key={index}
//             style={{
//               ...styles.message,
//               alignSelf: message.sender === "Admin" ? "flex-start" : "flex-end",
//               backgroundColor:
//                 message.sender === "Admin" ? "#f1f1f1" : "#4A90E2",
//               color: message.sender === "Admin" ? "#333" : "#fff",
//               boxShadow:
//                 message.sender === "Admin"
//                   ? "0 2px 5px rgba(0, 0, 0, 0.1)"
//                   : "0 2px 5px rgba(0, 0, 0, 0.2)",
//             }}
//           >
//             <strong>{message.sender}:</strong> {message.text}
//           </div>
//         ))}
//         {/* Reference to scroll to the bottom when new message is added */}
//         <div ref={chatEndRef} />
//       </div>
//       <div style={styles.chatInputContainer}>
//         <input
//           type="text"
//           placeholder="Type a message..."
//           value={inputMessage}
//           onChange={(e) => setInputMessage(e.target.value)}
//           style={styles.chatInput}
//         />
//         <button onClick={handleSendMessage} style={styles.sendButton}>
//           Send
//         </button>
//       </div>
//     </div>
//   );
// };

// const styles = {
//   container: {
//     display: "flex",
//     flexDirection: "column",
//     width: "400px",
//     height: "600px",
//     border: "1px solid #ddd",
//     borderRadius: "10px",
//     overflow: "hidden",
//     fontFamily: "'Roboto', Arial, sans-serif",
//     boxShadow: "0 4px 10px rgba(0, 0, 0, 0.1)",
//     backgroundColor: "#fff",
//   },
//   chatHeader: {
//     padding: "15px",
//     backgroundColor: "#4A90E2",
//     color: "#fff",
//     textAlign: "center",
//     boxShadow: "0 2px 5px rgba(0, 0, 0, 0.1)",
//   },
//   headerText: {
//     margin: 0,
//     fontSize: "18px",
//     fontWeight: "bold",
//   },
//   chatBody: {
//     flex: 1,
//     padding: "15px",
//     overflowY: "auto",
//     display: "flex",
//     flexDirection: "column",
//     gap: "10px",
//     backgroundColor: "#f9f9f9",
//   },
//   message: {
//     maxWidth: "70%",
//     padding: "12px",
//     borderRadius: "12px",
//     fontSize: "14px",
//     lineHeight: "1.4",
//   },
//   chatInputContainer: {
//     display: "flex",
//     alignItems: "center",
//     padding: "10px",
//     borderTop: "1px solid #ddd",
//     backgroundColor: "#fff",
//   },
//   chatInput: {
//     flex: 1,
//     padding: "12px",
//     fontSize: "14px",
//     borderRadius: "20px",
//     border: "1px solid #ddd",
//     outline: "none",
//     boxShadow: "inset 0 2px 4px rgba(0, 0, 0, 0.1)",
//     transition: "border-color 0.2s",
//   },
//   sendButton: {
//     padding: "10px 20px",
//     marginLeft: "10px",
//     backgroundColor: "#4A90E2",
//     color: "#fff",
//     border: "none",
//     borderRadius: "20px",
//     cursor: "pointer",
//     fontSize: "14px",
//     fontWeight: "bold",
//     boxShadow: "0 2px 5px rgba(0, 0, 0, 0.2)",
//     transition: "background-color 0.2s",
//   },
// };

// export default Chat;



// import  { useState, useEffect } from 'react';
// import { useGetMessagesQuery, useSendMessageMutation } from '../redux/reducers/';
// import { adminId } from '../utils/senderDetail';

// const Chat = () => {
//   const [inputMessage, setInputMessage] = useState("");
//   const [userId, setUserId] = useState(null);
  
//   // Get messages using the query hook
//   const { data: messages, isLoading, error, refetch } = useGetMessagesQuery({
//     receiverId: adminId,
//     senderId: userId
//   });

//   const [sendMessage] = useSendMessageMutation();

//   const handleSendMessage = async () => {
//     if (inputMessage.trim() === "") return;
    
//     try {
//       await sendMessage({
//         receiverId: adminId,
//         senderId: userId,
//         message: inputMessage
//       });
//       setInputMessage("");
//       refetch(); // Refresh messages after sending
//     } catch (err) {
//       console.error('Failed to send message:', err);
//     }
//   };

//   return (
//     <div style={styles.container}>
//       <div style={styles.chatHeader}>
//         <h2 style={styles.headerText}>Chat with Client</h2>
//       </div>
//       <div style={styles.chatBody}>
//         {isLoading ? (
//           <div>Loading messages...</div>
//         ) : error ? (
//           <div>Error loading messages</div>
//         ) : (
//           messages?.messages?.map((message, index) => (
//             <div
//               key={message._id}
//               style={{
//                 ...styles.message,
//                 alignSelf: message.sender._id === adminId ? "flex-end" : "flex-start",
//                 backgroundColor: message.sender._id === adminId ? "#4A90E2" : "#f1f1f1",
//                 color: message.sender._id === adminId ? "#fff" : "#333",
//               }}
//             >
//               <strong>{message.sender._id === adminId ? "Admin" : "Client"}:</strong> {message.message}
//               <div style={{ fontSize: '10px', marginTop: '4px' }}>
//                 {new Date(message.createdAt).toLocaleTimeString()}
//               </div>
//             </div>
//           ))
//         )}
//       </div>
//       <div style={styles.chatInputContainer}>
//         <input
//           type="text"
//           placeholder="Type a message..."
//           value={inputMessage}
//           onChange={(e) => setInputMessage(e.target.value)}
//           style={styles.chatInput}
//           onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
//         />
//         <button onClick={handleSendMessage} style={styles.sendButton}>
//           Send
//         </button>
//       </div>
//     </div>
//   );
// };






// const styles = {
//   container: {
//     display: "flex",
//     flexDirection: "column",
//     width: "400px",
//     height: "600px",
//     border: "1px solid #ddd",
//     borderRadius: "10px",
//     overflow: "hidden",
//     fontFamily: "'Roboto', Arial, sans-serif",
//     boxShadow: "0 4px 10px rgba(0, 0, 0, 0.1)",
//     backgroundColor: "#fff",
//   },
//   chatHeader: {
//     padding: "15px",
//     backgroundColor: "#4A90E2",
//     color: "#fff",
//     textAlign: "center",
//     boxShadow: "0 2px 5px rgba(0, 0, 0, 0.1)",
//   },
//   headerText: {
//     margin: 0,
//     fontSize: "18px",
//     fontWeight: "bold",
//   },
//   chatBody: {
//     flex: 1,
//     padding: "15px",
//     overflowY: "auto",
//     display: "flex",
//     flexDirection: "column",
//     gap: "10px",
//     backgroundColor: "#f9f9f9",
//   },
//   message: {
//     maxWidth: "70%",
//     padding: "12px",
//     borderRadius: "12px",
//     fontSize: "14px",
//     lineHeight: "1.4",
//     boxShadow: "0 2px 5px rgba(0, 0, 0, 0.1)",
//   },
//   chatInputContainer: {
//     display: "flex",
//     alignItems: "center",
//     padding: "10px",
//     borderTop: "1px solid #ddd",
//     backgroundColor: "#fff",
//   },
//   chatInput: {
//     flex: 1,
//     padding: "12px",
//     fontSize: "14px",
//     borderRadius: "20px",
//     border: "1px solid #ddd",
//     outline: "none",
//     boxShadow: "inset 0 2px 4px rgba(0, 0, 0, 0.1)",
//     transition: "border-color 0.2s",
//   },
//   sendButton: {
//     padding: "10px 20px",
//     marginLeft: "10px",
//     backgroundColor: "#4A90E2",
//     color: "#fff",
//     border: "none",
//     borderRadius: "20px",
//     cursor: "pointer",
//     fontSize: "14px",
//     fontWeight: "bold",
//     boxShadow: "0 2px 5px rgba(0, 0, 0, 0.2)",
//     transition: "background-color 0.2s",
//     ":hover": {
//       backgroundColor: "#357ABD"
//     }
//   }
// };

// export default Chat;









import { useState, useEffect, useRef } from "react";
import { useGetMessagesQuery, useSendMessageMutation } from './../redux/reducers/messages/messageThunk';

const Chat = () => {
  const [inputMessage, setInputMessage] = useState("");
  const chatEndRef = useRef(null);
  
  const senderId = userId;
  const receiverId = adminId;

  const { data: messages = [], isLoading } = useGetMessagesQuery({ 
    senderId, 
    receiverId 
  });
  
  const [sendMessage] = useSendMessageMutation();

  const handleSendMessage = async () => {
    if (inputMessage.trim() === "") return;
    
    try {
      await sendMessage({ 
        groupId: receiverId, // Assuming groupId is the receiverId
        text: inputMessage 
      }).unwrap();
      
      setInputMessage("");
    } catch (error) {
      console.error('Failed to send message:', error);
    }
  };

  // Scroll to the bottom whenever messages change
  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  if (isLoading) {
    return <div style={styles.loadingContainer}>Loading messages...</div>;
  }

  return (
    <div style={styles.container}>
      <div style={styles.chatHeader}>
        <h2 style={styles.headerText}>Chat with Admin</h2>
      </div>
      <div style={styles.chatBody}>
        {messages.map((message, index) => (
          <div
            key={message.id || index}
            style={{
              ...styles.message,
              alignSelf: message.senderId === senderId ? "flex-end" : "flex-start",
              backgroundColor: message.senderId === senderId ? "#4A90E2" : "#f1f1f1",
              color: message.senderId === senderId ? "#fff" : "#333",
              boxShadow: message.senderId === senderId
                ? "0 2px 5px rgba(0, 0, 0, 0.2)"
                : "0 2px 5px rgba(0, 0, 0, 0.1)",
            }}
          >
            <strong>{message.senderId === senderId ? "You" : "Admin"}:</strong> {message.text}
          </div>
        ))}
        <div ref={chatEndRef} />
      </div>
      <div style={styles.chatInputContainer}>
        <input
          type="text"
          placeholder="Type a message..."
          value={inputMessage}
          onChange={(e) => setInputMessage(e.target.value)}
          onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
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
  loadingContainer: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    height: "100%",
    fontSize: "16px",
    color: "#666",
  },
};

export default Chat;