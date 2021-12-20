import UnsplashApi from "../UnsplashApi";
import fetch from "../request";

jest.mock("../request");

describe("UnsplashApi", () => {
  it("calls fetch and returns result", async () => {
    (fetch as jest.Mock).mockResolvedValue([
      {
        id: "1",
        urls: {
          small: "url-small",
          regular: "url-medium",
          full: "url-big",
        },
        description: "description",
        alt_description: "alt description",
        user: {
          name: "Owner",
        },
      },
    ]);

    const result = await UnsplashApi.request("/photos");

    expect(result).toEqual([
      {
        id: "1",
        urls: {
          small: "url-small",
          regular: "url-medium",
          full: "url-big",
        },
        description: "description",
        alt_description: "alt description",
        user: {
          name: "Owner",
        },
      },
    ]);

    expect(fetch).toHaveBeenCalledWith(
      `${process.env.REACT_APP_UNSPLASH_API}/photos`,
      {
        headers: {
          Authorization: `Client-ID ${process.env.REACT_APP_UNSPLASH_CLIENT_ID}`,
          "Content-Type": "application/json",
        },
        method: "GET",
      }
    );
  });
});
