import { ChatProps } from "components/chat/chat";
import { CurrentChatProps } from "pages/chat/chatPage";
import { User } from "types";
export const chats: ChatProps[] = [
  {
    chatName: "Alex",
    userAvatar: "https://i.pravatar.cc/150?img=11",
    messageText: "Hello lorem ipsum dolor sit amet",
    messageTime: "11:00",
    isChatActive: true,
    chatUnreadMessages: 3
  },
  {
    chatName: "Bob",
    userAvatar: "https://i.pravatar.cc/150?img=3",
    userMessage: true,
    messageText: "Hi, how are you?",
    messageTime: "19:13",
    isChatActive: false,
    chatUnreadMessages: 0
  }
];

export const currentChat: CurrentChatProps = {
  chatName: "Alex",
  chatAvatar: "https://i.pravatar.cc/150?img=11",
  messages: [
    {
      id: 1,
      messageText: "Привет, Alex. Как дела?",
      messageTime: "12:00",
      isText: true,
      owner: true,
      isSent: true,
      isViewed: true
    },
    {
      id: 2,
      messageText: "Норм, а у тебя?",
      messageTime: "13:00",
      isText: true,
      owner: false,
      isSent: true,
      isViewed: false
    },
    {
      id: 3,
      messageText: "Тоже ок.",
      messageTime: "13:50",
      owner: true,
      isText: true,
      isSent: true,
      isViewed: true
    },
    {
      id: 4,
      messageText: "Хочу взять себе такой.",
      messageTime: "13:50",
      owner: false,
      isText: true
    },

    {
      id: 5,
      image: "https://icdn.lenta.ru/images/2014/03/24/18/20140324182611102/pic_4fcc1b7a6ba0b0c545c1245d66373735.jpg",
      messageTime: "13:50",
      owner: false,
      isText: false
    },
    {
      id: 6,
      messageText: "Гвозди забивать?",
      messageTime: "13:54",
      owner: true,
      isText: true,
      isSent: true,
      isViewed: false
    }
  ]
};

export const user: User = {
  id: 1,
  name: "Александр",
  avatar: "https://i.pravatar.cc/150?img=6",
  login: "alex",
  phone: "89211111111"
};

export const mockData = {
  chats,
  currentChat,
  user
};
