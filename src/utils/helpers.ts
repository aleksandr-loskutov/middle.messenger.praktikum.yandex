import { APIError } from "types/api";

export function hasError(response: any): response is APIError {
  return response && response.reason;
}

export function isEqual(lhs: string, rhs: string): boolean {
  return lhs === rhs;
}

type StringIndexed = Record<string, any>;

export function queryStringify(data: StringIndexed): string | never {
  if (typeof data !== "object") {
    throw new Error("Data must be object");
  }
  const keys = Object.keys(data);
  return keys.reduce((result, key, index) => {
    const value = data[key];
    const endLine = index < keys.length - 1 ? "&" : "";

    if (Array.isArray(value)) {
      const arrayValue = value.reduce<StringIndexed>(
        (result, arrData, index) => ({
          ...result,
          [`${key}[${index}]`]: arrData
        }),
        {}
      );

      return `${result}${queryStringify(arrayValue)}${endLine}`;
    }

    if (typeof value === "object") {
      const objValue = Object.keys(value || {}).reduce<StringIndexed>(
        (result, objKey) => ({
          ...result,
          [`${key}[${objKey}]`]: value[objKey]
        }),
        {}
      );

      return `${result}${queryStringify(objValue)}${endLine}`;
    }

    return `${result}${key}=${value}${endLine}`;
  }, "");
}

export function logger(message: string, data?: object) {
  if (process.env.DEBUG) {
    console.log(message, data);
  }
}
