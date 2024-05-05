import { imagesBucket } from "backend";
import { FC, useState } from "react";
import { styled } from "styled-components";

interface Props {
  src: string;
  alt: string;
}

const UserImage: FC<Props> = ({ src, alt }) => {
  const [loaded, setLoaded] = useState(false);

  if (alt)
    return (
      <Container className={`img-container ${loaded ? "loaded" : ""}`}>
        {src ? (
          <img
            src={imagesBucket + src}
            alt=""
            onError={(e: any) => {
              e.target.style.display = "none";
            }}
            onLoad={() => {
              setLoaded(true);
            }}
          />
        ) : null}
        {!loaded && <span className="alt">{alt[0]}</span>}
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
