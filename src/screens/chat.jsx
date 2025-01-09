
// import { useState, useEffect, useRef } from "react";
// import {
//   useGetMessagesQuery,
//   useSendMessageMutation,
//   useGetAllChatsQuery,
// } from "./../redux/reducers/messages/messageThunk";
// import AsyncStorage from "@react-native-async-storage/async-storage";
// const ADMIN_ID = "677d009c7ac603591cd27c49"; // Fixed admin ID

// const Chat = () => {
//   const [inputMessage, setInputMessage] = useState("");
//   const [userId, setUserId] = useState(null);
//   const [selectedUser, setSelectedUser] = useState(null);
//   const chatEndRef = useRef(null);

//   useEffect(() => {
//     const fetchUserId = async () => {
//       const storedUserId = await AsyncStorage.getItem("userId");
//       setUserId(storedUserId);
//     };
//     fetchUserId();
//   }, []);

//   // Get all chats (users list)
//   const {
//     data: chatData,
//     isLoading: isChatsLoading,
//     error: chatsError,
//   } = useGetAllChatsQuery();

//   // Get messages for selected user
//   const {
//     data: messages,
//     isLoading: isMessagesLoading,
//     error: messagesError,
//   } = useGetMessagesQuery(
//     {
//       senderId: ADMIN_ID,
//       receiverId : selectedUser?._id,
//     },
//     {
//       skip: !selectedUser,
//     }
//   );
//   console.log("messages are",selectedUser?._id,ADMIN_ID, messages,messagesError)

//   const [sendMessage] = useSendMessageMutation();

//   const handleSendMessage = async () => {
//     console.log("gggg", inputMessage, userId);
//     if (inputMessage.trim() === "" || !selectedUser?._id) return;

//     try {
//       const newMsg = {
//         receiver: selectedUser?._id,
//         sender: ADMIN_ID,
//         message: inputMessage,
//       };
//       sendMessage(newMsg).then((res) => {
//         console.log("hello", res);
//       });
//       setInputMessage("");
//     } catch (err) {
//       console.error("Failed to send message:", err);
//     }
//   };

//   const handleUserSelect = (user) => {
//     setSelectedUser(user);
//   };

//   useEffect(() => {
//     chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
//   }, [messages]);

//   if (isChatsLoading) return <div>Loading chats...</div>;
//   if (chatsError) return <div>Error loading chats. Please try again.</div>;

//   return (
//     <div style={styles.pageContainer}>
//       {/* Users List Panel */}
//       <div style={styles.usersPanel}>
//         <h2 style={styles.usersPanelHeader}>Users</h2>
//         <div style={styles.usersList}>
//           {chatData?.users?.map((user) => (
//             <div
//               key={user._id}
//               style={{
//                 ...styles.userItem,
//                 backgroundColor:
//                   selectedUser?._id === user._id ? "#e3f2fd" : "transparent",
//               }}
//               onClick={() => handleUserSelect(user)}
//             >
//               <div style={styles.userAvatar}>{user.name[0].toUpperCase()}</div>
//               <div style={styles.userName}>{user.name}</div>
//             </div>
//           ))}
//         </div>
//       </div>

