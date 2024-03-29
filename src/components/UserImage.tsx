import { imagesBucket } from "backend";
import { FC, useState } from "react";
import { styled } from "styled-components";

interface Props {
  image: string;
  name: string;
}

const UserImage: FC<Props> = ({ image, name }) => {
  const [imageLoaded, setImageLoaded] = useState(true);

  if (image && name)
    return (
      <Container>
        {image && imageLoaded ? (
          <img
            src={imagesBucket + image}
            onLoad={(e: any) => {
              if (e.target && e.target?.style) {
                e.target.style.background = "var(--element-background-dark)";
              }
            }}
            onError={() => setImageLoaded(false)}
          />
        ) : null}
        <span className="error-text">{name[0]}</span>
      </Container>
    );
};

export default UserImage;

const Container = styled.div`
  height: 100%;
  aspect-ratio: 1/1;
  background-color: var(--element-background-dark);
  border-radius: 50%;
  overflow: hidden;
  color: var(--title-color);
  display: flex;
  justify-content: center;
  align-items: center;
  overflow: hidden;
  position: relative;
  z-index: 2;

  @media screen and (max-width: 700px) {
    min-width: 30px;
    width: 30px;
    margin-right: 7px;
  }

  img {
    height: 100%;
    width: 100px;
    object-fit: cover;
  }

  .error-text {
    font-size: 25px;
    line-height: 0;
    user-select: none;
    position: absolute;
    z-index: -1;
    font-family: var(--font-regular);
    text-transform: uppercase;
  }
`;
