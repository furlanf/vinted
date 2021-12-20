import { useRef } from "react";
import { Error, Grid, InfiniteLoading } from "./styles";
import useInfiniteScroll from "../../../hooks/useInfiniteScroll";
import useLoadPictures from "../../../concepts/Pictures/hooks/useLoadPictures";
import useFavoritePicture from "../../../concepts/Pictures/hooks/useFavoritePicture";
import Loader from "../../../components/Loader/Loader";
import Picture from "./Picture";

// Feel free to choose between Unsplash and Flicker
import PictureRepository from "../repositories/UnsplashRepository";
// import PictureRepository from "../repositories/FlickerRepository";

const Gallery: React.FC = () => {
  const { loading, hasNextPage, pictures, loadMore, error } =
    useLoadPictures(PictureRepository);

  const { isFavorite, addFavorite } = useFavoritePicture();
  const ref = useRef(null);

  useInfiniteScroll({ ref, loadMore, loading, hasNextPage });

  return (
    <>
      {error && <Error>{error}</Error>}

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
