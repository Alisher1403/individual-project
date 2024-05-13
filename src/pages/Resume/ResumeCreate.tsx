import { FC, useState } from "react";
import styled from "styled-components";
import { editorConfig, formData, specializations } from "constant";
import { Select, Input, CheckSelect } from "ui";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import MultiSelect from "../../ui/MultiSelect";
import { skills } from "icons";
import parse from "html-react-parser";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "store";
import { api } from "store/reducers";
import { resetResumes } from "store/reducers/resume";
import { useNavigate } from "react-router-dom";
import { DatePicker } from "antd";
import dayjs from "dayjs";

const ResumeCreate: FC = () => {
  const dispatch = useDispatch() as AppDispatch;
  const navigate = useNavigate();
  const user = useSelector((state: RootState) => state.user.data);

  if (!user?.id) return;

  const [post, setPost] = useState({
    title: "",
    subtitle: "",
    location: "",
    specialization: "...",
    description: "",
    skills: [] as string[],
    salary: 0,
    currency: "dollar" as string,
    emp_type: null as string | null,
    experience: null as string | null,
    education: null as string | null,
    dob: null as null | string,
    remote: false,
    contacts: [],
  });

  function submit() {
    dispatch(api.resume.post(post)).then((e) => {
      if (e.payload) {
        dispatch(api.profile.get(user?.id));
        dispatch(resetResumes());
        navigate(`/profile/${user?.id}`);
      }
    });
  }

  return (
    <Container className="main-container">
      <Content>
        {/* ========= TITLE, SUBTITLE, REMOTE ========== */}
        <Section>
          <InputWrapper>
            <p className="label">Title</p>
            <div className="title">
              <div className="textarea-wrapper">
                <div className="textarea-length">{post.title.length} / 60</div>
                <Input
                  value={post?.title}
                  onChange={(value) => {
                    if (value.length <= 60) {
                      setPost({ ...post, title: value });
                    }
                  }}
                />
              </div>
            </div>
          </InputWrapper>

          <InputWrapper>
            <p className="label">Subtitle</p>
            <div className="textarea-wrapper">
              <div className="textarea-length">
                {post.subtitle.length} / 150
              </div>
              <textarea
                maxLength={150}
                onChange={(e) => {
                  setPost({ ...post, subtitle: e.target.value });
                }}
              ></textarea>
            </div>

            <div className="margin-t">
              <CheckSelect
                value={String(post.remote)}
                options={[{ value: "true", label: "Remote" }]}
                onChange={(value) => {
                  if (value && value[0] === "false") {
                    setPost({ ...post, remote: true });
                  } else {
                    setPost({ ...post, remote: false });
                  }
                }}
              />
            </div>
          </InputWrapper>
        </Section>

        {/* ========= SALARY ========== */}
        <Section>
          <InputWrapper>
            <p className="label">Salary</p>
            <p className="margin-y">
              {post.salary}
              {formData.currency.get(post.currency)}
            </p>
            <Grid>
              <div className="flex">
                <Input
                  value={post.salary}
                  type="number"
                  onChange={(value) => {
                    setPost({ ...post, salary: Number(value) });
                  }}
                />
              </div>
              <Select
                value={post.currency ? post.currency : "dollar"}
                options={formData.currency.data}
                width="60px"
                onChange={(value) => {
                  setPost({ ...post, currency: value });
                }}
              />
            </Grid>
          </InputWrapper>
        </Section>

        {/* ========= AGE ========== */}
        <Section>
          <InputWrapper>
            <p className="label">Date of birth</p>
            <p className="margin-y">{ }</p>
            <div className="dob">
              <DatePicker
                picker="date"
                format={"DD.MM.YYYY"}
                onChange={(value) => {
                  if (value) {
                    const timestamptz = dayjs(value).toISOString();
                    setPost({ ...post, dob: timestamptz });
                  } else {
                    setPost({ ...post, dob: null });
                  }
                }}
              />
            </div>
          </InputWrapper>
        </Section>

        {/* ========= LOCATION, SPECIALIZATION, SKILLS ========== */}
        <Section>
          <InputWrapper>
            <p className="label">Location</p>
            <Input
              value={post?.location}
              onChange={(value) => setPost({ ...post, location: value })}
            />
          </InputWrapper>
          <InputWrapper>
            <p className="label">Specialization</p>
            <Select
              value={post?.specialization}
              options={Object.entries(specializations).map(([_, item]) => ({
                value: item.label,
                label: item.label,
              }))}
              onChange={(value) => {
                setPost({ ...post, specialization: value });
              }}
            />
          </InputWrapper>
          <InputWrapper>
            <div className="multi-select">
              <p className="label">Skills</p>
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
          </InputWrapper>{" "}
        </Section>

        {/* ========= DESCRIPTION ========== */}
        <Section>
          <InputWrapper>
            <p className="label">Description</p>
            <ReactQuill
              theme="snow"
              value={post.description}
              onChange={(value) => setPost({ ...post, description: value })}
              modules={editorConfig.modules}
            />
          </InputWrapper>
          {/*  */}
          <InputWrapper>
            <p className="label">Employment type</p>
            <Select
              options={[{ value: "", label: "..." }, ...formData.emp_type.data]}
              value={post.emp_type || ""}
              onChange={(value) => {
                if (value === "") {
                  setPost({ ...post, emp_type: null });
                } else {
                  setPost({ ...post, emp_type: value! });
                }
              }}
            />
          </InputWrapper>
          {/*  */}
          <InputWrapper>
            <p className="label">Experience</p>
            <Select
              options={[
                { value: "", label: "..." },
                ...formData.experience.data,
              ]}
              value={post.experience || ""}
              onChange={(value) => {
                if (value === "") {
                  setPost({ ...post, experience: null });
                } else {
                  setPost({ ...post, experience: value });
                }
              }}
            />
          </InputWrapper>
          <InputWrapper>
            <p className="label">Education</p>
            <Select
              options={[
                { value: "", label: "..." },
                ...formData.education.data,
              ]}
              value={post.education || ""}
              onChange={(value) => {
                if (value === "") {
                  setPost({ ...post, education: null });
                } else {
                  setPost({ ...post, education: value });
                }
              }}
            />
          </InputWrapper>
        </Section>

        {/* =========**************** END ******************========== */}
        <div className="btn-group">
          <button className="custom-btn" onClick={submit}>
            Create post
          </button>
        </div>
      </Content>
    </Container>
  );
};

