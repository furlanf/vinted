export type FlickerPicture = {
  description: { _content: string };
  id: string;
  ownername: string;
  title: string;
  url_l: string;
  url_m: string;
  url_s: string;
};

export type FlickerPictures = FlickerPicture[];

export type FlickerResult = {
  photos: { pages: number; photo: FlickerPicture[] };
};
