'use client'

import { useEffect } from "react";
import ChatContainer from "@/components/chat/chat-container";
import ContactsContainer from "@/components/chat/contacts-container";
import { useAppStore } from "@/store";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import EmptyChatContainer from "@/components/chat/empty-chat-container";

const Chat = () => {
  const {
    userInfo,
    selectedChatType,
    isUploading,
    fileUploadProgress,
    isDownloading,
    downloadProgress,
  } = useAppStore();
  const router = useRouter();
  
  useEffect(() => {
    if (!userInfo) {
      router.push("/auth");
      return;
    }
    if (!userInfo.profileSetup) {
      toast("Please setup profile to continue.");
      router.push("/profile");
    }
  }, [userInfo, router]);

  if (!userInfo) {
    return null;
  }

  return (
    <div className="flex h-[100vh] text-white overflow-hidden">
      {isUploading && (
        <div className="h-[100vh] w-[100vw] fixed top-0 z-10 left-0 bg-black/80 flex items-center justify-center flex-col gap-5">
          <h5 className="text-5xl animate-pulse">Uploading File</h5>
          {fileUploadProgress}%
        </div>
      )}
      {isDownloading && (
        <div className="h-[100vh] w-[100vw] fixed top-0 z-10 left-0 bg-black/80 flex items-center justify-center flex-col gap-5">
          <h5 className="text-5xl animate-pulse">Downloading File</h5>
          {downloadProgress}%
        </div>
      )}
      <ContactsContainer /> 
     
      {selectedChatType === undefined ? (
        <EmptyChatContainer />
      ) : (
        <ChatContainer />
      )}
    </div>
  );
};

export default Chat;