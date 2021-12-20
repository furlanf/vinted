import { PicturesResult } from "./pictures";

export type PictureRepositoryType = {
  find(page: number): Promise<PicturesResult>;
};