//       {/* Chat Panel */}
//       <div style={styles.container}>
//         <div style={styles.chatHeader}>
//           <h2 style={styles.headerText}>
//             {selectedUser
//               ? `Chat with ${selectedUser.name}`
//               : "Select a user to start chatting"}
//           </h2>
//         </div>
//         {selectedUser ? (
//           <>
//             <div style={styles.chatBody}>
//               {isMessagesLoading ? (
//                 <div style={styles.loadingMessages}>Loading messages...</div>
//               ) : messagesError ? (
//                 <div style={styles.errorMessages}>
//                   Error loading messages. Please try again.
//                 </div>
//               ) : (
//                 messages?.messages?.map((message, index) => (
//                   <div
//                     key={index}
//                     style={{
//                       ...styles.message,
//                       alignSelf:
//                         message.senderId === userId ? "flex-end" : "flex-start",
//                       backgroundColor:
//                         message.senderId === userId ? "#4A90E2" : "#f1f1f1",
//                       color: message.senderId === userId ? "#fff" : "#333",
//                     }}
//                   >
//                     {message.message} {/* Using text field as per API response */}
//                   </div>
//                 ))
//               )}
//               <div ref={chatEndRef} />
//             </div>
//             <div style={styles.chatInputContainer}>
//               <input
//                 type="text"
//                 placeholder="Type a message..."
//                 value={inputMessage}
//                 onChange={(e) => setInputMessage(e.target.value)}
//                 style={styles.chatInput}
//                 // onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
//               />
//               <button onClick={handleSendMessage} style={styles.sendButton}>
//                 Send
//               </button>
//             </div>
//           </>
//         ) : (
//           <div style={styles.noSelection}>
//             Please select a user from the list to start chatting
//           </div>
//         )}
//       </div>
//     </div>
//   );
// };

// const styles = {
//   pageContainer: {
//     display: "flex",
//     gap: "20px",
//     padding: "20px",
//     height: "100vh",
//     backgroundColor: "#f5f5f5",
//   },
//   usersPanel: {
//     width: "300px",
//     backgroundColor: "#fff",
//     borderRadius: "10px",
//     boxShadow: "0 4px 10px rgba(0, 0, 0, 0.1)",
//     overflow: "hidden",
//   },
//   usersPanelHeader: {
//     margin: 0,
//     padding: "15px",
//     backgroundColor: "#4A90E2",
//     color: "#fff",
//     fontSize: "18px",
//     fontWeight: "bold",
//   },
//   usersList: {
//     padding: "10px",
//   },
//   userItem: {
//     display: "flex",
//     alignItems: "center",
//     padding: "10px",
//     cursor: "pointer",
//     borderRadius: "8px",
//     transition: "background-color 0.2s",
//     "&:hover": {
//       backgroundColor: "#f5f5f5",
//     },
//   },
//   userAvatar: {
//     width: "40px",
//     height: "40px",
//     borderRadius: "50%",
//     backgroundColor: "#4A90E2",
//     color: "#fff",
//     display: "flex",
//     alignItems: "center",
//     justifyContent: "center",
//     marginRight: "10px",
//     fontSize: "18px",
//     fontWeight: "bold",
//   },
//   userName: {
//     fontSize: "14px",
//     fontWeight: "500",
//   },
//   container: {
//     display: "flex",
//     flexDirection: "column",
//     flex: 1,
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
//   },
//   noSelection: {
//     flex: 1,
//     display: "flex",
//     alignItems: "center",
//     justifyContent: "center",
//     color: "#666",
//     fontSize: "16px",
//     padding: "20px",
//   },
// };

// export default Chat;


// import { useState, useEffect, useRef } from "react";
// import {
//   useGetMessagesQuery,
//   useSendMessageMutation,
//   useGetAllChatsQuery,
// } from "./../redux/reducers/messages/messageThunk";
// import AsyncStorage from "@react-native-async-storage/async-storage";

// const ADMIN_ID = "677d009c7ac603591cd27c49";

// const MessageBubble = ({ message, isSender }) => (
//   <div
//     className="flex flex-col"
//     style={{
//       alignItems: isSender ? "flex-end" : "flex-start",
//       padding: "10px",
//     }}
//   >
//     {!isSender && (
//       <div className="font-bold mb-2 text-sm">
//         Admin
//       </div>
//     )}
//     <div
//       className="rounded-lg p-3 max-w-[75%]"
//       style={{
//         backgroundColor: isSender ? "#4CAF50" : "#fff",
//         border: "1px solid #4CAF50",
//       }}
//     >
//       <div
//         className="mb-1"
//         style={{
//           color: isSender ? "#fff" : "#4CAF50",
//         }}
//       >
//         {message.message}
//       </div>
//       <div
//         className="text-xs"
//         style={{
//           color: isSender ? "#E0E0E0" : "#666",
//         }}
//       >
//         {new Date(message.createdAt).toLocaleTimeString()}
//       </div>
//     </div>
//   </div>
// );

