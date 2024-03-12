import { FC, useState } from "react";
import styled from "styled-components";
import { specializations } from "constant";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import { Select, Input } from "antd";
import { skills } from "icons";
import parse from "html-react-parser";

const VacancyCreate: FC = () => {
  const stored = localStorage.getItem("vacancy");
  // sessionStorage.removeItem("vacancy");
  const [post, setPost] = useState(JSON.parse(stored!));

  const vacancy = {
    post,
    set(key: string, value: string) {
      const newItem = { ...this.post, [key]: value };
      localStorage.setItem("vacancy", JSON.stringify(newItem));
      setPost(newItem);
    },
    completed() {},
    step: 0,
  };

  const getPopupContainer = (triggerNode: any) => {
    return triggerNode.parentNode;
  };

  return (
    <Container className="main-container">
      <Content>
        <Indicator>
          {Object.keys(vacancy.post).map((item, index) => {
            return <div key={item} data-indicate={vacancy.step >= index}></div>;
          })}
        </Indicator>

        <Section>
          <InputWrapper>
            <h4>Title</h4>
            <Input value={vacancy.post?.title} onChange={(event) => vacancy.set("title", event.target.value)} />
          </InputWrapper>
          <InputWrapper>
            <h4>Location</h4>
            <Input value={vacancy.post?.title} onChange={(event) => vacancy.set("title", event.target.value)} />
          </InputWrapper>
        </Section>

        <Section>
          <Select
            defaultValue={""}
            value={vacancy.post?.specialization}
            onChange={(value) => vacancy.set("specialization", value)}
            className="specialization-select"
            getPopupContainer={getPopupContainer}
          >
            {Object.entries(specializations).map(([key, item]) => (
              <Select.Option key={key}>{item.label}</Select.Option>
            ))}
          </Select>
        </Section>

        <Section>
          <CKEditor
            data={vacancy.post?.description}
            onChange={(_, e) => vacancy.set("description", e.getData())}
            editor={ClassicEditor}
          />
        </Section>

        <Section>
          <SkillsSelect>
            <Select
              defaultValue={""}
              mode="tags"
              value={vacancy.post?.skills}
              onChange={(value) => vacancy.set("skills", value)}
              className="multi-select"
              getPopupContainer={getPopupContainer}
              placement="bottomLeft"
            >
              {Object.entries(skills).map(([key, item]) => (
                <Select.Option key={key}>
                  <div className="option">
                    <div className="icon">{parse(item.icon)}</div>
                    <p className="name">{item.name}</p>
                  </div>
                </Select.Option>
              ))}
            </Select>
          </SkillsSelect>
        </Section>
      </Content>
    </Container>
  );
};

export default VacancyCreate;

const Container = styled.div``;

const Content = styled.div`
  padding: 20px 0;

  .ant-input {
    color: var(--text-color);
    background: var(--element-background);
    font-family: var(--font-regular);
  }

  .ant-select {
    font-family: var(--font-regular);

    * {
      color: var(--text-color);
    }

    &.ant-select-open {
      .ant-select-selector {
        /* border: 1px solid var(--input-focus-color) !important;
        box-shadow: none !important; */
      }
    }

    .ant-select-selector {
      border: 1px solid var(--border-color-dark);
      background: var(--element-background);
    }

    .ant-select-item-option-selected {
      * {
        color: var(--input-color-active);
      }
    }
  }

  .ant-select-dropdown {
    padding: 3.5px !important;
    background: var(--input-background);
    color: var(--text-color);
  }
`;

const Section = styled.div`
  padding: 20px 0;
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
  h4 {
    font-family: var(--font-semiBold);
    color: var(--title-color-dark);
    font-weight: normal;
    font-size: 13px;
    margin-bottom: 4px;
  }
`;

const SkillsSelect = styled.div`
  .ant-select {
    padding: 0;
    margin: 0;
    width: 100%;

    * {
      padding: 0;
      margin: 0;
    }

    &.ant-select-open {
      .ant-select-selector {
        border-left: none !important;
        border-right: none !important;
        box-shadow: none !important;
      }
    }
  }

  .multi-select {
    width: 100%;

    * {
      padding: 0;
      margin: 0;
    }

    .ant-select-arrow {
      display: none;
    }

    .ant-select-selector {
      background: none;
      padding: 10px 0;
      border-radius: 0;
      border-left: none;
      border-right: none;

      .ant-select-selection-overflow {
        display: flex;
        width: 100%;
        flex-wrap: wrap;
        gap: 6px;
        background: none;

        .ant-select-selection-item {
          display: flex;
          align-items: center;
          height: 35px;
          border: 1px solid var(--border-color);
          background: var(--element-background);
          padding-right: 5px;

          .ant-select-selection-item-content {
            padding: 0 6px;

            .option {
              display: flex;
              align-items: center;
              height: 35px;
              padding: 6px 0;
              pointer-events: none;

              .icon {
                height: 100%;
                aspect-ratio: 1/1;
                overflow: hidden;
                display: flex;
                justify-content: center;
                align-items: center;

                svg {
                  height: 100%;
                  width: 100%;
                }
              }

              .name {
                padding: 0 4px;
                font-size: 14px;
                font-family: var(--font-regular);
              }
            }
          }
        }
      }
    }
  }

  .ant-select-dropdown {
    .ant-select-item {
      border-radius: 5px;
      padding-left: 4px;
      padding-right: 10px;
      overflow: hidden;
      display: flex;
      align-items: center;

      &[aria-selected="true"] {
        background: var(--option-background);

        * {
          font-family: var(--font-semiBold);
          font-weight: normal;
        }
      }

      .option {
        display: flex;
        align-items: center;
        height: 35px;
        padding: 6px;
        pointer-events: none;

        .icon {
          height: 100%;
          aspect-ratio: 1/1;
          overflow: hidden;
          display: flex;
          justify-content: center;
          align-items: center;

          svg {
            height: 100%;
            width: 100%;
          }
        }

        .name {
          padding: 0 4px;
          font-size: 14px;
          font-family: var(--font-regular);
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

  div {
    height: 100%;
    width: 100%;
    background: var(--element-background);
    border: 1px solid var(--border-color-dark);
    border-radius: 2px;
    transition: 0.2s;

    &[data-indicate="true"] {
      background: var(--element-color);
      border: none;
    }
  }
`;
