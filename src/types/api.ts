export type APIError = {
  reason: string;
};

export type UserDTO = {
  id: number;
  login: string;
  first_name: string;
  second_name: string;
  display_name: string;
  avatar: string;
  phone: string;
  email: string;
};
export type UserUpdateProfileDTO = {
  first_name: string;
  second_name: string;
  display_name: string;
  login: string;
  email: string;
  phone: string;
};

export type LoginDTO = {
  login: string;
  password: string;
};

export type RegisterDTO = {
  first_name: string;
  second_name: string;
  login: string;
  email: string;
  password: string;
  phone: string;
};

export type Token = {
  token: string;
};

export type ChatDTO = {
  id: number;
  title: string;
  avatar: string | null;
  unread_count: number;
  last_message: {
    user: {
      first_name: string;
      second_name: string;
      avatar: string;
      email: string;
      login: string;
      phone: string;
    };
    time: string;
    content: string;
    isMine?: boolean;
  } | null;
};

export type UsersToChatDTO = {
  users: number[];
  chatId: number;
};

export type IdDTO = {
  id: number;
};

export type CreateChatDTO = {
  title: string;
};

export type NewMessageDTO = {
  id: string;
  time: string;
  user_id: string;
  content: string;
  type: string;
};

export type MessageDTO = {
  chat_id: number;
  time: string;
  type: string;
  user_id: number;
  content: string;
  file?: {
    id: number;
    user_id: number;
    path: string;
    filename: string;
    content_type: string;
    content_size: number;
    upload_date: string;
  };
};

export type SendMessageDTO = {
  content: string;
  type: string;
};

export type PasswordsForm = {
  password: string;
  new_password: string;
  new_password_confirm?: string;
};

export type PasswordsToCompare = PasswordsForm & { password_confirm: string };

export type PasswordsDTO = {
  oldPassword: string;
  newPassword: string;
};

export type ByLoginDTO = {
  login: string;
};

export type ChatToken = {
  chatId: number;
  token: string;
  socket: WebSocket;
};
