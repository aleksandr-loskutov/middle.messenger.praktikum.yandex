export const chats = [
  {
    chatName: "Alex",
    userAvatar: "https://avatars.dicebear.com/api/avataaars/h4gma.svg",
    messageText: "Hello lorem ipsum dolor sit amet",
    messageTime: "11:00",
    isChatActive: true,
    chatUnreadMessages: 3
  },
  {
    chatName: "Bob",
    userAvatar: "https://avatars.dicebear.com/api/avataaars/nxf62.svg",
    userMessage: true,
    messageText: "Hi, how are you?",
    messageTime: "19:13",
    isChatActive: false,
    chatUnreadMessages: 0
  }
];

export const currentChat = {
  chatName: "Alex",
  chatAvatar: "https://avatars.dicebear.com/api/avataaars/h4gma.svg",
  messages: [
    {
      id: 1,
      messageText: `Привет, Alex. Как дела?`,
      messageTime: "12:00",
      isText: true,
      owner: true,
      isSent: true,
      isViewed: true
    },
    {
      id: 2,
      messageText: `Норм, а у тебя?`,
      messageTime: "13:00",
      isText: true,
      owner: false,
      isSent: true,
      isViewed: false
    },
    {
      id: 3,
      messageText: `Тоже ок.`,
      messageTime: "13:50",
      owner: true,
      isText: true,
      isSent: true,
      isViewed: false
    },
    {
      id: 4,
      messageText: `Хочу взять себе такой.`,
      messageTime: "13:50",
      owner: false,
      isText: true
    },
    {
      id: 5,
      image: `https://icdn.lenta.ru/images/2014/03/24/18/20140324182611102/pic_4fcc1b7a6ba0b0c545c1245d66373735.jpg`,
      messageTime: "13:50",
      owner: false,
      isText: false
    }
  ]
};

export const mockData = {
  chats,
  currentChat
};
