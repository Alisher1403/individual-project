import { FC, useEffect, useState } from "react";
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
import { useNavigate, useParams } from "react-router-dom";
import { supabase } from "backend";
import { resetVacancies } from "store/reducers/vacancy";

const VacancyEdit: FC = () => {
  const dispatch = useDispatch() as AppDispatch;
  const navigate = useNavigate();
  const id = useParams()?.id;
  const user = useSelector((state: RootState) => state.user.data);
  const [exactSalary, setExactSalary] = useState(false);

  const ages = [...Array(60 - 10 + 1).keys()]
    .map((i) => i + 10)
    .map((e) => ({
      value: String(e),
      label: String(e),
    }));

  const [post, setPost] = useState<null | any>(null);

  function submit() {
    if (id) {
      dispatch(api.vacancy.update({ id, post })).then((e) => {
        if (e.payload) {
          navigate(`/profile/${user?.id}`);
          dispatch(api.profile.get(user?.id));
          dispatch(resetVacancies());
        }
      });
    }
  }

  useEffect(() => {
    if (id) {
      supabase
        .from("vacancies")
        .select("*")
        .eq("id", id)
        .then((response) => {
          if (response.data) {
            const data = response.data[0];
            setPost({ ...data });
          }
        });
    }
  }, []);

  if (post && post?.user_id === user?.id)
    return (
      <Container className="main-container">
        <Content>
          <Section>
            <InputWrapper>
              <p className="label">Title</p>
              <div className="title">
                <div className="textarea-wrapper">
                  <div className="textarea-length">
                    {post.title.length} / 60
                  </div>
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
                  {post.subtitle?.length} / 150
                </div>
                <textarea
                  maxLength={150}
                  value={post?.subtitle}
                  onChange={(e) => {
                    if (e.target.value.length <= 150) {
                      setPost({ ...post, subtitle: e.target.value });
                    }
                  }}
                ></textarea>
              </div>
            </InputWrapper>
          </Section>
          <Section>
            <InputWrapper>
              <p className="label">Salary</p>
              <Grid>
                <div className="flex">
                  {!exactSalary ? <p className="title">from</p> : null}
                  <Input
                    value={post.fromSalary || 0}
                    type="number"
                    onChange={(value) => {
                      if (!exactSalary) {
                        setPost({ ...post, fromSalary: Number(value) });
                      } else {
                        setPost({
                          ...post,
                          fromSalary: Number(value),
                          toSalary: Number(value),
                        });
                      }
                    }}
                  />
                </div>
                {!exactSalary ? (
                  <div className="flex">
                    <p className="title">to</p>
                    <Input
                      value={post.toSalary || 0}
                      type="number"
                      onChange={(value) =>
                        setPost({ ...post, toSalary: Number(value) })
                      }
                    />
                  </div>
                ) : null}
                <Select
                  value={post.currency ? post.currency : "dollar"}
                  options={formData.currency.data}
                  width="60px"
                  onChange={(value) => {
                    setPost({ ...post, currency: value });
                  }}
                />
              </Grid>
              <div className="margin-t">
                <CheckSelect
                  value={String(exactSalary)}
                  options={[{ value: "true", label: "Exact salary" }]}
                  onChange={(value) => {
                    if (value && value[0] === "false") {
                      setExactSalary(true);
                    } else {
                      setExactSalary(false);
                    }
                  }}
                />
              </div>
            </InputWrapper>
          </Section>
          <Section>
            <InputWrapper>
              <p className="label">
                Age - From {post.fromAge} to {post.toAge}
              </p>
              <Grid>
                <Grid>
                  <div className="flex">
                    <p className="title">from</p>
                    <Select
                      value={String(post.fromAge || "")}
                      options={[{ value: "", label: "..." }, ...ages]}
                      onChange={(value) =>
                        setPost({ ...post, fromAge: Number(value) })
                      }
                    />
                  </div>
                  <div className="flex">
                    <p className="title">to</p>
                    <Select
                      value={String(post.toSalary || "")}
                      options={[{ value: "", label: "..." }, ...ages]}
                      onChange={(value) =>
                        setPost({ ...post, toAge: Number(value) })
                      }
                    />
                  </div>
                </Grid>
              </Grid>
            </InputWrapper>
          </Section>
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
                <p className="label">Skills</p>
                <MultiSelect
                  value={post?.skills || []}
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
                options={[
                  { value: "", label: "..." },
                  ...formData.emp_type.data,
                ]}
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
          <div className="btn-group">
            <button className="custom-btn" onClick={submit}>
              Save changes
            </button>
          </div>
        </Content>
      </Container>
    );
};

export default VacancyEdit;

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
