import FlickerApi from "../../../config/FlickerApi";
import { parsePictures } from "../parsers/flickerParser";
import { FlickerResult } from "../types/flicker";
import { PictureRepositoryType } from "../types/repository";

const { REACT_APP_FLICKER_API_KEY } = process.env;

const requestParams =
  `?method=flickr.photos.search&api_key=${REACT_APP_FLICKER_API_KEY}` +
  "&extras=owner_name,url_l,url_s,url_m,url_l,description,title&safe_search=1&tags=city,countryside,berlin" +
  "&format=json&nojsoncallback=1";

const PER_PAGE = 12;

const find = async (page = 1) => {
  const requestURL = `/${requestParams}&per_page=${PER_PAGE}&page=${page}`;

  try {
    const pictures = await FlickerApi.request<FlickerResult>(requestURL);

    return {
      isLastPage: page === pictures.photos.pages,
      pictures: parsePictures(pictures.photos.photo),
      error: null,
    };
  } catch (e) {
    return {
      isLastPage: false,
      pictures: [],
      error: "Something went wrong, try again!",
    };
  }
};

const FlickerRepository: PictureRepositoryType = { find };
export default FlickerRepository;
