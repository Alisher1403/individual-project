import { imagesBucket } from "backend";
import { FC, useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { styled } from "styled-components";

interface Props {
  src: string;
  alt: string;
}

const UserImage: FC<Props> = ({ src, alt }) => {
  const [imageLoaded, setImageLoaded] = useState(false);
  const location = useLocation();

  useEffect(() => {
    setImageLoaded(false);
  }, [location.pathname]);

  if (alt)
    return (
      <Container className={`img-container ${imageLoaded && "img-loaded"}`}>
        {src ? (
          <img
            src={imagesBucket + src}
            className={`${imageLoaded ? "loaded" : "unloaded"}`}
            onLoad={() => {
              setImageLoaded(true);
            }}
            onError={() => setImageLoaded(false)}
          />
        ) : null}
        <span className="alt">{alt[0]}</span>
      </Container>
    );
};

export default UserImage;

const Container = styled.div`
  height: 100%;
  aspect-ratio: 1/1;
  background-color: var(--element-background-dark);
  overflow: hidden;
  color: var(--title-color);
  display: flex;
  justify-content: center;
  align-items: center;
  overflow: hidden;
  position: relative;
  z-index: 2;

  img {
    height: 100%;
    width: 100%;
    object-fit: cover;

    &.loaded {
      background: var(--element-background-dark);
    }

    &.unloaded {
      display: none;
    }
  }

  .img-check {
    display: none;
  }

  .alt {
    font-size: 25px;
    user-select: none;
    position: absolute;
    z-index: -1;
    font-family: var(--font-regular);
    text-transform: uppercase;
  }
`;
