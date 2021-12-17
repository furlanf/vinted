import UnsplashApi from "../../../config/UnsplashApi";
import {
  parseResponseWithTotal,
  parsePictures,
} from "../parsers/unsplashParser";
import { PhotoRepositoryType } from "../types/repository";

const PER_PAGE = 12;

const find = async (page: number = 1) => {
  const requestURL = `/photos/?per_page=${PER_PAGE}&page=${page}`;

  try {
    const results = await UnsplashApi.request(requestURL);
    const pictures = await parseResponseWithTotal(results);

    return {
      isLastPage: page === Math.ceil(pictures.total / PER_PAGE),
      pictures: parsePictures(pictures.data),
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

const UnsplashRepository: PhotoRepositoryType = { find };
export default UnsplashRepository;
