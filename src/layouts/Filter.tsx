import { FC } from "react";
import styled from "styled-components";
import { CheckSelect, RadioSelect, InputStateful, Select, Grid } from "ui";
import { formData } from "constant";
import { useSearchParams } from "hooks";

interface FilterProps {}

const Filter: FC<FilterProps> = () => {
  const searchParams = useSearchParams();
  const { experience, emp_type, education, salary, currency } = searchParams.getAll();
  const lang = "eng";

  const getMapOptions = (
    obj: Map<string | undefined, { eng: string; rus: string; fr: string; es: string }>
  ): { value: string | undefined; label: string }[] => {
    const keys = Array.from(obj.keys());
    const values = Array.from(obj.values());

    return keys.map((key, i) => ({ value: key, label: values[i]?.[lang] }));
  };

  const getObjectOptions = (obj: { [key: string]: string }): { value: string; label: string }[] => {
    return Object.keys(obj).map((e) => {
      return {
        value: e as keyof typeof formData.currency,
        label: formData.currency[e as keyof typeof formData.currency],
      };
    });
  };

  return (
    <Container>
      <form>
        <Content>
          <Section>
            <p className="section-title">{formData.experience.title[lang]}</p>
            <RadioSelect
              value={experience}
              options={getMapOptions(formData.experience.data)}
              onChange={(value) => searchParams.set({ experience: value })}
            />
          </Section>
          <Section>
            <p className="section-title">{formData.emp_type.title[lang]}</p>
            <CheckSelect
              value={emp_type}
              options={getMapOptions(formData.emp_type.data)}
              onChange={(value) => searchParams.set({ emp_type: value })}
            />
          </Section>
          <Section>
            <p className="section-title">{formData.education.title[lang]}</p>
            <CheckSelect
              value={education}
              options={getMapOptions(formData.education.data)}
              onChange={(value) => searchParams.set({ education: value })}
            />
          </Section>
          <Section>
            <p className="section-title">{formData.salary.title[lang]}</p>

            <Grid gap="20px">
              <InputStateful
                type="number"
                value={salary}
                onPressEnter={(value) => searchParams.set({ salary: value })}
                onBlur={(value) => searchParams.set({ salary: value })}
              />
              <Select
                value={currency}
                options={getObjectOptions(formData.currency)}
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
  width: 350px;
  height: 100vh;
  border-right: var(--border-style);
  /* border-top: var(--border-style); */
  position: sticky;
  overflow-y: scroll;
  top: 0;
  padding: 10px;

  &::-webkit-scrollbar {
    display: none;
  }

  * {
    font-family: var(--text-font);
    font-size: var(--text-size);
  }

  .break {
    width: 100%;
    height: 1px;
    background: var(--border-color);
    margin: 5px 0;
  }
`;

const Content = styled.div``;

const Section = styled.div`
  padding: 10px 0;

  .section-title {
    font-family: var(--font-semiBold);
    font-size: 15px;
    margin-bottom: 10px;
  }
`;
