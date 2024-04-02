import { imagesBucket } from "backend";
import { FC, useState } from "react";
import { styled } from "styled-components";

interface Props {
  src: string;
  alt: string;
}

const UserImage: FC<Props> = ({ src, alt }) => {
  const [imageLoaded, setImageLoaded] = useState(true);

  if (src && alt)
    return (
      <Container className={`img-container ${imageLoaded && "img-loaded"}`}>
        {src && imageLoaded ? (
          <img
            src={imagesBucket + src}
            className="unloaded"
            onLoad={(e: any) => {
              if (e.target && e.target?.className) {
                e.target.className = "loaded";
                setImageLoaded(true);
              }
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

    .loaded {
      background: var(--element-background-dark);
    }
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
