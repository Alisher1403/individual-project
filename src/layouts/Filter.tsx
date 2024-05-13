import { FC, useEffect, useState } from "react";
import styled from "styled-components";
import { CheckSelect, RadioSelect, Select, Input } from "ui";
import { formData } from "constant";
import { useSearchParams } from "hooks";
import { Slider } from "antd";
import { useLocation } from "react-router-dom";

interface FilterProps { }

const Filter: FC<FilterProps> = () => {
  const searchParams = useSearchParams();
  const location = useLocation();
  const { experience, emp_type, education, remote, salary, currency, age } =
    searchParams.getAll();

  const [salaryValue, setSalaryValue] = useState(salary);
  const [ageValue, setAgeValue] = useState(age);

  useEffect(() => {
    setSalaryValue(salary);
    setAgeValue(age);
  }, [location.search]);

  return (
    <Container>
      <Content>
        <form>
          <h2 className="title">Apply Filters</h2>

          <Section>
            <p className="section-title">{formData.experience.title}</p>
            <RadioSelect
              value={experience || ""}
              options={[
                { value: "", label: "All" },
                ...formData.experience.data,
              ]}
              onChange={(value) => {
                if (value === "") {
                  searchParams.set({ experience: undefined });
                } else {
                  searchParams.set({ experience: value });
                }
              }}
            />
          </Section>

          <Section>
            <p className="section-title">{formData.emp_type.title}</p>
            <CheckSelect
              value={emp_type}
              options={formData.emp_type.data}
              onChange={(value) => searchParams.set({ emp_type: value })}
            />
          </Section>

          <Section>
            <p className="section-title">{formData.education.title}</p>
            <CheckSelect
              value={education}
              options={formData.education.data}
              onChange={(value) => searchParams.set({ education: value })}
            />
          </Section>

          <Section>
            <p className="section-title">Remote work</p>
            <CheckSelect
              value={remote || "false"}
              options={[{ value: "true", label: "Remote" }]}
              onChange={(value) => {
                if (value) {
                  if (value[0] === "false") {
                    searchParams.set({ remote: true });
                  } else if (value[0] === "true") {
                    searchParams.set({ remote: undefined });
                  }
                }
              }}
            />
          </Section>

          <Section>
            <p className="section-title">
              Age {ageValue && ageValue}
            </p>
            <Slider
              min={10}
              max={60}
              value={ageValue || 0}
              defaultValue={0}
              onChange={(value) => {
                setAgeValue(value);
              }}
              onChangeComplete={(value) => {
                searchParams.set({ age: value });
              }}
            />
          </Section>

          <Section>
            <p className="section-title">{formData.salary.title}</p>

            <div className="salary grid mb">
              <Input
                type="number"
                value={salaryValue}
                placeholder="type only numbers"
                onChange={(value) => setSalaryValue(value)}
              />
              <Select
                value={currency ? currency : "dollar"}
                options={formData.currency.data}
                width="60px"
                onChange={(value) => searchParams.set({ currency: value })}
              />
            </div>
            <div className="end">
              <button
                className="custom-btn secondary w-full"
                onClick={(e) => {
                  e.preventDefault();
                  searchParams.set({ salary: salaryValue });
                }}
              >
                Apply salary
              </button>
            </div>
          </Section>
        </form>
      </Content>
    </Container>
  );
};

export default Filter;

const Container = styled.div`
  min-width: 250px;
  height: 100%;
  background: var(--element-background);
  border-radius: 10px;
  overflow: hidden;
  border: 1px solid var(--border-color);

  .break {
    width: 100%;
    height: 1px;
    background: var(--border-color);
    margin: 5px 0;
  }
`;

const Content = styled.div`
  padding: 15px;
  overflow-y: scroll;
  height: 100%;

  &::-webkit-scrollbar {
    width: 3px;
  }

  &::-webkit-scrollbar-track {
    /* background: var(--border-color); */
  }

  &::-webkit-scrollbar-thumb {
    background: var(--element-color);
  }

  .title {
    font-size: 17px;
    font-family: var(--font-semiBold);
    border-bottom: 1px solid var(--border-color);
    padding-bottom: 10px;
    color: var(--element-color);
  }
`;

const Section = styled.div`
  padding: 15px 0;
  position: relative;
  border-bottom: 1px solid var(--border-color);

  .mb {
    margin-bottom: 5px;
  }

  .section-title {
    font-family: var(--font-semiBold);
    font-size: 15px;
    margin-bottom: 10px;
  }

  .grid {
    display: flex;
    column-gap: 5px;
  }

  .end {
    display: flex;
    justify-content: flex-end;
  }

  .custom-btn {
    border-radius: 5px;
    height: 35px;

    &.w-full {
      width: 100%;
    }
  }

  .salary {
    .select-header {
      width: 100%;
      height: 35px;
    }
  }
`;
