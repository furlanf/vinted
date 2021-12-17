import { FlickerPicture, FlickerPictures } from "../types/flicker";
import { Pictures } from "../types/pictures";

const defaultDescription = "Flicker Picture";

export const getDescription = (picture: FlickerPicture): string =>
  picture.description._content.replace(/(<([^>]+)>)/gi, "").substring(0, 50) ||
  picture.title ||
  defaultDescription;

export const parsePictures = (pictures: FlickerPictures): Pictures => {
  return pictures.map((picture) => ({
    id: picture.id,
    images: {
      small: picture.url_s,
      medium: picture.url_m,
      big: picture.url_l,
    },
    description: getDescription(picture),
    altDescription: `${picture.ownername} Picture`,
    user: {
      name: picture.ownername,
    },
  }));
};
