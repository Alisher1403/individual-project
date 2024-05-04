import { FC } from "react";
import { useSelector } from "react-redux";
import { RootState } from "store";
import { Navigate } from "react-router-dom";
import VacancyEdit from "./Vacancy/VacancyEdit";

const Edit: FC = () => {
  const userType = useSelector(
    (state: RootState) => state.user.metadata?.userType
  );

  const user = useSelector((state: RootState) => state.user.data);

  if (!user?.id) {
    return <Navigate to={"/login"} />;
  }

  if (userType === "applicant") {
    return <div></div>;
  }
  if (userType === "employer") {
    return <VacancyEdit />;
  }
};

export default Edit;
