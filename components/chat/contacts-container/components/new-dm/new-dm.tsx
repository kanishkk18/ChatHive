'use client'

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { FaPlus } from "react-icons/fa";
import { useState } from "react";
import { useAppStore } from "@/store";
import { HOST, SEARCH_CONTACTS_ROUTES } from "@/lib/constants";
import apiClient from "@/lib/api-client";
import { getColor } from "@/lib/utils";
import { ScrollArea } from "@/components/ui/scroll-area";

const NewDM = () => {
  const [searchedContacts, setsearchedContacts] = useState([]);
  const [openNewContactModal, setOpenNewContactModal] = useState(false);
  const { setSelectedChatType, setSelectedChatData } = useAppStore();

  const searchContacts = async (searchTerm: string) => {
    try {
      if (searchTerm.length > 0) {
        const response = await apiClient.post(
          SEARCH_CONTACTS_ROUTES,
          { searchTerm },
          { withCredentials: true }
        );
        if (response.status === 200 && response.data.contacts) {
          setsearchedContacts(response.data.contacts);
        }
      } else setsearchedContacts([]);
    } catch (error) {
      console.log(error);
    }
  };

  const selectNewContact = (contact: any) => {
    setOpenNewContactModal(false);
    setSelectedChatType("contact");
    setSelectedChatData(contact);
    setsearchedContacts([]);
  };

  return (
    <>
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger>
            <FaPlus
              className=" text-neutral-400 font-light text-opacity-90 text-sm hover:text-neutral-100 cursor-pointer transition-all duration-300"
              onClick={() => setOpenNewContactModal(true)}
            />
          </TooltipTrigger>
          <TooltipContent className="bg-[#1c1b1e] border-none mb-2 p-3">
            Select New Contact
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>

      <Dialog open={openNewContactModal} onOpenChange={setOpenNewContactModal}>
        <DialogContent className="bg-[#181920] border-none text-white w-[400px] h-[400px] flex flex-col">
          <DialogDescription className="hidden">
            Please select a contact
          </DialogDescription>
          <DialogHeader>
            <DialogTitle>New Chat</DialogTitle>
          </DialogHeader>
          <div>
            <Input
              placeholder="Search Contacts"
              className="rounded-lg p-6 bg-[#2c2e3b] border-none"
              onChange={(e) => searchContacts(e.target.value)}
            />
          </div>

          <ScrollArea className="h-[250px]">
            <div className="flex flex-col gap-5">
              {searchedContacts.map((contact: any) => (
                <div
                  className="flex gap-3 items-center cursor-pointer"
                  key={contact.id}
                  onClick={() => {
                    selectNewContact(contact);
                  }}
                >
                  <div className="w-12 h-12 relative">
                    <Avatar className="w-12 h-12 rounded-full overflow-hidden">
                      {contact.image ? (
                        <AvatarImage
                          src={`${HOST}/${contact.image}`}
                          alt="profile"
                          className="object-cover w-full h-full bg-black rounded-full"
                        />
                      ) : (
                        <div
                          className={`uppercase w-12 h-12 text-lg  border-[1px] ${getColor(
                            contact.color
                          )} flex items-center justify-center rounded-full`}
                        >
                          {contact.firstName
                            ? contact.firstName.split("").shift()
                            : contact.email.split("").shift()}
                        </div>
                      )}
                    </Avatar>
                  </div>
                  <div className="flex flex-col">
                    <span>
                      {contact.firstName && contact.lastName
                        ? `${contact.firstName} ${contact.lastName}`
                        : ""}
                    </span>
                    <span className="text-xs">{contact.email}</span>
                  </div>
                </div>
              ))}
            </div>
          </ScrollArea>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default NewDM;