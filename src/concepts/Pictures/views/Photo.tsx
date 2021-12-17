import { Picture as PictureType } from "../types/pictures";
import Card, {
  CardInfo,
  CardImage,
  CardUserName,
  CardButton,
  CardPicture,
  CardDescription,
} from "../../../components/Card/Card";

type PictureProps = {
  picture: PictureType;
  addFavorite: Function;
  isFavorite: Function;
};

const Picture: React.FC<PictureProps> = ({
  picture,
  addFavorite,
  isFavorite,
}) => {
  return (
    <Card>
      <CardPicture>
        <source media="(max-width: 564px)" srcSet={picture.images.small} />

        <CardImage
          onLoad={(e) => {
            e.currentTarget.style.opacity = "1";
          }}
          src={picture.images.medium}
          alt={picture.altDescription}
          loading="lazy"
        />
      </CardPicture>

      <CardInfo>
        <CardDescription>{picture.description}</CardDescription>
        <CardUserName>{picture.user.name}</CardUserName>
        <CardButton
          favorite={isFavorite(picture.id)}
          onClick={() => addFavorite(picture.id)}
        >
          Favorite
        </CardButton>
      </CardInfo>
    </Card>
  );
};

export default Picture;
