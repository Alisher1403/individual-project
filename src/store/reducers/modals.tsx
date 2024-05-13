import { PayloadAction, createSlice } from "@reduxjs/toolkit";

const modals = createSlice({
  name: "modals",
  initialState: {
    vacancyDelete: null,
    resumeDelete: null,
    applyModal: null as any,
    applicantsModal: null as any,
    descriptionModal: false as boolean,
    commentDelete: null as null | { vacancy_id: string; id: string },
  },
  reducers: {
    setVacancyDelete(state, action) {
      state.vacancyDelete = action.payload;
    },
    setResumeDelete(state, action) {
      state.resumeDelete = action.payload;
    }, setApplyModal(state, action) {
      state.applyModal = action.payload;
    }, setApplicantsModal(state, action) {
      state.applyModal = action.payload;
    }, setDescriptionModal(state, action) {
      state.descriptionModal = action.payload;
    },
    setCommentDelete(
      state,
      action: PayloadAction<{ vacancy_id: string; id: string } | null>
    ) {
      state.commentDelete = action.payload;
    },
  },
});

export default modals.reducer;

export const { setVacancyDelete, setResumeDelete, setCommentDelete, setApplyModal, setApplicantsModal, setDescriptionModal } =
  modals.actions;
