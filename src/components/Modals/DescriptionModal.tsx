import { FC, useEffect, useState } from "react";
import Modal from "../../ui/Modal";
import styled from "styled-components";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "store";
import { setDescriptionModal } from "store/reducers/modals";
import ReactQuill from "react-quill";
import { supabase } from "backend";

const DescriptionModal: FC = () => {
    const dispatch = useDispatch() as AppDispatch;

    const element = useSelector((state: RootState) => state.modals.descriptionModal);
    const user = useSelector((state: RootState) => state.user.data);
    const metadata = useSelector((state: RootState) => state.user.metadata);
    const [data, setData] = useState('')

    useEffect(() => {
        setData(metadata?.description)
    }, [element, metadata])

    function submit() {
        supabase.from('user_metadata').update({ description: data }).eq('id', user?.id).then(() => {
            setDescriptionModal(null);
            window.location.reload();
        })
    }

    if (!user?.id) return;

    return (
        <Container>
            <Modal open={element} onClose={() => dispatch(setDescriptionModal(null))}>
                <div className="modal-content">
                    <div className="modal-info">Write about yourself</div>
                    <div className="resume-list">
                        <ReactQuill value={data} onChange={(e) => setData(e)} />
                    </div>
                    <div className="btn-group">
                        <button
                            className="custom-btn secondary"
                            onClick={() => dispatch(setDescriptionModal(null))}
                        >
                            Cancel
                        </button>
                        <button
                            className="custom-btn"
                            onClick={() => submit()}
                        >
                            Save
                        </button>
                    </div>
                </div>
            </Modal>
        </Container >
    );
};

export default DescriptionModal;

const Container = styled.div`
  .success{
    position: fixed;
    top: 50%;
    left: 50%;
    background: var(--element-background);
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 20px;
    border-radius: 10px;
    transform: translate(-50%, -50%);

    .icon{
        font-size: 100px;
        color: var(--green-color);
    }
  }

  .modal-content {
    max-width: 600px;
    min-width: 300px;
    word-break: break-all;

    .modal-info {
      margin-bottom: 10px;
      padding-top: 5px;
    }

    .error-msg {
        font-size: 16px;
        color: var(--red-color);
        margin-bottom: 10px;
    }

    .resume-list{
        display: flex;
        flex-direction: column;
        align-items: stretch;
        row-gap: 10px;
        margin-bottom: 20px;

        .resume{
            background: none;
            border: 1px solid var(--border-color-dark);
            padding: 10px;
            cursor: pointer;
            transition: .2s;
            border-radius: 10px;

            &[data-selected="true"]{
                box-shadow: 0px 0px 0px 4px var(--element-color) inset;
            }

            .resume-content{
                width: 100%;
                display: flex;
                flex-direction: column;
                align-items: flex-start;
            }

            .resume-title{
                color: var(--element-color);
                font-size: 16px;
                margin-bottom: 2px;
            }

            .resume-timeago{
                margin-bottom: 2px;
                font-size: 13px;
                color: var(--text-color);
                opacity: 0.7;
            }

            .resume-salary{
                color: var(--text-color);
                font-size: 18px;
                font-family: var(--font-bold);
            }
        }
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