export default ResumeCreate;

const Container = styled.div``;

const Content = styled.div`
  padding: 20px 0;

  .btn-group {
    display: flex;
    justify-content: flex-end;
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
  margin: 20px 0;
  border-top: 1px dashed var(--element-color);

  .quill {
    background: var(--element-background);
    border: 1px solid var(--border-color-dark);
    border-radius: 5px;

    .ql-toolbar {
      border: none;
      border-bottom: 1px solid var(--border-color-dark);
    }

    .ql-container {
      border: none;
      padding: 0;

      .ql-editor {
        padding: 15px 10px;
        min-height: 400px;
        height: 100%;
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
`;

const InputWrapper = styled.div`
  padding: 10px 0;

  .margin-y {
    margin: 10px 0;
  }

  .margin-t {
    margin-top: 20px;
  }

  .label {
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

  .title {
    .input-wrapper {
      padding: 10px;
      height: auto;

      .input-input {
        font-size: 20px;
        font-family: var(--font-semiBold);
      }
    }
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

  .textarea-wrapper {
    .textarea-length {
      font-size: 14px;
      font-family: var(--font-regular);
      color: var(--text-color);
      margin-bottom: 5px;
    }

    textarea {
      font-family: var(--font-regular);
      font-size: 14px;
      outline: none;
      border: 1px solid var(--border-color);
      border-radius: 5px;
      resize: vertical;
      width: 100%;
      padding: 10px;
    }
  }

  .dob {
    display: flex;
  }
`;

const Grid = styled.div`
  display: flex;
  gap: 10px;

  .flex {
    display: flex;
    align-items: center;

    .title {
      font-family: var(--font-regular);
      color: var(--title-color);
      font-size: 14px;
      margin-right: 10px;
    }
  }
`;
