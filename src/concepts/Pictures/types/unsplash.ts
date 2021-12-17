export type UnsplashPicture = {
  id: string;
  urls: {
    small: string;
    regular: string;
    full: string;
  };
  description: string;
  alt_description: string;
  user: {
    location: string;
    name: string;
  };
  sponsorship?: {
    tagline: string;
  };
};
export type UnsplashPictures = UnsplashPicture[];

export type UnsplashPhotoResult = {
  total: number;
  data: UnsplashPicture[];
};
