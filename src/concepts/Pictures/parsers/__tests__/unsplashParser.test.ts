import { parsePictures } from "../unsplashParser";

describe("flickerParser", () => {
  describe("when description is present", () => {
    const data = [
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
          location: "Munich",
        },
      },
    ];

    it("parses the data and replace tags and show description", () => {
      expect(parsePictures(data)).toEqual([
        {
          altDescription: "alt description",
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
        urls: {
          small: "url-small",
          regular: "url-medium",
          full: "url-big",
        },
        description: "",
        alt_description: "alt description",
        user: {
          name: "Owner",
          location: "Munich",
        },
      },
    ];

    it("uses location as description", () => {
      expect(parsePictures(data)).toEqual([
        {
          altDescription: "alt description",
          description: "Munich",
          id: "1",
          images: { big: "url-big", medium: "url-medium", small: "url-small" },
          user: { name: "Owner" },
        },
      ]);
    });
  });

  describe("when description and location are not present", () => {
    const data = [
      {
        id: "1",
        urls: {
          small: "url-small",
          regular: "url-medium",
          full: "url-big",
        },
        description: "",
        alt_description: "alt description",
        user: {
          name: "Owner",
          location: "",
        },
      },
    ];

    it("uses alt description as description", () => {
      expect(parsePictures(data)).toEqual([
        {
          altDescription: "alt description",
          description: "alt description",
          id: "1",
          images: { big: "url-big", medium: "url-medium", small: "url-small" },
          user: { name: "Owner" },
        },
      ]);
    });
  });

  describe("when description, alt description and location are not present", () => {
    const data = [
      {
        id: "1",
        urls: {
          small: "url-small",
          regular: "url-medium",
          full: "url-big",
        },
        description: "",
        alt_description: "",
        user: {
          name: "Owner",
          location: "",
        },
      },
    ];

    it("uses default description", () => {
      expect(parsePictures(data)).toEqual([
        {
          altDescription: "Owner Picture",
          description: "Unsplash Picture",
          id: "1",
          images: { big: "url-big", medium: "url-medium", small: "url-small" },
          user: { name: "Owner" },
        },
      ]);
    });
  });
});
