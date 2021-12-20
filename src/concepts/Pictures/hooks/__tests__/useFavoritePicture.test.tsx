import useLocalStorage from "../../../../hooks/useLocalStorage";
import { renderHook, act } from "@testing-library/react-hooks";
import useFavoritePicture from "../useFavoritePicture";

jest.mock("../../../../hooks/useLocalStorage");

describe("useFavoritePicture", () => {
  describe("when adding to favorite", () => {
    describe("and favorite is not added", () => {
      it("removes from favorite", () => {
        const setValueMock = jest.fn();
        (useLocalStorage as jest.Mock).mockReturnValue({
          storedValue: ["fav-1"],
          setValue: setValueMock,
        });

        const { result } = renderHook(() => useFavoritePicture());

        act(() => {
          result.current.addFavorite("fav-2");
        });

        expect(setValueMock).toHaveBeenLastCalledWith(["fav-1", "fav-2"]);
      });
    });

    describe("and favorite is already added", () => {
      it("removes from favorite", () => {
        const setValueMock = jest.fn();
        (useLocalStorage as jest.Mock).mockReturnValue({
          storedValue: ["fav-1"],
          setValue: setValueMock,
        });

        const { result } = renderHook(() => useFavoritePicture());

        act(() => {
          result.current.addFavorite("fav-1");
        });

        expect(setValueMock).toHaveBeenLastCalledWith([]);
      });
    });
  });

  describe("when fetching favorites", () => {
    it("returns favorites", () => {
      (useLocalStorage as jest.Mock).mockReturnValue({
        storedValue: ["fav-1", "fav-2"],
        setValue: jest.fn(),
      });

      const { result } = renderHook(() => useFavoritePicture());

      expect(result.current.favorites).toEqual(["fav-1", "fav-2"]);
    });
  });
});
