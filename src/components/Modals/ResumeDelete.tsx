import { FC } from "react";
import Modal from "../../ui/Modal";
import styled from "styled-components";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "store";
import { setResumeDelete } from "store/reducers/modals";
import { api } from "store/reducers";
import { resetVacancies } from "store/reducers/vacancy";

const ResumeDelete: FC = () => {
  const dispatch = useDispatch() as AppDispatch;

  const element: any = useSelector(
    (state: RootState) => state.modals.resumeDelete
  );

  const user = useSelector((state: RootState) => state.user.data);

  if (!user?.id) return;

  return (
    <Container>
      <Modal open={!!element} onClose={() => dispatch(setResumeDelete(null))}>
        <div className="modal-content">
          <div className="modal-info">
            Do you want to delete the resume <b>{element?.title}</b> ? <br />
            This action can't be undone
          </div>
          <div className="btn-group">
            <button
              className="custom-btn secondary"
              onClick={() => dispatch(setResumeDelete(null))}
            >
              Cancel
            </button>
            <button
              className="custom-btn"
              onClick={() => {
                dispatch(api.resume.delete(element?.id)).then(() => {
                  dispatch(api.profile.get(user?.id));
                  dispatch(resetVacancies());
                  dispatch(setResumeDelete(null));
                });
              }}
            >
              Delete
            </button>
          </div>
        </div>
      </Modal>
    </Container>
  );
};

export default ResumeDelete;

const Container = styled.div`
  .modal-content {
    max-width: 400px;
    word-break: break-all;

    .modal-info {
      margin-bottom: 20px;
      padding-top: 5px;
    }

    .btn-group {
      display: flex;
      justify-content: flex-end;
      column-gap: 7px;

      .custom-btn {
        border-radius: 10px;
        height: 35px;
      }
    }
  }
`;
