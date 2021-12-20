import { renderHook, act } from "@testing-library/react-hooks";
import useLoadPictures from "../useLoadPictures";

describe("useLoadingPicture", () => {
  describe("when loading pictures", () => {
    it("returns pictures and its states", async () => {
      const repository = {
        find: jest.fn(() =>
          Promise.resolve({
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
            isLastPage: false,
            error: null,
          })
        ),
      };

      const { result, waitFor } = renderHook(() => useLoadPictures(repository));

      await waitFor(() => {
        expect(result.current.pictures).toEqual([
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
        ]);
      });

      expect(result.current.loading).toEqual(false);
      expect(result.current.error).toEqual(null);
      expect(result.current.hasNextPage).toEqual(true);
    });
  });

  describe("when fetching more data", () => {
    it("calls find with page 2", async () => {
      const repository = {
        find: jest.fn(() =>
          Promise.resolve({
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
            isLastPage: false,
            error: null,
          })
        ),
      };

      const { result, waitForNextUpdate } = renderHook(() =>
        useLoadPictures(repository)
      );

      waitForNextUpdate();

      act(() => {
        result.current.loadMore();
      });

      expect(repository.find).toHaveBeenCalledWith(2);
    });
  });
});
