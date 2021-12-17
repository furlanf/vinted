import { useEffect, RefObject } from "react";
import useIntersectionObserver from "./useIntersectionObserver";

type useInfinite = {
  ref: RefObject<HTMLElement>;
  hasNextPage: boolean;
  loading: boolean;
  loadMore: Function;
};

const useInfiniteScroll = ({
  ref,
  hasNextPage,
  loading,
  loadMore,
}: useInfinite) => {
  const isIntersecting = useIntersectionObserver(ref);

  const shouldLoadMore = !loading && hasNextPage && isIntersecting;

  useEffect(() => {
    if (shouldLoadMore) {
      const timer = setTimeout(() => {
        loadMore();
      }, 300);

      return () => {
        clearTimeout(timer);
      };
    }
  }, [loadMore, shouldLoadMore]);
};

export default useInfiniteScroll;
