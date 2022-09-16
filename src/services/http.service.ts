import { queryStringify } from "utils/helpers";
import { API_ENDPOINT, METHODS } from "utils/consts";

export class HttpService {
  constructor(private endPoint: string) {}

  get = <TResponse>(
    url: string,
    options: RequestOptions = {}
  ): Promise<TResponse> => {
    const dataUrl = options.data !== undefined ?? queryStringify(options.data);
    const getUrl = dataUrl ? `${url}${dataUrl}` : url;
    return this.request(getUrl, { ...options, method: METHODS.GET });
  };

  post = <TResponse>(
    url: string,
    options: RequestOptions = {}
  ): Promise<TResponse> => {
    return this.request(
      url,
      { ...options, method: METHODS.POST },
      options.timeout
    );
  };

  put = <TResponse>(
    url: string,
    options: RequestOptions = {}
  ): Promise<TResponse> => {
    return this.request(
      url,
      { ...options, method: METHODS.PUT },
      options.timeout
    );
  };

  delete = <TResponse>(
    url: string,
    options: RequestOptions = {}
  ): Promise<TResponse> => {
    return this.request(
      url,
      { ...options, method: METHODS.DELETE },
      options.timeout
    );
  };

  request = <TResponse>(
    url: string,
    options: RequestOptions = {},
    timeout = 5000
  ): Promise<TResponse> => {
    const { headers = {}, method, data } = options;
    const fullUrl = this.endPoint.includes("://")
      ? `${this.endPoint}`
      : `${API_ENDPOINT}${this.endPoint}${url}`;
    return new Promise<TResponse>(function (resolve, reject) {
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
        if (xhr.status === 200) {
          resolve({
            data: xhr.response,
            status: xhr.status
          });
        } else {
          resolve({
            ...xhr.response,
            status: xhr.status,
            data: undefined
          });
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

export function fetchWithRetry(
  url: string,
  options: RequestOptions,
  endPoint: string
): Promise<any> {
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
