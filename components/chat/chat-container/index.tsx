'use client'

import React, { useState, useEffect } from "react";
import ChatHeader from "@/components/chat/chat-container/components/chat-header";
import MessageBar from "@/components/chat/chat-container/components/message-bar";
import MessageContainer from "@/components/chat/chat-container/components/message-container";

const ChatContainer = () => {
  const [wallpaper, setWallpaper] = useState('');

  useEffect(() => {
    const savedWallpaper = localStorage.getItem('chatWallpaper');
    if (savedWallpaper) {
      setWallpaper(savedWallpaper);
    }
  }, []);

  return (
    <div
      className="fixed top-0 h-[100vh] w-[100%] bg-[#1c1d25] flex flex-col md:static md:flex-1"
      style={{ backgroundImage: `url(${wallpaper})`, backgroundSize: 'cover' }}
    >
      <ChatHeader />
      <MessageContainer />
      <MessageBar />
    </div>
  );
};

export default ChatContainer;