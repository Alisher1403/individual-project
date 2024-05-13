import { FC } from "react";
import Modal from "../../ui/Modal";
import styled from "styled-components";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "store";
import { setCommentDelete } from "store/reducers/modals";
import { api } from "store/reducers";

const CommentDelete: FC = () => {
  const dispatch = useDispatch() as AppDispatch;

  const element = useSelector((state: RootState) => state.modals.commentDelete);

  const user = useSelector((state: RootState) => state.user.data);

  if (!user?.id) return;

  return (
    <Container>
      <Modal open={!!element} onClose={() => dispatch(setCommentDelete(null))}>
        <div className="modal-content">
          <div className="modal-info">Delete this comment</div>
          <div className="btn-group">
            <button
              className="custom-btn secondary"
              onClick={() => dispatch(setCommentDelete(null))}
            >
              Cancel
            </button>
            <button
              className="custom-btn"
              onClick={() => {
                if (element) {
                  dispatch(api.vacancy.comments.delete(element)).then(() => {
                    dispatch(setCommentDelete(null));
                  });
                }
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

export default CommentDelete;

const Container = styled.div`
  .modal-content {
    max-width: 400px;
    min-width: 200px;
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
