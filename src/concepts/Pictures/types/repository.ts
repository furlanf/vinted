import { PicturesResult } from "./pictures";

export type PhotoRepositoryType = {
  find(page: number): Promise<PicturesResult>;
};
