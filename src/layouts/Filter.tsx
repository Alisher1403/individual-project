import { FC, useEffect, useState } from "react";
import styled from "styled-components";
import { Input } from "common";
import { useSearchParams } from "react-router-dom";

const Filter: FC = () => {
  const [params, setParams] = useSearchParams();
  const [filter, setFilter] = useState({
    location: params.get("location") || "",
  });

  function submit() {
    console.log(filter);
    setParams((prevParams) => ({ ...prevParams, ...filter }));
  }

  useEffect(() => {
    setFilter({
      location: params.get("location") || "",
    });
  }, [params]);

  return (
    <Container>
      <form>
        <div className="section">
          <Input
            value={filter.location}
            onChange={(val) => setFilter({ ...filter, location: val })}
            onBlur={submit}
            title="Location"
            placeholder="Location"
          />
        </div>
        <div className="section">
          <p className="form-title">Experience</p>
          <div className="inline"></div>
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
  border-top: var(--border-style);
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

  .form-title {
    font-family: var(--font-semiBold);
    font-size: 14px;
  }

  .section {
    padding: 5px 0;
  }
`;
