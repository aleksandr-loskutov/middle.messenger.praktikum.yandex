import { PasswordsDTO, PasswordsForm, UserDTO } from "types/api";

export const transformUser = (data: UserDTO): User => {
  return {
    id: data.id,
    login: data.login,
    firstName: data.first_name,
    secondName: data.second_name,
    displayName: data.display_name,
    avatar: data.avatar,
    phone: data.phone,
    email: data.email
  };
};

export const transformPasswords = (data: PasswordsForm): PasswordsDTO => {
  return {
    oldPassword: data.password,
    newPassword: data.new_password
  };
};
