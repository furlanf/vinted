import { renderHook } from "@testing-library/react-hooks";
import useInfiniteScroll from "../useInfiniteScroll";
import React from "react";
import useIntersectionObserver from "../useIntersectionObserver";

jest.mock("../useIntersectionObserver");

describe("useInfiniteScroll", () => {
  jest.useFakeTimers();
  const loadMoreMock = jest.fn();
  const useRefSpy = jest.spyOn(
    React,
    "useRef"
  ) as unknown as React.RefObject<HTMLElement>;

  describe("when is on intersection", () => {
    beforeEach(() => {
      (useIntersectionObserver as jest.Mock).mockReturnValue(true);
    });

    describe("and is not loading", () => {
      describe("and hasNextPage is true", () => {
        it("executes load more function", () => {
          renderHook(() =>
            useInfiniteScroll({
              ref: useRefSpy,
              hasNextPage: true,
              loading: false,
              loadMore: loadMoreMock,
            })
          );

          expect(useIntersectionObserver).toHaveBeenCalledWith(useRefSpy);

          jest.advanceTimersByTime(300);

          expect(loadMoreMock).toHaveBeenCalledTimes(1);
        });
      });
    });

    describe("and is loading", () => {
      it("does not executes loadMore function", () => {
        renderHook(() =>
          useInfiniteScroll({
            ref: useRefSpy,
            hasNextPage: true,
            loading: true,
            loadMore: loadMoreMock,
          })
        );

        jest.advanceTimersByTime(300);

        expect(loadMoreMock).not.toHaveBeenCalled();
      });
    });

    describe("and hasNextPage is false", () => {
      it("does not executes loadMore function", () => {
        renderHook(() =>
          useInfiniteScroll({
            ref: useRefSpy,
            hasNextPage: false,
            loading: false,
            loadMore: loadMoreMock,
          })
        );

        jest.advanceTimersByTime(300);

        expect(loadMoreMock).not.toHaveBeenCalled();
      });
    });
  });

  describe("when is not on intersection", () => {
    beforeEach(() => {
      (useIntersectionObserver as jest.Mock).mockReturnValue(false);
    });

    it("does not executes loadMore function", () => {
      renderHook(() =>
        useInfiniteScroll({
          ref: useRefSpy,
          hasNextPage: true,
          loading: false,
          loadMore: loadMoreMock,
        })
      );

      jest.advanceTimersByTime(300);

      expect(loadMoreMock).not.toHaveBeenCalled();
    });
  });
});
