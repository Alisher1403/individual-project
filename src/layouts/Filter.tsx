import { FC } from "react";
import styled from "styled-components";
import { CheckSelect, RadioSelect, InputStateful, Select, Grid } from "ui";
import { formData } from "constant";
import { useSearchParams } from "hooks";

interface FilterProps {}

const Filter: FC<FilterProps> = () => {
  const searchParams = useSearchParams();
  const { experience, emp_type, education, salary, currency } =
    searchParams.getAll();

  return (
    <Container>
      <form>
        <Content>
          <h2 className="title">Apply Filters</h2>
          <Section>
            <p className="section-title">{formData.experience.title}</p>
            <RadioSelect
              value={experience}
              options={formData.experience.data}
              onChange={(value) => searchParams.set({ experience: value })}
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
            <p className="section-title">{formData.salary.title}</p>

            <Grid gap="20px">
              <InputStateful
                type="number"
                value={salary}
                onPressEnter={(value) => searchParams.set({ salary: value })}
                onBlur={(value) => searchParams.set({ salary: value })}
              />
              <Select
                value={currency}
                options={formData.currency.data}
                onChange={(value) => searchParams.set({ currency: value })}
              />
            </Grid>
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

  .section-title {
    font-family: var(--font-semiBold);
    font-size: 15px;
    margin-bottom: 10px;
  }
`;
