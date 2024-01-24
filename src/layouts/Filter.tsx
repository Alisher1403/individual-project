import { FC, useEffect, useState } from "react";
import styled from "styled-components";
import { CheckSelect, RadioSelect } from "common";
import { formData } from "constant";
import { useSearchParams } from "hooks";

const Filter: FC = () => {
  const searchParams = useSearchParams();
  const { experience, emp_type, education } = searchParams.getAll();
  const lang = "eng";

  const [filter, setFilter] = useState({
    experience,
    emp_type,
    education,
  });

  useEffect(() => {
    searchParams.set(filter);
  }, [filter]);

  function getOptions(
    obj: Map<string, { eng: string; rus: string; fr: string; es: string }>
  ): { value: string; label: string }[] {
    const keys = Array.from(obj.keys());
    const values = Array.from(obj.values());

    const returnValue = [];

    for (let i = 0; i < keys.length; i++) {
      returnValue.push({ value: keys[i], label: values[i]?.[lang] });
    }

    return returnValue;
  }

  return (
    <Container>
      <form>
        <div className="section">
          <p className="section-title">{formData.experience.title[lang]}</p>
          <RadioSelect
            value={filter.experience}
            options={getOptions(formData.experience.data)}
            onChange={(e) => setFilter({ ...filter, experience: e })}
          />
        </div>
        <div className="section">
          <p className="section-title">{formData.emp_type.title[lang]}</p>
          <CheckSelect
            value={filter.emp_type}
            options={getOptions(formData.emp_type.data)}
            onChange={(e) => setFilter({ ...filter, emp_type: e })}
          />
        </div>
        <div className="section">
          <p className="section-title">{formData.education.title[lang]}</p>
          <CheckSelect
            value={filter.education}
            options={getOptions(formData.education.data)}
            onChange={(e) => setFilter({ ...filter, education: e })}
          />
        </div>
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

  .section {
    padding: 10px 0;

    .section-title {
      font-family: var(--font-semiBold);
      font-size: 15px;
      margin-bottom: 10px;
    }
  }
`;
