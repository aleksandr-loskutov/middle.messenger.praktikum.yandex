import { validationRules } from "utils/validator";

export default function validator(data, config?) {
  config = config || findRule(data);
  if (Object.keys(config).length === 0) {
    return { error: "Ошибка валидации" };
  }
  const errors = {};
  function validate(validateMethod, data, config) {
    let statusValidate;
    switch (validateMethod) {
      case "isRequired": {
        if (typeof data === "boolean") {
          statusValidate = !data;
        } else {
          statusValidate = data.trim() === "";
        }
        break;
      }
      case "isEmail": {
        const emailRegExp =
          /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        statusValidate = !emailRegExp.test(data);
        break;
      }
      //
      case "isLogin": {
        const emailRegExp = /^[a-zA-Z][a-zA-Z0-9-_]*$/g;
        statusValidate = !emailRegExp.test(data);
        break;
      }
      case "isPhone": {
        const emailRegExp = /^\+?\d{10,15}$/g;
        statusValidate = !emailRegExp.test(data);
        break;
      }
      case "isCapitalSymbol": {
        const capitalRegExp = /[A-Z]+/g;
        statusValidate = !capitalRegExp.test(data);
        break;
      }
      case "isContainDigit": {
        const digitRegExp = /\d+/g;
        statusValidate = !digitRegExp.test(data);
        break;
      }
      case "min": {
        statusValidate = data.length < config.length;
        break;
      }
      case "max": {
        statusValidate = data.length > config.length;
        break;
      }
      default:
        break;
    }
    if (statusValidate) return config.message;
  }
  for (const fieldName in data) {
    for (const validateMethod in config[fieldName]) {
      const error = validate(
        validateMethod,
        data[fieldName],
        config[fieldName][validateMethod]
      );
      if (error && !errors[fieldName]) {
        errors[fieldName] = error;
      }
    }
  }
  return errors;
}

function findRule(data) {
  for (const fieldName in data) {
    if (validationRules.hasOwnProperty(fieldName)) {
      return { [fieldName]: validationRules[fieldName] };
    }
  }
  return {};
}
