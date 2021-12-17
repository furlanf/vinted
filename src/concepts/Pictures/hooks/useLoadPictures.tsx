import { useCallback, useEffect, useState } from "react";

import { Pictures } from "../types/pictures";
import { PhotoRepositoryType } from "../types/repository";

type useLoadPicturesType = {
  loading: boolean;
  hasNextPage: boolean;
  pictures: Pictures;
  loadMore: Function;
  error: string | null;
};

const useLoadPictures = (
  PhotoRepository: PhotoRepositoryType
): useLoadPicturesType => {
  const [pictures, setPictures] = useState<Pictures>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [hasNextPage, setHasNextPage] = useState(false);
  const [page, setPage] = useState(1);

  const fetchPictures = useCallback(
    async (nextPage: number) => {
      setLoading(true);

      const {
        pictures: pic,
        isLastPage,
        error,
      } = await PhotoRepository.find(nextPage);

      setHasNextPage(!isLastPage);
      setLoading(false);
      setError(error);
      setPictures((prevPictures) => [...prevPictures, ...pic]);
    },
    [PhotoRepository]
  );

  useEffect(() => {
    fetchPictures(1);
  }, [fetchPictures]);

  const loadMore = async () => {
    const nextPage = page + 1;

    await fetchPictures(nextPage);

    setPage(nextPage);
  };

  return { pictures, loading, hasNextPage, error, loadMore };
};

export default useLoadPictures;
