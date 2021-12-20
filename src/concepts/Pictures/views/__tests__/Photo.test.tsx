import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Photo from "../Picture";

describe("Photo", () => {
  const picture = {
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
  };

  describe("when rendering", () => {
    it("renders correctly", () => {
      render(
        <Photo
          picture={picture}
          addFavorite={jest.fn()}
          isFavorite={jest.fn()}
        />
      );

      expect(screen.getByAltText(/vinted picture/i)).toBeInTheDocument();
      expect(screen.getByText(/vinted description/i)).toBeInTheDocument();
      expect(screen.getByText(/username/i)).toBeInTheDocument();
      expect(screen.getByTitle(/vinted description/i)).toBeInTheDocument();
      expect(screen.getByRole("img")).toHaveAttribute("src", "url-medium");
    });
  });

  describe("when is favorite", () => {
    it("renders with correct styles", () => {
      render(
        <Photo
          picture={picture}
          addFavorite={jest.fn()}
          isFavorite={jest.fn().mockReturnValue(true)}
        />
      );

      const favoriteButton = screen.getByText(/favorite/i);

      expect(favoriteButton).toHaveStyle("background-color: white");
      expect(favoriteButton).toHaveStyle("color: black");
    });
  });

  describe("when clicking", () => {
    it("renders with correct styles", () => {
      const favoriteMock = jest.fn();
      render(
        <Photo
          picture={picture}
          addFavorite={favoriteMock}
          isFavorite={jest.fn().mockReturnValue(true)}
        />
      );

      const favoriteButton = screen.getByText(/favorite/i);

      userEvent.click(favoriteButton);

      expect(favoriteMock).toHaveBeenCalledWith(picture.id);
    });
  });
});
