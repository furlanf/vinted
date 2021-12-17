import fetch from "./request";

const { REACT_APP_UNSPLASH_API, REACT_APP_UNSPLASH_CLIENT_ID } = process.env;

export const request = (url: string, method = "GET"): Promise<Response> => {
  const options = {
    method,
    headers: {
      "Content-Type": "application/json",
      Authorization: `Client-ID ${REACT_APP_UNSPLASH_CLIENT_ID}`,
    },
  };

  const unsplashUrl = `${REACT_APP_UNSPLASH_API}${url}`;

  return fetch(unsplashUrl, options);
};

const UnsplashApi = { request };
export default UnsplashApi;
