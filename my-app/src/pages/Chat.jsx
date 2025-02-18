import Chatbox from '../components/Chatbox'
import React, { useState, useEffect } from 'react';
import { io } from 'socket.io-client';
import { FaArrowRightLong } from "react-icons/fa6";
import { useSelector } from 'react-redux';
import msg from "../images/msg.gif"
const apiBase = process.env.REACT_APP_API_URL;
const socket = io(`${apiBase}`);

export const Chat = () => {
    const apiBase = process.env.REACT_APP_API_URL;
    const [messages, setMessages] = useState([]);
    const [newMessage, setNewMessage] = useState('');
    const [isChatOpen, setIsChatOpen] = useState(false);
    const [followedUsers, setFollowedUsers] = useState([]);
    const [chatPartner, setChatPartner] = useState(null);
    const [currentUserId, setCurrentUserId] = useState(null) 
    
    useEffect(() => {
      fetchId();
      fetchFollowedUsers();
      if (currentUserId) {
        socket.emit('joinRoom', currentUserId);
      }
      if (chatPartner) {
        fetchMessages();
      }
  
      socket.on('receiveMessage', (message) => {
        if (message.sender === chatPartner || message.receiver === chatPartner) {
          setMessages((prevMessages) => [...prevMessages, message]);
        }
      });
      
      return () => {
        socket.off('receiveMessage');
      };
    }, [currentUserId, chatPartner]);
    
    useEffect(() => {
      if (chatPartner) {
        setMessages([]); 
        fetchMessages();
      }
    }, [chatPartner]);
  
    const fetchFollowedUsers = async () => {
      const response = await fetch(`${apiBase}/users/followed?user=${currentUserId}`, {
        method: 'GET',
        credentials: 'include',
      });
      if (response.ok) {
        const data = await response.json();
        setFollowedUsers(data);
      }
    };

    const fetchId = async ()=>{
      const response = await fetch(`${apiBase}/auth/`, {
        method: 'GET',
        credentials: 'include',
      });
      if (response.ok) {
        const data = await response.json();
        setCurrentUserId(data.user.id);
        console.log('id: ',data)
      }
    }

    const handleMessageUser = async (userId) => {
      setChatPartner(userId);
      fetchMessages();
      setIsChatOpen(true);
      setMessages([]);
    };
  
    const fetchMessages = async () => {
      if (!chatPartner) {
        console.log("Chat partner is not set yet.");
        return;
      }
      
      console.log("Fetching messages for chat:", currentUserId, "with partner:", chatPartner);
      const response = await fetch(`${apiBase}/chat/messages?sender=${currentUserId}&receiver=${chatPartner}`, {
        method: 'GET',
        credentials: 'include',
      });
      if (response.ok) {
        const data = await response.json();
        data.sort((a, b) => new Date(a.timestamp) - new Date(b.timestamp));
        setMessages(data);
      }
    };
  
    const handleSendMessage = () => {
      if (newMessage.trim() && chatPartner) {
        const timestamp = new Date().toISOString();
        const message = {
          text: newMessage,
          sender: currentUserId,
          receiver: chatPartner,
          timestamp,
        };
  
        socket.emit('sendMessage', message);
        setMessages((prevMessages) => [...prevMessages, message]);
        setNewMessage('');
      }
    };
  
    const handleBackButtonClick = () => {
      setIsChatOpen(false);
      setChatPartner(null);
      setMessages([]);
    };
  
    return (
      <div className="flex h-screen">
        {/* Left Panel - Chat */}
        <div className="flex-grow bg-gray-50 p-4">
          {isChatOpen && chatPartner ? (
            <div className='flex justify-between items-center p-4 border-b'>
              <span className="text-lg font-semibold">Chat</span>
              <button
                onClick={handleBackButtonClick}
                className="text-gray-600 hover:text-gray-800"
              >
                <FaArrowRightLong />
              </button>
            </div>
          ) : (
            <div className=''>
                <h3 className="text-lg font-semibold p-4 border-b">Chat</h3>
                <div>
                    <img src={msg} alt="gif" className="scale-100 mx-[20%]" />
                    <p className='text-center text-purple-900 text-xl'>Say Hi! and start a converstation.</p>
                </div>
            </div>
          )}
  
          {isChatOpen && chatPartner && (
            <>
              <div className="flex-grow h-[75%] overflow-y-auto p-4">
                {messages.length === 0 ? (
                  <p className="text-gray-600 text-center mt-4">
                    No messages yet. <br />
                    <span className="font-semibold text-purple-700">
                      Start a conversation! Reach out and say hello!
                    </span>
                  </p>
                ) : (
                  messages.map((msg, index) => (
                    <div key={index} className={`mb-2 ${msg.sender === currentUserId ? 'text-right' : ''}`}>
                      <span className={`inline-block rounded-lg p-2 ${msg.sender === currentUserId ? 'bg-purple-500 text-white' : 'bg-gray-500 text-white'}`}>
                        {msg.text}
                      </span>
                    </div>
                  ))
                )}
              </div>
              <div className="flex p-4 border-t">
                <input
                  type="text"
                  className="flex-grow p-2 border rounded-lg mr-2"
                  placeholder="Type a message..."
                  value={newMessage}
                  onChange={(e) => setNewMessage(e.target.value)}
                />
                <button onClick={handleSendMessage} className="bg-purple-700 text-white p-2 rounded-lg">
                  Send
                </button>
              </div>
            </>
          )}
        </div>
  
        {/* Right Panel - Users */}
        <div className="w-[30%] border-l bg-white overflow-y-auto">
          <h3 className="text-lg font-semibold p-4 border-b">Followed Users</h3>
          <div className="p-4">
            <ul className="list-disc">
              {followedUsers.length === 0 ? (
                <li className="text-gray-600">You are not following anyone.</li>
              ) : (
                followedUsers.map((user) => (
                  <li key={user._id} className="flex justify-between items-center bg-gray-100 p-2 rounded-lg mb-2">
                    <div className='flex items-center'>
                      <img
                        className="w-10 h-10 object-cover rounded-full"
                        src={user.avatar || "https://www.sketchappsources.com/resources/source-image/profile-illustration-gunaldi-yunus.png"}
                        alt='profile'
                      />
                      <span className="text-gray-800 m-2">{user.name}</span>
                    </div>
                    <button
                      onClick={() => handleMessageUser(user._id)}
                      className="bg-purple-700 text-white px-3 py-1 rounded-lg"
                    >
                      Message
                    </button>
                  </li>
                ))
              )}
            </ul>
          </div>
        </div>
      </div>
    );
}
