import { FC, useEffect, useState } from "react";
import styled from "styled-components";
import { useSearchParams } from "hooks";
import { supabase } from "backend";

const TopCompanies: FC = () => {
  const specialization = useSearchParams().get("specialization") || "";
  const [data, setData] = useState<any>();

  useEffect(() => {
    async function fetch() {
      const { data } = await supabase.from("specializations").select("*").eq("specialization", specialization);

      if (data) {
        setData(data);
      }
    }

    fetch();
  }, []);

  console.log(data);

  return <Container></Container>;
};

export default TopCompanies;

const Container = styled.div``;
