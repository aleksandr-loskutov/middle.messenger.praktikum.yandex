export function queryStringify(data: object): string {
  let result = "";
  for (const key in data) {
    if (Object.prototype.hasOwnProperty.call(data, key)) {
      if (typeof data[key] === "object") {
        result += `${key}=${JSON.stringify(data[key])}&`;
      } else {
        result += `${key}=${data[key]}&`;
      }
    }
  }
  return result.slice(0, -1);
}
