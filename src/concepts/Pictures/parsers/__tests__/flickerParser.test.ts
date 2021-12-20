import { parsePictures } from "../flickerParser";

describe("flickerParser", () => {
  describe("when description content is present", () => {
    const data = [
      {
        id: "1",
        url_s: "url-small",
        url_m: "url-medium",
        url_l: "url-big",
        description: {
          _content: "<h1>description</h1>",
        },
        ownername: "Owner",
        title: "Title",
      },
    ];

    it("parses the data and replace tags and show description", () => {
      expect(parsePictures(data)).toEqual([
        {
          altDescription: "Owner Picture",
          description: "description",
          id: "1",
          images: { big: "url-big", medium: "url-medium", small: "url-small" },
          user: { name: "Owner" },
        },
      ]);
    });
  });

  describe("when description is not present", () => {
    const data = [
      {
        id: "1",
        url_s: "url-small",
        url_m: "url-medium",
        url_l: "url-big",
        description: {
          _content: "",
        },
        ownername: "Owner",
        title: "Title",
      },
    ];

    it("uses title as description", () => {
      expect(parsePictures(data)).toEqual([
        {
          altDescription: "Owner Picture",
          description: "Title",
          id: "1",
          images: { big: "url-big", medium: "url-medium", small: "url-small" },
          user: { name: "Owner" },
        },
      ]);
    });
  });

  describe("when description is not present and title", () => {
    const data = [
      {
        id: "1",
        url_s: "url-small",
        url_m: "url-medium",
        url_l: "url-big",
        description: {
          _content: "",
        },
        ownername: "Owner",
        title: "",
      },
    ];

    it("uses default description", () => {
      expect(parsePictures(data)).toEqual([
        {
          altDescription: "Owner Picture",
          description: "Flicker Picture",
          id: "1",
          images: { big: "url-big", medium: "url-medium", small: "url-small" },
          user: { name: "Owner" },
        },
      ]);
    });
  });
});
