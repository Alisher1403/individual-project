import { FC, useState } from "react";
import styled from "styled-components";
import { CheckSelect, RadioSelect, Select, Input } from "ui";
import { formData } from "constant";
import { useSearchParams } from "hooks";

interface FilterProps {}

const Filter: FC<FilterProps> = () => {
  const searchParams = useSearchParams();
  const { experience, emp_type, education, remote, salary, currency } =
    searchParams.getAll();

  const [salaryValue, setSalaryValue] = useState(salary);

  return (
    <Container>
      <form>
        <Content>
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
            <p className="section-title">Remote job</p>
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
        </Content>
      </form>
    </Container>
  );
};

export default Filter;

const Container = styled.div`
  min-width: 250px;
  position: sticky;
  overflow-y: scroll;
  height: 100%;
  top: 0;
  background: var(--element-background);
  padding: 15px;
  border: 1px solid var(--border-color);
  border-radius: 10px;

  &::-webkit-scrollbar {
    display: none;
  }

  .break {
    width: 100%;
    height: 1px;
    background: var(--border-color);
    margin: 5px 0;
  }
`;

const Content = styled.div`
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
