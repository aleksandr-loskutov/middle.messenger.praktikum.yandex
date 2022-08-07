const METHODS = {
  GET: "GET",
  POST: "POST",
  PUT: "PUT",
  DELETE: "DELETE"
};

class HTTPTransport {
  get = (url: string, options = {}) => {
    return this.request(
      url,
      { ...options, method: METHODS.GET },
      options.timeout
    );
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

    return new Promise(function (resolve, reject) {
      if (!method) {
        reject("No method");
        return;
      }

      const xhr = new XMLHttpRequest();
      const isGet = method === METHODS.GET;

      xhr.open(method, isGet && !!data ? `${url}${queryStringify(data)}` : url);

      Object.keys(headers).forEach((key) => {
        xhr.setRequestHeader(key, headers[key]);
      });

      xhr.onload = function () {
        resolve(xhr);
      };

      xhr.onabort = reject;
      xhr.onerror = reject;

      xhr.timeout = timeout;
      xhr.ontimeout = reject;

      if (isGet || !data) {
        xhr.send();
      } else {
        xhr.send(data);
      }
    });
  };
}
function fetchWithRetry(url: string, options): Promise<any> {
  return new Promise((resolve, reject) => {
    let retry = options.retries || 2;
    const retryLimit = 3;
    const retryDelay = 1000;
    const fetch = () => {
      new HTTPTransport()
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

function queryStringify(data: object): string {
  let result = "";
  for (let key in data) {
    if (data.hasOwnProperty(key)) {
      if (typeof data[key] === "object") {
        result += `${key}=${JSON.stringify(data[key])}&`;
      } else {
        result += `${key}=${data[key]}&`;
      }
    }
  }
  return result.slice(0, -1);
}
