type Images = {
  small: string;
  medium: string;
  big: string;
};

type User = { name: string };

export type Picture = {
  id: string;
  images: Images;
  description: string;
  altDescription: string;
  user: User;
};

export type Pictures = Array<Picture>;
export type PicturesResult = {
  isLastPage: boolean;
  pictures: Pictures;
  error: string | null;
};
