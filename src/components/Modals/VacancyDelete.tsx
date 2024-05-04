import { FC } from "react";
import Modal from "../../ui/Modal";
import styled from "styled-components";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "store";
import { setVacancyDelete } from "store/reducers/modals";
import { api } from "store/reducers";
import { resetVacancies } from "store/reducers/vacancy";

const VacancyDelete: FC = () => {
  const dispatch = useDispatch() as AppDispatch;

  const element: any = useSelector(
    (state: RootState) => state.modals.vacancyDelete
  );

  const user = useSelector((state: RootState) => state.user.data);

  if (!user?.id) return;

  return (
    <Container>
      <Modal open={!!element} onClose={() => dispatch(setVacancyDelete(null))}>
        <div className="modal-content">
          <div className="modal-info">
            Do you want to delete the vacancy <b>{element?.title}</b> ? <br />
            This action can't be undone
          </div>
          <div className="btn-group">
            <button
              className="custom-btn secondary"
              onClick={() => dispatch(setVacancyDelete(null))}
            >
              Cancel
            </button>
            <button
              className="custom-btn"
              onClick={() => {
                dispatch(api.vacancy.delete(element?.id)).then(() => {
                  dispatch(api.profile.get(user?.id));
                  dispatch(resetVacancies());
                  dispatch(setVacancyDelete(null));
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

export default VacancyDelete;

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
