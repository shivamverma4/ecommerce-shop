export const checkStatus = response => {
  if (
    response.status >= 200 &&
    response.status < 300
  ) {
    return response;
  }
  return response.json().then(json => {
    return Promise.reject({
      status: response.status,
      ok: false,
      statusText: response.statusText,
      body: json
    });
  });
};

export const parseJSON = response => {
  return response.text();
};

export const parseHTML = response => {
  return response.text();
};

const fetchData = async (url, options) => {
  const headers = {
    ...options.headers,
  };
  options = {
    ...options,
    headers: headers
  };
  return fetch(url, options)
    .then(checkStatus)
    .then(headers["Accept"] && headers["Accept"] === "text/html" ? parseHTML : parseJSON)
    .then(data => data)
    .catch(error => error);
};

export default fetchData;
