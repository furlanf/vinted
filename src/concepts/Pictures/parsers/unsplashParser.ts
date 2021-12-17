import { Pictures } from "../types/pictures";
import {
  UnsplashPhotoResult,
  UnsplashPicture,
  UnsplashPictures,
} from "../types/unsplash";

const defaultDescription = "Unsplash Picture";

const getDescription = (picture: UnsplashPicture): string =>
  picture.description ||
  picture.user.location ||
  picture.alt_description ||
  picture.sponsorship?.tagline ||
  defaultDescription;

export const parsePictures = (pictures: UnsplashPictures): Pictures => {
  return pictures.map((picture) => ({
    id: picture.id,
    images: {
      small: picture.urls.small,
      medium: picture.urls.regular,
      big: picture.urls.full,
    },
    description: getDescription(picture),
    altDescription: picture.alt_description || `${picture.user.name} Picture`,
    user: {
      name: picture.user.name,
    },
  }));
};

// https://unsplash.com/documentation#per-page-and-total
export const parseResponseWithTotal = async (
  response: Response
): Promise<UnsplashPhotoResult> => {
  const total = response.headers.get("X-Total");
  const data = await response.json();

  return { total: Number(total), data };
};
