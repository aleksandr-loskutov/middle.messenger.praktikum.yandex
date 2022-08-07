export const loginRule = {
  login: {
    isRequired: {
      message: "Логин обязателен для заполнения"
    },
    isLogin: {
      message: "Некорректный логин"
    },
    min: {
      length: 3,
      message: "Не менее 3 символов"
    },
    max: {
      length: 20,
      message: "Не более 20 символов"
    }
  }
};
export const user_to_deleteRule = {
  user_to_delete: {
    ...loginRule.login,
    isRequired: { message: "Введите логин пользователя для удаления" }
  }
};
export const user_to_addRule = {
  user_to_add: {
    ...loginRule.login,
    isRequired: { message: "Введите логин пользователя для добавления" }
  }
};
export const passwordRule = {
  password: {
    isRequired: {
      message: "Пароль обязателен для заполнения"
    },
    min: {
      length: 8,
      message: "Не менее 8 символов"
    },
    max: {
      length: 40,
      message: "Не более 40 символов"
    },
    isCapitalSymbol: { message: "Не менее 1 заглавной буквы" },
    isContainDigit: { message: "Не менее 1 цифры" }
  }
};
export const passwordConfirmRule = {
  password_confirm: {
    ...passwordRule.password,
    isRequired: { message: "Введите пароль повторно" }
  }
};

export const newPasswordRule = {
  new_password: {
    ...passwordRule.password,
    isRequired: { message: "Введите новый пароль" }
  }
};

export const newPasswordConfirmRule = {
  new_password_confirm: {
    ...passwordRule.password,
    isRequired: { message: "Введите новый пароль повторно" }
  }
};

export const emailRule = {
  email: {
    isRequired: {
      message: "Электронная почта обязательна для заполнения"
    },
    isEmail: { message: "Некорректный email" }
  }
};

export const phoneRule = {
  phone: {
    isRequired: {
      message: "Телефон обязателен для заполнения"
    },
    isPhone: {
      message: "Некорректный телефон"
    },
    min: {
      length: 10,
      message: "Не менее 10 символов"
    },
    max: {
      length: 15,
      message: "Не более 15 символов"
    }
  }
};
export const firstNameRule = {
  first_name: {
    isName: {
      message:
        "Некорректное имя: латиница или кириллица, первая буква должна быть заглавной, без пробелов и без цифр, нет спецсимволов (допустим только дефис)"
    }
  }
};
export const secondNameRule = {
  second_name: {
    isName: {
      message:
        "Некорректная фамилия: латиница или кириллица, первая буква должна быть заглавной, без пробелов и без цифр, нет спецсимволов (допустим только дефис)"
    }
  }
};
export const messageRule = {
  message: {
    isRequired: {
      message: "Введите сообщение"
    }
  }
};

export const validationRules = {
  ...loginRule,
  ...user_to_addRule,
  ...user_to_deleteRule,
  ...passwordRule,
  ...passwordConfirmRule,
  ...newPasswordRule,
  ...newPasswordConfirmRule,
  ...emailRule,
  ...phoneRule,
  ...firstNameRule,
  ...secondNameRule,
  ...messageRule
};

export enum ValidationField {
  Login = "login",
  UserToAdd = "user_to_add",
  UserToDelete = "user_to_delete",
  Password = "password",
  PasswordConfirm = "password_confirm",
  NewPassword = "new_password",
  NewPasswordConfirm = "new_password_confirm",
  Email = "email",
  FirstName = "first_name",
  SecondName = "second_name",
  DisplayName = "display_name",
  Phone = "phone",
  Message = "message"
}
