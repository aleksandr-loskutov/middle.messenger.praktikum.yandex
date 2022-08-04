export const loginRule = {
  login: {
    isRequired: {
      message: "Электронная почта обязательна для заполнения"
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
export const messageRule = {
  message: {
    isRequired: {
      message: "Введите сообщение"
    }
  }
};
export const validationRules = {
  ...loginRule,
  ...passwordRule,
  ...emailRule,
  ...phoneRule,
  ...messageRule
};

export enum ValidationField {
  Login = "login",
  Password = "password",
  Email = "email",
  First_name = "first_name",
  Second_name = "second_name",
  Phone = "phone"
}
