import ContactList from "@/components/common/contact-list";
import Logo from "@/components/common/logo";
import ProfileInfo from "./components/profile-info";
import apiClient from "@/lib/api-client";
import {GET_CONTACTS_WITH_MESSAGES_ROUTE,GET_USER_CHANNELS,} from "@/lib/constants";
import { useEffect } from "react";
import { useAppStore } from "@/store";
import NewDM from "./components/new-dm/new-dm";


const ContactsContainer = () => {
  const {
    setDirectMessagesContacts,
    directMessagesContacts,
    setChannels,
  } = useAppStore();

  useEffect(() => {
    const getContactsWithMessages = async () => {
      const response = await apiClient.get(GET_CONTACTS_WITH_MESSAGES_ROUTE, {
        withCredentials: true,
      });
      if (response.data.contacts) {
        setDirectMessagesContacts(response.data.contacts);
      }
    };
    getContactsWithMessages();
  }, [setDirectMessagesContacts]);

  useEffect(() => {
    const getChannels = async () => {
      const response = await apiClient.get(GET_USER_CHANNELS, {
        withCredentials: true,
      });
      if (response.data.channels) {
        setChannels(response.data.channels);
      }
    };
    getChannels();
  }, [setChannels]);

  return (
    <div className="relative md:w-[35vw] lg:w-[30vw] xl:w-[20vw] bg-[#000000] border-r-2 border-[#2f303b] w-full">
      <div className=" pt-3">
        <Logo />
        <div className="absolute pl-1.5 pt-1 pr-1.5 bg-blue-900 rounded-[50%] right-2 top-4"> <NewDM/></div>
      </div>
      <div className="my-5">
      
        <div className="max-h-[38vh] w-full overflow-y-auto scrollbar-hidden">
          <ContactList contacts={directMessagesContacts} />
        </div>
      </div>
     
      <ProfileInfo/>
    </div>
  );
};

export default ContactsContainer;


