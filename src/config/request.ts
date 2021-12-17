const checkStatus = (response: Response) => {
  if (response.status >= 200 && response.status < 300) {
    return response;
  } else {
    throw new Error(response.statusText);
  }
};

const request = async (url: string, options: object = {}) => {
  const response = await fetch(url, options);
  return checkStatus(response);
};

export default request;
