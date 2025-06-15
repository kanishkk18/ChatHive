'use client'

import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { useAppStore } from "@/store";
import { HOST } from "@/lib/constants";
import { getColor } from "@/lib/utils";

const ChatHeader = () => {
  const { selectedChatData, closeChat, selectedChatType } = useAppStore();
  
  return (
    <div className="h-[8vh] border-b-[1px] backdrop-blur-15 bg-black/70  border-[#2f303b] flex items-center justify-between px-2">
        <div className="flex items-center justify-center ml-[-1%]">
        <div
          className="text-neutral-300 focus:border-none focus:outline-none focus:text-white border-none transition-all duration-300"
          onClick={closeChat}
        >
         <svg width="34px" height="34px" viewBox="0 0 1024 1024" fill="#021de3" className="icon" version="1.1"  stroke="#021de3" strokeWidth="45.056"><g id="SVGRepo_bgCarrier" strokeWidth="0"></g><g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g><g id="SVGRepo_iconCarrier"><path d="M669.6 849.6c8.8 8 22.4 7.2 30.4-1.6s7.2-22.4-1.6-30.4l-309.6-280c-8-7.2-8-17.6 0-24.8l309.6-270.4c8.8-8 9.6-21.6 2.4-30.4-8-8.8-21.6-9.6-30.4-2.4L360.8 480.8c-27.2 24-28 64-0.8 88.8l309.6 280z" fill=""></path></g></svg>
        </div>
      </div>
      
        <div className="flex  font-semibold text-white text-center items-center justify-center">
          <div >
            {selectedChatType === "channel" && selectedChatData.name}
            {selectedChatType === "contact" &&
            selectedChatData.firstName &&
            selectedChatData.lastName
              ? `${selectedChatData.firstName} ${selectedChatData.lastName}`
              : ""}
          </div>
        </div>
        <div className="w-[40px] h-[40px] relative flex items-center justify-center">
            {selectedChatType === "contact" ? (
              <Avatar className="w-[100%] h-[100%] rounded-full overflow-hidden">
                {selectedChatData.image ? (
                  <AvatarImage
                    src={`${HOST}/${selectedChatData.image}`}
                    alt="profile"
                    className="object-cover w-full h-full bg-black rounded-full"
                  />
                ) : (
                  <div
                    className={`uppercase w-[100%] h-[100%]  ${getColor(
                      selectedChatData.color
                    )} flex items-center justify-center rounded-full`}
                  >
                    {selectedChatData.firstName
                      ? selectedChatData.firstName.split("").shift()
                      : selectedChatData.email.split("").shift()}
                  </div>
                )}
              </Avatar>
            ) : (
              <div
                className={` bg-[#ffffff22] py-3 px-5 flex items-center justify-center rounded-full`}
              >
                #
              </div>
            )}
          </div>
    </div>
  );
};

export default ChatHeader;