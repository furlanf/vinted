import fetch from "./request";

const { REACT_APP_FLICKER_API } = process.env;

export const request = async <T>(url: string): Promise<T> => {
  const flickerUrl = `${REACT_APP_FLICKER_API}${url}`;

  const response = await fetch(flickerUrl);
  return await response.json();
};

const FlickerApi = { request };
export default FlickerApi;
