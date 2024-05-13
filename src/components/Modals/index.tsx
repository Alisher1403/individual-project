import { FC } from "react";
import VacancyDelete from "./VacancyDelete";
import ResumeDelete from "./ResumeDelete";
import CommentDelete from "./CommentDelete";
import ApplyModal from "./ApplyModal";
import DescriptionModal from "./DescriptionModal";

const ModalsList: FC = () => {
  return (
    <>
      <VacancyDelete />
      <ResumeDelete />
      <CommentDelete />
      <ApplyModal />
      <DescriptionModal />
    </>
  );
};

export default ModalsList;
