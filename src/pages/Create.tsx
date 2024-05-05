import { FC } from "react";
import { useSelector } from "react-redux";
import { RootState } from "store";
import { ResumeCreate, VacancyCreate } from "pages";
import { Navigate } from "react-router-dom";

const Create: FC = () => {
  const userType = useSelector(
    (state: RootState) => state.user.metadata?.userType
  );

  const user = useSelector((state: RootState) => state.user.data);

  if (!user?.id) {
    return <Navigate to={"/login"} />;
  }

  if (userType === "applicant") {
    return <ResumeCreate />;
  }
  if (userType === "employer") {
    return <VacancyCreate />;
  }
};

export default Create;
