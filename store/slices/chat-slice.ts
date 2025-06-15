export const createChatSlice = (set: any, get: any) => ({
  selectedChatType: undefined,
  selectedChatData: undefined,
  selectedChatMessages: [],
  directMessagesContacts: [],
  channels: [],
  isUploading: false,
  fileUploadProgress: 0,
  isDownloading: false,
  downloadProgress: 0,
  setIsUploading: (isUploading: boolean) => set({ isUploading }),
  setFileUploadProgress: (fileUploadProgress: number) => set({ fileUploadProgress }),
  setIsDownloading: (isDownloading: boolean) => set({ isDownloading }),
  setDownloadProgress: (downloadProgress: number) => set({ downloadProgress }),
  setSelectedChatType: (selectedChatType: string) => set({ selectedChatType }),
  setSelectedChatData: (selectedChatData: any) => set({ selectedChatData }),
  setChannels: (channels: any[]) => set({ channels }),
  setSelectedChatMessages: (selectedChatMessages: any[]) =>
    set({ selectedChatMessages }),
  setDirectMessagesContacts: (directMessagesContacts: any[]) =>
    set({ directMessagesContacts }),
  closeChat: () =>
    set({
      selectedChatData: undefined,
      selectedChatType: undefined,
      selectedChatMessages: [],
    }),
  addMessage: (message: any) => {
    const selectedChatMessages = get().selectedChatMessages;
    const selectedChatType = get().selectedChatType;
    set({
      selectedChatMessages: [
        ...selectedChatMessages,
        {
          ...message,
          recipient:
            selectedChatType === "channel"
              ? message.recipent
              : message.recipient._id,
          sender:
            selectedChatType === "channel"
              ? message.sender
              : message.sender._id,
        },
      ],
    });
  },
  addChannel: (channel: any) => {
    const channels = get().channels;
    set({ channels: [channel, ...channels] });
  },
  addContactInDMContacts: (message: any) => {
    console.log({ message });
    const userId = get().userInfo.id;
    const fromId =
      message.sender._id === userId
        ? message.recipient._id
        : message.sender._id;
    const fromData =
      message.sender._id === userId ? message.recipient : message.sender;
    const dmContacts = get().directMessagesContacts;
    const data = dmContacts.find((contact: any) => contact._id === fromId);
    const index = dmContacts.findIndex((contact: any) => contact._id === fromId);
    console.log({ data, index, dmContacts, userId, message, fromData });
    if (index !== -1 && index !== undefined) {
      console.log("in if condition");
      dmContacts.splice(index, 1);
      dmContacts.unshift(data);
    } else {
      console.log("in else condition");
      dmContacts.unshift(fromData);
    }
    set({ directMessagesContacts: dmContacts });
  },
  addChannelInChannelLists: (message: any) => {
    const channels = get().channels;
    const data = channels.find((channel: any) => channel._id === message.channelId);
    const index = channels.findIndex(
      (channel: any) => channel._id === message.channelId
    );
    if (index !== -1 && index !== undefined) {
      channels.splice(index, 1);
      channels.unshift(data);
    }
  },
});