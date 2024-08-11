import {  IoSendSharp } from "react-icons/io5";
import { GrAttachment } from "react-icons/gr";
import { RiEmojiStickerLine } from "react-icons/ri";
import EmojiPicker from "emoji-picker-react";
import { useEffect, useRef, useState } from "react";
import { useAppStore } from "@/store";
import { useSocket } from "@/contexts/SocketContext";
import { MESSAGE_TYPES, UPLOAD_FILE } from "@/lib/constants";
import apiClient from "@/lib/api-client";

const MessageBar = () => {
  const emojiRef = useRef();
  const fileInputRef = useRef();
  const {
    selectedChatData,
    userInfo,
    selectedChatType,
    setIsUploading,
    setFileUploadProgress,
  } = useAppStore();
  const [message, setMessage] = useState("");
  const [emojiPickerOpen, setEmojiPickerOpen] = useState(false);
  const socket = useSocket();

  useEffect(() => {
    function handleClickOutside(event) {
      if (emojiRef.current && !emojiRef.current.contains(event.target)) {
        setEmojiPickerOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [emojiRef]);

  const handleAddEmoji = (emoji) => {
    setMessage((msg) => msg + emoji.emoji);
  };

  const handleMessageChange = (event) => {
    setMessage(event.target.value);
  };

  const handleSendMessage = async () => {
    if (selectedChatType === "contact") {
      socket.emit("sendMessage", {
        sender: userInfo.id,
        content: message,
        recipient: selectedChatData._id,
        messageType: MESSAGE_TYPES.TEXT,
        audioUrl: undefined,
        fileUrl: undefined,
      });
    } else if (selectedChatType === "channel") {
      socket.emit("send-channel-message", {
        sender: userInfo.id,
        content: message,
        messageType: MESSAGE_TYPES.TEXT,
        audioUrl: undefined,
        fileUrl: undefined,
        channelId: selectedChatData._id,
      });
    }
    setMessage("");
  };

  const handleAttachmentChange = async (event) => {
    try {
      const file = event.target.files[0];

      if (file) {
        const formData = new FormData();
        formData.append("file", file);
        setIsUploading(true);
        const response = await apiClient.post(UPLOAD_FILE, formData, {
          withCredentials: true,
          onUploadProgress: (data) => {
            setFileUploadProgress(Math.round((100 * data.loaded) / data.total));
          },
        });

        if (response.status === 200 && response.data) {
          setIsUploading(false);
          if (selectedChatType === "contact") {
            socket.emit("sendMessage", {
              sender: userInfo.id,
              content: undefined,
              recipient: selectedChatData._id,
              messageType: MESSAGE_TYPES.FILE,
              audioUrl: undefined,
              fileUrl: response.data.filePath,
            });
          } else if (selectedChatType === "channel") {
            socket.emit("send-channel-message", {
              sender: userInfo.id,
              content: undefined,
              messageType: MESSAGE_TYPES.FILE,
              audioUrl: undefined,
              fileUrl: response.data.filePath,
              channelId: selectedChatData._id,
            });
          }
        }
      }
    } catch (error) {
      setIsUploading(false);
      console.log({ error });
    }
  };

  const handleAttachmentClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  return (
    <div className="h-[7vh] bg-black/40 backdrop-filter backdrop-blur-sm bg-opacity-40 border-t-[1px] border-gray-700 flex justify-center items-center px-2 gap-1 ">
    <button
      className="text-neutral-300 focus:border-none focus:outline-none focus:text-white transition-all duration-300"
      onClick={handleAttachmentClick} 
    >
      <GrAttachment className="text-[22px] text-gray-400 font-light" />
    </button>
    
    <input
      type="file"
      className="hidden" 
      ref={fileInputRef}
      onChange={handleAttachmentChange} 
    />
  
    <div className="flex-1 flex bg-[#000000] rounded-[22px] items-center gap-5 pr-5">
      <input
        type="text"
        className="flex-1 p-1 bg-transparent rounded-[22px] focus:border-none focus:outline-none"
        placeholder=" Message"
        value={message}
        onChange={handleMessageChange}
      />
      
      <div className="relative">
        <button
          className="text-neutral-300 focus:border-none focus:outline-none justify-center right-0 focus:text-white transition-all duration-300"
          onClick={() => setEmojiPickerOpen(true)}
        >
          <RiEmojiStickerLine className="text-2xl text-center mr-[-15px] mt-[5px] text-gray-400" />
        </button>
        <div className="absolute bottom-16 right-0" ref={emojiRef}>
          <EmojiPicker
            theme="dark"
            open={emojiPickerOpen}
            onEmojiClick={handleAddEmoji}
            autoFocusSearch={false}
          />
        </div>
      </div>
    </div>
  
    <div className="flex items-center">
  {/* Conditionally render the send button if there is text in the message */}
  {message.trim() ? (
    <button
      className="bg-[#6b2ddd] rounded-[50%] flex items-center justify-center p-[6px] pr-[5px] focus:border-none focus:outline-none hover:bg-[#741bda] focus:bg-[#741bda] transition-all duration-300"
      onClick={handleSendMessage}
    >
      <IoSendSharp className="text-[20px] text-white text-center" />
    </button>
  ) : (
    // Render the voice recorder icon when there is no text in the message
    <div className="voice-recorder">
      <svg
        width="30px"
        height="30px"
        viewBox="0 0 24 24"
        fill="none"
      >
        <rect
          x="9"
          y="3"
          width="6"
          height="11"
          rx="3"
          stroke="#9ca3af"
          strokeWidth="2"
          strokeLinejoin="round"
        ></rect>
        <path
          d="M5 11C5 12.8565 5.7375 14.637 7.05025 15.9497C8.36301 17.2625 10.1435 18 12 18C13.8565 18 15.637 17.2625 16.9497 15.9497C18.2625 14.637 19 12.8565 19 11"
          stroke="#9ca3af"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        ></path>
        <path
          d="M12 21V19"
          stroke="#9ca3af"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        ></path>
      </svg>
    </div>
  )}
</div>

  </div>
  
  );
};

export default MessageBar;