// const Chat = () => {
//   const [inputMessage, setInputMessage] = useState("");
//   const [userId, setUserId] = useState(null);
//   const [selectedUser, setSelectedUser] = useState(null);
//   const chatEndRef = useRef(null);

//   useEffect(() => {
//     const fetchUserId = async () => {
//       const storedUserId = await AsyncStorage.getItem("userId");
//       setUserId(storedUserId);
//     };
//     fetchUserId();
//   }, []);

//   const {
//     data: chatData,
//     isLoading: isChatsLoading,
//     error: chatsError,
//   } = useGetAllChatsQuery();

//   const {
//     data: messages,
//     isLoading: isMessagesLoading,
//     error: messagesError,
//   } = useGetMessagesQuery(
//     {
//       senderId: ADMIN_ID,
//       receiverId: selectedUser?._id,
//     },
//     {
//       skip: !selectedUser,
//     }
//   );

//   const [sendMessage] = useSendMessageMutation();

//   const handleSendMessage = async () => {
//     if (inputMessage.trim() === "" || !selectedUser?._id) return;

//     try {
//       const newMsg = {
//         receiver: selectedUser?._id,
//         sender: ADMIN_ID,
//         message: inputMessage,
//       };
//       await sendMessage(newMsg);
//       setInputMessage("");
//     } catch (err) {
//       console.error("Failed to send message:", err);
//     }
//   };

//   const handleUserSelect = (user) => {
//     setSelectedUser(user);
//   };

//   useEffect(() => {
//     chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
//   }, [messages]);

//   if (isChatsLoading) return <div>Loading chats...</div>;
//   if (chatsError) return <div>Error loading chats. Please try again.</div>;

//   return (
//     <div className="flex gap-5 p-5 h-screen bg-gray-100">
//       <div className="w-72 bg-white rounded-lg shadow-md overflow-hidden">
//         <h2 className="m-0 p-4 bg-green-600 text-white text-lg font-bold">
//           Users
//         </h2>
//         <div className="p-3">
//           {chatData?.users?.map((user) => (
//             <div
//               key={user._id}
//               className="flex items-center p-3 cursor-pointer rounded-lg hover:bg-gray-100 transition-colors"
//               style={{
//                 backgroundColor:
//                   selectedUser?._id === user._id ? "#E8F5E9" : "transparent",
//               }}
//               onClick={() => handleUserSelect(user)}
//             >
//               <div className="w-10 h-10 rounded-full bg-green-600 text-white flex items-center justify-center mr-3 text-lg font-bold">
//                 {user.name[0].toUpperCase()}
//               </div>
//               <div className="text-sm font-medium">{user.name}</div>
//             </div>
//           ))}
//         </div>
//       </div>

