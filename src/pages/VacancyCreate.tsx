import { FC, useRef, useState } from "react";
import styled from "styled-components";
import { editorConfig, specializations } from "constant";
import Input from "../ui/Input";
import Select from "../ui/Select";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import MultiSelect from "../ui/MultiSelect";
import { skills } from "icons";
import parse from "html-react-parser";

const maxSteps = 3;

const VacancyCreate: FC = () => {
  const [post, setPost] = useState({
    title: "",
    subtitle: "",
    location: "",
    specialization: "",
    description: "",
    skills: [] as string[],
  });

  const btns = {
    prev: useRef(null),
    next: useRef(null),
  };

  const [step, setStep] = useState(1);

  return (
    <Container className="main-container">
      <Content>
        <Indicator>
          {[1, 2, 3, 4].map((item) => {
            return (
              <div
                key={item}
                className="indicator"
                data-indicate={step >= item + 1}
              >
                <div></div>
              </div>
            );
          })}
        </Indicator>

        <SectorWrapper>
          <Section data-current={step === 1}>
            <InputWrapper>
              <label>Title</label>
              <Input
                value={post?.title}
                onChange={(value) => setPost({ ...post, title: value })}
              />
            </InputWrapper>
            <InputWrapper>
              <label>Subtitle</label>
              <ReactQuill
                theme="snow"
                value={post?.subtitle}
                onChange={(value) => setPost({ ...post, subtitle: value })}
                modules={editorConfig.modules}
              />
            </InputWrapper>
            <InputWrapper>
              <label>Location</label>
              <Input
                value={post?.location}
                onChange={(value) => setPost({ ...post, location: value })}
              />
            </InputWrapper>

            <InputWrapper>
              <label>Specialization</label>
              <Select
                value={post?.specialization}
                options={Object.entries(specializations).map(([key, item]) => ({
                  value: key,
                  label: item.label,
                }))}
                onChange={(value) => {
                  if (value) {
                    setPost({ ...post, specialization: value });
                  } else {
                    setPost({ ...post, specialization: "" });
                  }
                }}
              />
            </InputWrapper>

            <InputWrapper>
              <div className="multi-select">
                <label>Skills</label>
                <MultiSelect
                  value={post?.skills}
                  options={Object.entries(skills).map(([key, item]) => {
                    return {
                      value: key,
                      label: (
                        <div className="option">
                          <div className="icon">{parse(item.icon)}</div>
                          <div className="name">{item.name}</div>
                        </div>
                      ),
                    };
                  })}
                  onChange={(value) => {
                    if (value) {
                      setPost({ ...post, skills: value });
                    }
                  }}
                />
              </div>
            </InputWrapper>
          </Section>

          <Section data-current={step === 2}>
            {" "}
            <InputWrapper>
              <label>Description</label>
              <ReactQuill
                theme="snow"
                value={post.description}
                onChange={(value) => setPost({ ...post, description: value })}
                modules={editorConfig.modules}
              />
            </InputWrapper>
          </Section>

          <Section data-current={step === 3}></Section>
        </SectorWrapper>

        <div className="btn-group">
          <button
            className="custom-btn secondary"
            ref={btns.prev}
            onClick={() => {
              if (step > 1) {
                setStep(step - 1);
              }
            }}
          >
            Back
          </button>
          <button
            className="custom-btn"
            ref={btns.next}
            onClick={() => {
              if (step < maxSteps) {
                setStep(step + 1);
              }
            }}
          >
            Next
          </button>
        </div>
      </Content>
    </Container>
  );
};

export default VacancyCreate;

const Container = styled.div``;

const Content = styled.div`
  padding: 20px 0;

  .btn-group {
    display: flex;
    justify-content: space-between;
    column-gap: 7px;
    padding: 20px 0;

    .custom-btn {
      padding: 0 30px;
    }
  }

  .swiper {
    overflow-y: visible;
  }
`;

const Section = styled.div`
  padding: 20px 0;
  display: none;

  &[data-current="true"] {
    display: block;
  }

  .quill {
    padding: 10px 0;

    .ql-toolbar {
      background: var(--element-background);
      border: 1px solid var(--border-color-dark);
      border-radius: 100px;
    }

    .ql-container {
      border: none;
      border-bottom: 1px solid var(--border-color-dark);
      padding: 0;

      .ql-editor {
        padding: 15px 0;
      }
    }
  }

  h1 {
    font-size: 25px;
    font-family: var(--font-bold);
    color: var(--title-color);
    margin-bottom: 15px;
  }

  .specialization-select {
    width: 100%;
  }

  .next-button-wrapper {
    width: 100%;
    display: flex;
    justify-content: flex-end;
    margin-top: 10px;

    .next-button {
      font-size: 16px;
      color: white;
      font-family: var(--font-semiBold);
      background: var(--element-color);
      border: 1px solid var(--border-color);
      border-radius: 5px;
      padding: 7px 20px;
      cursor: pointer;
    }
  }
`;

const InputWrapper = styled.div`
  padding: 5px 0;

  label {
    font-family: var(--font-semiBold);
    color: var(--title-color-dark);
    font-weight: normal;
    font-size: 13px;
    margin-bottom: 4px;
  }

  label {
    z-index: -1;

    &[for="img"] {
      cursor: pointer;
    }
  }

  input[type="file"] {
    display: none;
  }

  .image {
    height: 100px;
    width: 100px;
    background: var(--element-background-dark);
    border-radius: 50%;
    display: flex;
    justify-content: center;
    align-items: center;
    overflow: hidden;

    img {
      height: 100%;
      width: 100%;
      object-fit: cover;
    }
  }

  .multi-select {
    .option {
      display: flex;
      align-items: center;
      column-gap: 5px;

      .icon {
        height: 20px;
        width: 20px;

        svg {
          height: 100%;
          width: 100%;
        }
      }
    }

    .ui-multi-select {
      .selection-list {
        gap: 7px;

        .selection {
          border-radius: 5px;
        }
      }
    }
  }
`;

const Indicator = styled.div`
  display: flex;
  column-gap: 2px;
  max-width: 600px;
  width: 100%;
  height: 5px;
  margin: 0 auto;
  margin-bottom: 20px;
  overflow: hidden;

  .indicator {
    height: 100%;
    width: 100%;
    background: var(--element-background);
    border: 1px solid var(--border-color-dark);
    border-radius: 2px;

    div {
      width: 0;
      height: 100%;
      transition: 0.6s;
      background: var(--element-color);
    }

    &[data-indicate="true"] {
      div {
        width: 100%;
        transform-origin: left;
      }
    }
  }
`;

const SectorWrapper = styled.div``;
