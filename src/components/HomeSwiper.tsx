import { FC, useRef, useState } from "react";
import styled from "styled-components";
import { Swiper } from "swiper/react";
import { SwiperOptions } from "swiper/types";

interface Props {
  children: any;
  delay?: number;
}

const HomeSwiper: FC<Props> = ({ children, delay }) => {
  const [_, setInit] = useState(false);
  const nextBtn = useRef(null);
  const prevBtn = useRef(null);

  const swiperConfig: SwiperOptions = {
    spaceBetween: 5,
    speed: 300,
    autoplay: { delay: delay ?? 4000 },
    slidesPerView: 2.2,
    autoHeight: false,
    breakpoints: {
      1250: { slidesPerView: 5.5 },
      1000: { slidesPerView: 4.5 },
      600: { slidesPerView: 3.5 },
    },
  };

  return (
    <Container>
      <button className="swiper-btn prev" ref={prevBtn}>
        <span className="material-symbols-rounded icon">
          keyboard_arrow_left
        </span>
      </button>

      <Swiper
        {...swiperConfig}
        navigation={{
          prevEl: prevBtn.current,
          nextEl: nextBtn.current,
        }}
        onInit={() => setInit(true)}
      >
        {...children}
      </Swiper>

      <button className="swiper-btn next" ref={nextBtn}>
        <span className="material-symbols-rounded icon">
          keyboard_arrow_right
        </span>{" "}
      </button>
    </Container>
  );
};

export default HomeSwiper;

const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  position: relative;

  .swiper {
    position: relative;
  }

  .sipwer-wrapper {
    height: 100%;
  }

  .swiper-slide {
    height: auto;
  }

  .swiper-btn {
    display: flex;
    justify-content: center;
    align-items: center;
    aspect-ratio: 1/1;
    background: none;
    border: none;
    cursor: pointer;
    transition: 0.1s;
    width: 30px;

    @media screen and (max-width: 800px) {
      display: none;
    }

    @media (hover: hover) {
      &:hover {
        .icon {
          color: var(--element-color);
          transform: scale(1.2);
        }
      }
    }

    .icon {
      color: var(--border-color-black);
      line-height: 0;
      font-size: 35px;
      transition: 0.1s;
    }
  }

  /***********************************************************************/

  .swiper-content {
    height: 100%;
    background-color: var(--element-background);
    border: 1px solid var(--border-color-light);
    padding: 0 15px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    padding: 15px 15px 10px;
    transition: 0.1s;

    @media (hover: hover) {
      &:hover {
        background: var(--element-background-hover);
      }
    }

    .body {
      width: 100%;

      .title {
        width: 100%;
        font-family: var(--font-semiBold);
        color: var(--title-color);
        font-size: 15px;
        margin-bottom: 4px;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
        padding: 0;
      }

      .user {
        display: flex;
        align-items: center;
        column-gap: 5px;
        margin-bottom: 5px;

        .img {
          height: 20px;
          min-width: 20px;
          border-radius: 50%;
          overflow: hidden;

          .alt {
            font-size: 12px;
          }
        }

        .name {
          font-family: var(--font-regular);
          color: var(--text-color);
          font-size: 13px;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
          width: 100%;
        }
      }

      .info-list {
        display: flex;
        flex-wrap: wrap;
        padding: 3px 0;
        margin-bottom: 3px;
        column-gap: 9px;

        .break {
          height: 16px;
          width: 0.5px;
          background: var(--border-color);
        }

        .info {
          font-size: 12px;
          font-family: var(--font-regular);
          color: var(--text-color);
          display: flex;
          align-items: center;
          column-gap: 2px;

          .icon {
            font-size: 16px;
          }
        }
      }

      .specializations-list {
        display: flex;
        flex-wrap: wrap;
        column-gap: 5px;
        padding: 10px 0 0;

        .specialization {
          font-size: 12px;
          font-family: var(--font-regular);
          color: var(--text-color);
          display: flex;
          align-items: center;
          line-height: 100%;

          &:last-child {
            .break {
              display: none;
            }
          }

          .break {
            display: flex;
            align-items: center;
            overflow: hidden;
            height: 100%;
            margin-left: 5px;

            span {
              line-height: 0;
              font-size: 20px;
              margin-top: -3px;
            }
          }
        }
      }

      .description {
        .description-content {
          font-size: 13px;
          font-family: var(--font-regular);
          color: var(--text-color);
        }
      }

      .time-ago {
        font-family: var(--font-regular);
        color: var(--text-color);
        font-size: 12px;
        margin-bottom: 3px;
      }

      .button {
        width: 100%;
        padding: 5px;
        background: none;
        border: 1px solid var(--element-color);
        color: var(--element-color);
        border-radius: 50px;
        cursor: pointer;
        transition: 0.1s;

        &:hover {
          background: var(--element-color);
          color: white;
        }
      }
    }

    .salary {
      margin-top: 2px;
      padding-top: 8px;
      border-top: 0.5px solid var(--border-color);
      font-size: 16px;
      font-family: var(--font-semiBold);
      color: var(--title-color);
    }
  }

  /**********************/

  .swiper-content.centered {
    align-items: center;
    cursor: pointer;

    .body {
      display: flex;
      flex-direction: column;
      align-items: center;
      padding: 12px 0;

      .logo {
        height: 60px;
        aspect-ratio: 1/1;
        margin-bottom: 10px;
        border-radius: 50%;
        overflow: hidden;

        .alt {
          font-size: 25px;
        }
      }

      .title {
        margin-bottom: 10px;
        font-size: 17px;
        text-align: center;
        padding: 0 20px;
      }

      .subtitle {
        font-family: var(--font-regular);
        font-weight: normal;
        color: var(--text-color);
        font-size: 14px;
      }

      .description {
        border-top: 1px dashed var(--border-color-light);
        padding: 10px 0;
        margin-bottom: 5px;

        .description-content {
          text-align: center;
          display: -webkit-box;
          -webkit-box-orient: vertical;
          -webkit-line-clamp: 3;
          overflow: hidden;
        }
      }
    }
  }
`;
