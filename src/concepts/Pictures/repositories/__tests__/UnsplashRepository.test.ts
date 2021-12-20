import UnsplashApi from "../../../../config/UnsplashApi";
import UnsplashRepository from "../UnsplashRepository";

jest.mock("../../../../config/UnsplashApi");

describe("FlickerRepository", () => {
  describe("when calling successfully", () => {
    it("calls UnsplashApi and returns pictures", async () => {
      (UnsplashApi.request as jest.Mock).mockReturnValue({
        headers: {
          get: () => 25,
        },
        json: () =>
          Promise.resolve([
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
          ]),
      });

      expect(await UnsplashRepository.find(1)).toEqual({
        error: null,
        isLastPage: false,
        pictures: [
          {
            id: "1",
            images: {
              small: "url-small",
              medium: "url-medium",
              big: "url-big",
            },
            description: "description",
            altDescription: "alt description",
            user: {
              name: "Owner",
            },
          },
        ],
      });

      expect(UnsplashApi.request).toHaveBeenLastCalledWith(
        "/photos/?per_page=12&page=1"
      );
    });
  });

  describe("when calling with error", () => {
    it("calls UnsplashApi and returns default error message", async () => {
      (UnsplashApi.request as jest.Mock).mockRejectedValue("error");

      expect(await UnsplashRepository.find(1)).toEqual({
        error: "Something went wrong, try again!",
        isLastPage: false,
        pictures: [],
      });
    });
  });
});
