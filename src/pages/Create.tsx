import { FC } from "react";
import { useSelector } from "react-redux";
import { RootState } from "store";
import { VacancyCreate } from "pages";

const Create: FC = () => {
  const userType = useSelector((state: RootState) => state.user.data?.type);

  if (userType === "applicant") {
    return <div></div>;
  }
  if (userType === "employer") {
    return <VacancyCreate />;
  }
};

export default Create;
