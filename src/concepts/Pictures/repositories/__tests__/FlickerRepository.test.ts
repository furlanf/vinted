import FlickerApi from "../../../../config/FlickerApi";
import FlickerRepository from "../FlickerRepository";

jest.mock("../../../../config/FlickerApi");

describe("FlickerRepository", () => {
  describe("when calling successfully", () => {
    it("calls FlickerAPI and returns pictures", async () => {
      (FlickerApi.request as jest.Mock).mockResolvedValue({
        photos: {
          pages: 2,
          photo: [
            {
              id: "1",
              url_s: "url-small",
              url_m: "url-medium",
              url_l: "url-big",
              description: {
                _content: "description",
              },
              ownername: "Owner",
            },
          ],
        },
      });

      expect(await FlickerRepository.find(1)).toEqual({
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
            altDescription: "Owner Picture",
            user: {
              name: "Owner",
            },
          },
        ],
      });

      expect(FlickerApi.request).toHaveBeenLastCalledWith(
        `/?method=flickr.photos.search&api_key=${process.env.REACT_APP_FLICKER_API_KEY}&extras=owner_name,url_l,url_s,url_m,url_l,description,title&safe_search=1&tags=city,countryside,berlin&format=json&nojsoncallback=1&per_page=12&page=1`
      );
    });
  });

  describe("when calling with error", () => {
    it("calls FlickerAPI and returns default error message", async () => {
      (FlickerApi.request as jest.Mock).mockRejectedValue("error");

      expect(await FlickerRepository.find(1)).toEqual({
        error: "Something went wrong, try again!",
        isLastPage: false,
        pictures: [],
      });
    });
  });
});
