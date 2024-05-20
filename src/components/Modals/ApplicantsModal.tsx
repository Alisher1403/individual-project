import { FC, useEffect, useState } from "react";
import Modal from "../../ui/Modal";
import styled from "styled-components";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "store";
import { setApplicantsModal } from "store/reducers/modals";
import { supabase } from "backend";
import { formData } from "../../constant/formData";

const ApplicantsModal: FC = () => {
    const dispatch = useDispatch() as AppDispatch;

    const element = useSelector((state: RootState) => state.modals.applicantsModal);
    const user = useSelector((state: RootState) => state.user.data);
    const [applicants, setApplicants] = useState<any[]>();
    const [selected, setSelected] = useState<string>('');
    const [error, setError] = useState(false);

    useEffect(() => {
        if (element?.vacancy_id) {
            supabase.from('applicants').select('*').eq('vacancy_id', element?.vacancy_id).then((res) => {
                if (res.data) {
                    setApplicants(res.data)
                }
            })
        }
    }, [])

    console.log(applicants);

    if (!user?.id) return;

    return (
        <Container>
            <Modal open={!!element} onClose={() => dispatch(setApplicantsModal(null))}>
                <div className="modal-content">
                    <div className="modal-info">Select CV to apply</div>
                    {error ? <div className="error-msg">Select one resume</div> : null}
                    <div className="resume-list">
                        {
                            applicants
                                ? applicants?.map((e, idx) => {
                                    return <button className="resume" key={idx} data-selected={e?.id === selected} onClick={() => {
                                        if (selected === e?.id) {
                                            setSelected('');
                                        } else {
                                            setSelected(e?.id);
                                            setError(false);
                                        }
                                    }}>
                                        <div className="resume-content">
                                            <p className="resume-title">{e?.title}</p>
                                            <p className="resume-timeago">{formData.timeAgo(e?.created_at)}</p>
                                            <p className="resume-salary">{e?.salary}{formData.currency.get(e?.currency)}</p>
                                        </div>
                                    </button>
                                })
                                : null
                        }
                    </div>
                    <div className="btn-group">
                        <button
                            className="custom-btn secondary"
                            onClick={() => dispatch(setApplicantsModal(null))}
                        >
                            Close
                        </button>
                    </div>
                </div>
            </Modal>
        </Container >
    );
};

export default ApplicantsModal;

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