//       <div className="flex-1 flex flex-col border border-gray-200 rounded-lg overflow-hidden bg-white shadow-md">
//         <div className="p-4 bg-green-600 text-white text-center">
//           <h2 className="m-0 text-lg font-bold">
//             {selectedUser
//               ? `Chat with ${selectedUser.name}`
//               : "Select a user to start chatting"}
//           </h2>
//         </div>
//         {selectedUser ? (
//           <>
//             <div className="flex-1 p-4 overflow-y-auto bg-gray-50">
//               {isMessagesLoading ? (
//                 <div className="text-center py-4">Loading messages...</div>
//               ) : messagesError ? (
//                 <div className="text-center text-red-500 py-4">
//                   Error loading messages. Please try again.
//                 </div>
//               ) : (
//                 messages?.messages?.map((message, index) => (
//                   <MessageBubble
//                     key={index}
//                     message={message}
//                     isSender={message.senderId === userId}
//                   />
//                 ))
//               )}
//               <div ref={chatEndRef} />
//             </div>
//             <div className="flex items-center p-3 border-t border-gray-200 bg-white">
//               <input
//                 type="text"
//                 placeholder="Type a message..."
//                 value={inputMessage}
//                 onChange={(e) => setInputMessage(e.target.value)}
//                 className="flex-1 p-3 text-sm rounded-full border border-gray-200 focus:outline-none focus:border-green-500"
//               />
//               <button
//                 onClick={handleSendMessage}
//                 className="ml-3 px-5 py-3 bg-green-600 text-white rounded-full text-sm font-bold hover:bg-green-700 transition-colors"
//               >
//                 Send
//               </button>
//             </div>
//           </>
//         ) : (
//           <div className="flex-1 flex items-center justify-center text-gray-500 text-base p-5">
//             Please select a user from the list to start chatting
//           </div>
//         )}
//       </div>
//     </div>
//   );
// };






// export default Chat;
import { useState, useEffect, useRef } from "react";
import {
  useGetMessagesQuery,
  useSendMessageMutation,
  useGetAllChatsQuery,
} from "./../redux/reducers/messages/messageThunk";
import AsyncStorage from "@react-native-async-storage/async-storage";

const ADMIN_ID = "677d009c7ac603591cd27c49";

const MessageBubble = ({ message, isSender, senderName }) => (
  <div
    className="flex flex-col"
    style={{
      alignItems: isSender ? "flex-end" : "flex-start",
      padding: "10px",
    }}
  >
    <div className="font-bold mb-2 text-sm">
      {isSender ? "Admin" : senderName}
    </div>
    <div
      className="rounded-lg p-3 max-w-[75%]"
      style={{
        backgroundColor: isSender ? "#4CAF50" : "#fff",
        border: "1px solid #4CAF50",
      }}
    >
      <div
        className="mb-1"
        style={{
          color: isSender ? "#fff" : "#4CAF50",
        }}
      >
        {message.message}
      </div>
      <div
        className="text-xs"
        style={{
          color: isSender ? "#E0E0E0" : "#666",
        }}
      >
        {new Date(message.createdAt).toLocaleTimeString()}
      </div>
    </div>
  </div>
);

