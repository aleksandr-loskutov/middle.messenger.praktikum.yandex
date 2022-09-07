import { APIError, ChatDTO } from "types/api";
import { DEBUG } from "./consts";

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

export function logger(message: string, data?: object | string) {
  if (DEBUG) {
    console.log(message, data || "");
  }
}

export const getRandomColor = (): string => {
  const letters = "0123456789ABCDEF";
  let color = "#";
  for (let i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
};

const getInitials = (name: string): string | null => {
  let initials;
  const nameSplit = name.split(" ");
  const nameLength = nameSplit.length;
  if (nameLength > 1) {
    initials =
      nameSplit[0].substring(0, 1) + nameSplit[nameLength - 1].substring(0, 1);
  } else if (nameLength === 1) {
    initials = nameSplit[0].substring(0, 1);
  } else return null;

  return initials.toUpperCase();
};

export const createImageFromInitials = (
  size: number,
  name: string,
  color = getRandomColor()
): string | null => {
  if (!name) return null;
  name = getInitials(name) as string;

  const canvas = document.createElement("canvas");
  const context = canvas.getContext("2d") as CanvasRenderingContext2D;
  canvas.width = canvas.height = size;

  context.fillStyle = "#ffffff";
  context.fillRect(0, 0, size, size);

  context.fillStyle = `${color}25`;
  context.fillRect(0, 0, size, size);

  context.fillStyle = color;
  context.textBaseline = "middle";
  context.textAlign = "center";
  context.font = `${size / 2}px Roboto`;
  context.fillText(name, size / 2, size / 2);

  return canvas.toDataURL();
};

export function displayDate(date: string): string {
  const dateObj = new Date(date);
  const today = new Date();
  const yesterday = new Date(today.setDate(today.getDate() - 1));
  const tomorrow = new Date(today.setDate(today.getDate() + 1));
  const yesterdayTime = yesterday.getTime();
  const tomorrowTime = tomorrow.getTime();
  const dateTime = dateObj.getTime();
  if (dateTime > yesterdayTime && dateTime < tomorrowTime) {
    const minutesPrefix = dateObj.getMinutes() < 10 ? "0" : "";
    return `${dateObj.getHours()}:${minutesPrefix}${dateObj.getMinutes()}`;
  } else {
    return dateObj.toLocaleDateString();
  }
}

export function setDefaultAvatars(chats: ChatDTO[]): ChatDTO[] {
  if (!chats) return [];
  return chats.map((chat) => {
    if (!chat.avatar) {
      return { ...chat, avatar: createImageFromInitials(100, chat.title) };
    }
  }) as ChatDTO[];
}

export function cloneDeep<T extends object = object>(obj: T) {
  return (function _cloneDeep(
    item: T
  ): T | Date | Set<unknown> | Map<unknown, unknown> | object | T[] {
    // Handle:
    // * null
    // * undefined
    // * boolean
    // * number
    // * string
    // * symbol
    // * function
    if (item === null || typeof item !== "object") {
      return item;
    }

    // Handle:
    // * Date
    if (item instanceof Date) {
      return new Date(item.valueOf());
    }

    // Handle:
    // * Array
    if (item instanceof Array) {
      const copy = [] as object[];

      item.forEach((_, i) => (copy[i] = _cloneDeep(item[i])));

      return copy;
    }

    // Handle:
    // * Set
    if (item instanceof Set) {
      const copy = new Set();

      item.forEach((v) => copy.add(_cloneDeep(v)));

      return copy;
    }

    // Handle:
    // * Map
    if (item instanceof Map) {
      const copy = new Map();

      item.forEach((v, k) => copy.set(k, _cloneDeep(v)));

      return copy;
    }

    // Handle:
    // * Object
    if (item instanceof Object) {
      const copy: object = {};

      // Handle:
      // * Object.symbol

      Object.getOwnPropertySymbols(item).forEach(
        (s) => (copy[s] = _cloneDeep(item[s]))
      );

      // Handle:
      // * Object.name (other)
      Object.keys(item).forEach((k) => (copy[k] = _cloneDeep(item[k])));

      return copy;
    }

    throw new Error(`Unable to copy object: ${item}`);
  })(obj);
}

//todo рефакторинг
export function connectWebSocket(url: string): Promise<WebSocket> {
  return new Promise(function (resolve, reject) {
    const socket = new WebSocket(url);

    socket.onopen = function () {
      logger("Соединение установлено.");

      socket.addEventListener("error", (event) => {
        logger("Ошибка", event);
      });

      socket.addEventListener("close", (event) => {
        if (event.wasClean) {
          logger("Соединение закрыто чисто");
        } else {
          logger("Обрыв соединения");
        }
        logger(`Код: ${event.code} | Причина: ${event.reason}`);
      });

      const ping = () => {
        if (!socket) return;
        if (socket.readyState !== 1) return;
        socket.send(
          JSON.stringify({
            type: "ping"
          })
        );
        setTimeout(ping, 5000);
      };

      ping();
      resolve(socket);
    };
    socket.onerror = function (err) {
      logger("Ошибка", err);
      reject(err);
    };
  });
}

export function fileToFormData(file: File): FormData {
  const formData = new FormData();
  formData.append("avatar", file, file.name);
  return formData;
}

//todo переделать
export function sanitizeString(str: string): string {
  return str.replace(/[^a-zA-Zа-яА-ЯёЁ0-9 ]/g, "").trim();
}

export function compareObjects(obj1: any, obj2: any): boolean {
  if (obj1 === obj2) return true;

  if (
    typeof obj1 !== "object" ||
    typeof obj2 !== "object" ||
    obj1 == null ||
    obj2 == null
  ) {
    return false;
  }

  const keysA = Object.keys(obj1);
  const keysB = Object.keys(obj2);

  if (keysA.length !== keysB.length) {
    return false;
  }

  let result = true;

  keysA.forEach((key) => {
    if (!keysB.includes(key)) {
      result = false;
    }

    if (typeof obj1[key] === "function" || typeof obj2[key] === "function") {
      if (obj1[key].toString() !== obj2[key].toString()) {
        result = false;
      }
    }

    if (!compareObjects(obj1[key], obj2[key])) {
      result = false;
    }
  });

  return result;
}
