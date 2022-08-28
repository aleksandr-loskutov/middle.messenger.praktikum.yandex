import { queryStringify } from "utils/helpers";
import { API_ENDPOINT } from "utils/consts";

const METHODS = {
  GET: "GET",
  POST: "POST",
  PUT: "PUT",
  DELETE: "DELETE"
};

export class HttpService {
  constructor(private endPoint: string) {}

  get = (url: string, options = {}) => {
    const dataUrl = options.data !== undefined ?? queryStringify(options.data);
    const getUrl = dataUrl ? `${url}${dataUrl}` : url;
    return this.request(getUrl, { ...options, method: METHODS.GET });
  };

  post = (url: string, options = {}) => {
    return this.request(
      url,
      { ...options, method: METHODS.POST },
      options.timeout
    );
  };

  put = (url: string, options = {}) => {
    return this.request(
      url,
      { ...options, method: METHODS.PUT },
      options.timeout
    );
  };

  delete = (url: string, options = {}) => {
    return this.request(
      url,
      { ...options, method: METHODS.DELETE },
      options.timeout
    );
  };

  request = (url: string, options = {}, timeout = 5000) => {
    const { headers = {}, method, data } = options;
    const fullUrl = `${API_ENDPOINT}${this.endPoint}${url}`;
    return new Promise(function (resolve, reject) {
      if (!method) {
        reject("No method");
        return;
      }

      const xhr = new XMLHttpRequest();
      xhr.responseType = "json";
      xhr.open(method, fullUrl);

      Object.keys(headers).forEach((key) => {
        xhr.setRequestHeader(key, headers[key]);
      });

      xhr.onload = function () {
        if ((xhr.status >= 400 && xhr.status < 500) || xhr.status === 200) {
          resolve(xhr.response);
        } else {
          reject(xhr.response);
        }
      };

      xhr.withCredentials = true;
      xhr.onabort = reject;
      xhr.onerror = reject;
      xhr.timeout = timeout;
      xhr.ontimeout = reject;
      if (method === METHODS.GET || !data) {
        xhr.send();
      } else {
        if (data instanceof FormData) {
          xhr.send(data);
        } else {
          xhr.send(JSON.stringify(data));
        }
      }
    });
  };
}
export function fetchWithRetry(url: string, options, endPoint): Promise<any> {
  return new Promise((resolve, reject) => {
    let retry = options.retries || 2;
    const retryLimit = 3;
    const retryDelay = 1000;
    const fetch = () => {
      new HttpService(endPoint)
        .get(url, options)
        .then(resolve)
        .catch(() => {
          if (retry < retryLimit) {
            retry++;
            setTimeout(fetch, retryDelay);
          } else {
            reject();
          }
        });
    };
    fetch();
  });
}
