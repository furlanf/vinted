import FlickerApi from "../FlickerApi";
import fetch from "../request";

jest.mock("../request");

describe("FlickerApi", () => {
  it("calls fetch and returns result", async () => {
    (fetch as jest.Mock).mockResolvedValue({
      json: () =>
        Promise.resolve({
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
        }),
    });

    const result = await FlickerApi.request("/flicker-search");

    expect(result).toEqual({
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

    expect(fetch).toHaveBeenCalledWith(
      `${process.env.REACT_APP_FLICKER_API}/flicker-search`
    );
  });
});