const Chat = () => {
  const [inputMessage, setInputMessage] = useState("");
  const [userId, setUserId] = useState(null);
  const [selectedUser, setSelectedUser] = useState(null);
  const chatEndRef = useRef(null);

  // Add refresh controller
  const [refresh, setRefresh] = useState(false);

  useEffect(() => {
    const fetchUserId = async () => {
      const storedUserId = await AsyncStorage.getItem("userId");
      setUserId(storedUserId);
    };
    fetchUserId();
  }, []);

  const {
    data: chatData,
    isLoading: isChatsLoading,
    error: chatsError,
    refetch: refetchChats,
  } = useGetAllChatsQuery(undefined, {
    refetchOnMountOrArgChange: true,
  });

  const {
    data: messages,
    isLoading: isMessagesLoading,
    error: messagesError,
    refetch: refetchMessages,
  } = useGetMessagesQuery(
    {
      senderId: ADMIN_ID,
      receiverId: selectedUser?._id,
    },
    {
      skip: !selectedUser,
      refetchOnMountOrArgChange: true,
    }
  );

  const [sendMessage] = useSendMessageMutation();

  // Add refresh function
  const refreshData = async () => {
    setRefresh(true);
    try {
      await Promise.all([refetchChats(), refetchMessages()]);
    } catch (error) {
      console.error("Error refreshing data:", error);
    } finally {
      setRefresh(false);
    }
  };

  const handleSendMessage = async () => {
    if (inputMessage.trim() === "" || !selectedUser?._id) return;

    try {
      const newMsg = {
        receiver: selectedUser?._id,
        sender: ADMIN_ID,
        message: inputMessage,
      };
      await sendMessage(newMsg);
      setInputMessage("");
      // Refresh data after sending message
      await refreshData();
    } catch (err) {
      console.error("Failed to send message:", err);
    }
  };

  const handleUserSelect = async (user) => {
    setSelectedUser(user);
    // Refresh messages when selecting a new user
    if (user?._id) {
      await refreshData();
    }
  };

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  // Add auto-refresh interval
  useEffect(() => {
    const refreshInterval = setInterval(refreshData, 10000); // Refresh every 10 seconds
    return () => clearInterval(refreshInterval);
  }, [selectedUser]);

  if (isChatsLoading) return <div>Loading chats...</div>;
  if (chatsError) return <div>Error loading chats. Please try again.</div>;

  return (
    <div className="flex gap-5 p-5 h-screen bg-gray-100">
      <div className="w-72 bg-white rounded-lg shadow-md overflow-hidden">
        <div className="flex justify-between items-center bg-green-600 p-4">
          <h2 className="m-0 text-white text-lg font-bold">Users</h2>
          <button
            onClick={refreshData}
            disabled={refresh}
            className="p-2 text-white hover:bg-green-700 rounded-full transition-colors"
          >
            {refresh ? "Refreshing..." : "↻"}
          </button>
        </div>
        <div className="p-3">
          {chatData?.users?.map((user) => (
            <div
              key={user._id}
              className="flex items-center p-3 cursor-pointer rounded-lg hover:bg-gray-100 transition-colors"
              style={{
                backgroundColor:
                  selectedUser?._id === user._id ? "#E8F5E9" : "transparent",
              }}
              onClick={() => handleUserSelect(user)}
            >
              <div className="w-10 h-10 rounded-full bg-green-600 text-white flex items-center justify-center mr-3 text-lg font-bold">
                {user.name[0].toUpperCase()}
              </div>
              <div className="text-sm font-medium">{user.name}</div>
            </div>
          ))}
        </div>
      </div>

      <div className="flex-1 flex flex-col border border-gray-200 rounded-lg overflow-hidden bg-white shadow-md">
        <div className="p-4 bg-green-600 text-white text-center">
          <h2 className="m-0 text-lg font-bold">
            {selectedUser
              ? `Chat with ${selectedUser.name}`
              : "Select a user to start chatting"}
          </h2>
        </div>
        {selectedUser ? (
          <>
            <div className="flex-1 p-4 overflow-y-auto bg-gray-50">
              {isMessagesLoading ? (
                <div className="text-center py-4">Loading messages...</div>
              ) : messagesError ? (
                <div className="text-center text-red-500 py-4">
                  Error loading messages. Please try again.
                </div>
              ) : (
                messages?.messages?.map((message, index) => (
                  <MessageBubble
                    key={index}
                    message={message}
                    isSender={message.sender == ADMIN_ID}
                    senderName={selectedUser.name}
                  />
                ))
              )}
              <div ref={chatEndRef} />
            </div>
            <div className="flex items-center p-3 border-t border-gray-200 bg-white">
              <input
                type="text"
                placeholder="Type a message..."
                value={inputMessage}
                onChange={(e) => setInputMessage(e.target.value)}
                className="flex-1 p-3 text-sm rounded-full border border-gray-200 focus:outline-none focus:border-green-500"
                onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
              />
              <button
                onClick={handleSendMessage}
                className="ml-3 px-5 py-3 bg-green-600 text-white rounded-full text-sm font-bold hover:bg-green-700 transition-colors"
              >
                Send
              </button>
            </div>
          </>
        ) : (
          <div className="flex-1 flex items-center justify-center text-gray-500 text-base p-5">
            Please select a user from the list to start chatting
          </div>
        )}
      </div>
    </div>
  );
};

export default Chat;