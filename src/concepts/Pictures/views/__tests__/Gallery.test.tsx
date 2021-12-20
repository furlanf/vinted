import Gallery from "../Gallery";
import { render, screen } from "@testing-library/react";
import useLoadPictures from "../../hooks/useLoadPictures";

jest.mock("../../hooks/useLoadPictures");
jest.mock("../../../../hooks/useInfiniteScroll");

describe("Gallery", () => {
  describe("when LoadPictures returns pictures", () => {
    const pictures = [
      {
        id: "id",
        images: {
          small: "url-small",
          medium: "url-medium",
          big: "url-big",
        },
        description: "Vinted description",
        altDescription: `Vinted Picture`,
        user: {
          name: "username",
        },
      },
    ];

    beforeEach(() => {
      (useLoadPictures as jest.Mock).mockReturnValue({
        pictures,
        loading: false,
        hasNextPage: false,
        loadMore: jest.fn(),
        error: null,
      });
    });

    it("shows pictures", () => {
      render(<Gallery />);

      expect(screen.getByAltText(/vinted picture/i)).toBeInTheDocument();
      expect(screen.getByText(/vinted description/i)).toBeInTheDocument();
      expect(screen.getByText(/username/i)).toBeInTheDocument();
      expect(screen.getByTitle(/vinted description/i)).toBeInTheDocument();
    });
  });

  describe("when is loading", () => {
    beforeEach(() => {
      (useLoadPictures as jest.Mock).mockReturnValue({
        pictures: [],
        loading: true,
        hasNextPage: false,
        loadMore: jest.fn(),
        error: null,
      });
    });

    it("shows loading", () => {
      render(<Gallery />);

      expect(screen.getByTitle(/Loading/i)).toBeInTheDocument();
    });
  });

  describe("when is error", () => {
    beforeEach(() => {
      (useLoadPictures as jest.Mock).mockReturnValue({
        pictures: [],
        loading: true,
        hasNextPage: false,
        loadMore: jest.fn(),
        error: "Vinted Error",
      });
    });

    it("shows error", () => {
      render(<Gallery />);

      expect(screen.getByText(/Vinted Error/i)).toBeInTheDocument();
    });
  });
});
