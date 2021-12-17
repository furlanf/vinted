import useLocalStorage from "../../../hooks/useLocalStorage";
import { Favorites } from "../types/favorites";

const useFavoritePicture = () => {
  const { storedValue: favorites, setValue } = useLocalStorage<Favorites>(
    "favorites",
    []
  );

  const addFavorite = (id: string) => {
    const hasFavorite = favorites.find((fav) => fav === id);

    const value = hasFavorite
      ? favorites.filter((fav) => fav !== id)
      : [...favorites, id];

    setValue(value);
  };

  const isFavorite = (id: string) => favorites.includes(id);

  return { favorites, addFavorite, isFavorite };
};

export default useFavoritePicture;
