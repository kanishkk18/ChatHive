import { HOST } from "@/lib/constants";
import { getColor } from "@/lib/utils";
import { useAppStore } from "@/store";
import { Avatar, AvatarFallback, AvatarImage } from "@radix-ui/react-avatar";

const ContactList = ({ contacts, isChannel = false }) => {
  const {
    selectedChatData,
    setSelectedChatType,
    setSelectedChatData,
    setSelectedChatMessages,
  } = useAppStore();

  const handleClick = (contact) => {
    if (isChannel) setSelectedChatType("channel");
    else setSelectedChatType("contact");
    setSelectedChatData(contact);
    if (selectedChatData && selectedChatData._id !== contact._id) {
      setSelectedChatMessages([]);
    }
  };

  return (
    <div className="mt-1">
      {contacts.map((contact) => (
        <div
          key={contact._id}
          className={`pl-3 py-3  border-b-[0.1px] border-b-zinc-900 text-[18px] text-white font-semibold transition-all duration-300 cursor-pointer ${
            selectedChatData && selectedChatData._id === contact._id
              ? "bg-[#8417ff] hover:bg-[#8417ff]"
              : "hover:bg-[#f1f1f111] "
          }`}
          onClick={() => handleClick(contact)}
        >
          <div className="flex gap-2 items-center justify-start text-neutral-300">
            {!isChannel && (
              <Avatar className="h-12 w-12  ">
                {contact.image && (
                  <AvatarImage
                    src={`${HOST}/${contact.image}`}
                    alt="profile"
                    className="rounded-full bg-cover h-full w-full"
                  />
                )}

                <AvatarFallback
                  className={`uppercase ${
                    selectedChatData && selectedChatData._id === contact._id
                      ? "bg-[#ffffff22] border border-white/50"
                      : getColor(contact.color)
                  } h-12 w-12 flex items-center justify-center rounded-full text-2xl`}
                >
                  {contact.firstName.split("").shift()}
                </AvatarFallback>
              </Avatar>
            )}
            {isChannel && (
              <div
                className={` bg-[#ffffff22] h-10 w-10 flex items-center justify-center rounded-full`}
              >
                #
              </div>
            )}
            {isChannel ? (
              <span>{contact.name}</span>
            ) : (
              <span>{`${contact.firstName} ${contact.lastName}`}</span>
            )}
          </div>
        </div>
      ))}
    </div>
  );
};

export default ContactList;
