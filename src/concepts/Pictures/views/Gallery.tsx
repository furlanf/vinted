import { useRef } from "react";
import { Grid, InfiniteLoading } from "./styles";
import useInfiniteScroll from "../../../hooks/useInfiniteScroll";
import useLoadPictures from "../../../concepts/Pictures/hooks/useLoadPictures";
import useFavoritePicture from "../../../concepts/Pictures/hooks/useFavoritePicture";
import Loader from "../../../components/Loader/Loader";
import Picture from "./Photo";

// Feel free to choose between Unsplash and Flicker
// import PhotoRepository from "../repositories/UnsplashRepository";
import PhotoRepository from "../repositories/FlickerRepository";

const Gallery: React.FC = () => {
  const { loading, hasNextPage, pictures, loadMore, error } =
    useLoadPictures(PhotoRepository);

  const { isFavorite, addFavorite } = useFavoritePicture();
  const ref = useRef(null);

  useInfiniteScroll({ ref, loadMore, loading, hasNextPage });

  return (
    <>
      {error && <>{error}</>}

      <Grid>
        {pictures.map((picture) => (
          <Picture
            key={picture.id}
            picture={picture}
            isFavorite={isFavorite}
            addFavorite={addFavorite}
          />
        ))}
      </Grid>

      {loading && <Loader />}
      <InfiniteLoading ref={ref} />
    </>
  );
};

export default Gallery;
