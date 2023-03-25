import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { Modal } from 'react-bootstrap'
import { closeModal, updateModalAction } from '../../../modules/actions/Modal'
import { registerNameAction } from '../../../modules/actions/Register'
import { Modal as ModalData } from '../../../constants/Interfaces'
import { History } from 'history';

import './index.css'

interface P {
  history: History
}

export const CommonModal: React.FC<P> = (props) => {

  const [waitingTime, setWaitingTime] = useState<number>(60)

  const modal: ModalData = useSelector((state: any) => state.modal)
  const dispatch = useDispatch()

  const handleClose = () => {
    if (modal.data.modalButtonText === 'Buy More!') { goToHome() }
    dispatch(closeModal())
  }

  useEffect(() => {
    let intervalId: any

    if (waitingTime === 0) {
      let modalData: ModalData = modal
      if (modal.data.modalButtonText.key === 'modal-loader-timer') {
        modalData.data = {
          modalHeader: 'Register your .fil name.',
          modalBody: 'Kindly click on the button to open wallet and sign registration transaction..',
          modalButtonText: 'Open Wallet',
        }
        dispatch(updateModalAction(modalData))
      }
    } else if (modal.data.modalButtonText.key === 'modal-loader-timer') {
      intervalId = setInterval(() => {
        let _remainingTime: number = waitingTime;
        _remainingTime -= 1
        setWaitingTime(_remainingTime)
      }, 1000);
    }
    return () => {
      clearTimeout(intervalId);
    };
  }, [waitingTime, modal.data.modalButtonText, dispatch, modal]);

  const goToHome = () => {
    props.history.push('/')
    dispatch(closeModal())
  }

  const registerName = () => {
    dispatch(registerNameAction())
  }

  return (
    <Modal show={modal.isOpen} onHide={handleClose} backdrop='static'>
      <Modal.Header closeButton>
        <Modal.Title>{modal.data.modalHeader}</Modal.Title>
      </Modal.Header>
      <Modal.Body>{modal.data.modalBody}
        {modal.data.modalButtonText.key === 'modal-loader-timer' ?
          <div className="modal-timer-div">
            <div className="modal-timer-outer">
              <div className="modal-timer-inner">
                <div className="modal-timer-text">{waitingTime}</div>
              </div>
            </div>
          </div>
          : <></>}
      </Modal.Body>
      <Modal.Footer className="justify_content_center">
        <div className="modal-button" onClick={() => {
          if (modal.data.modalButtonText.key === 'modal-loader' || modal.data.modalButtonText.key === 'modal-loader-timer') { }
          else if (modal.data.modalButtonText === 'Open Wallet') { registerName() }
          else if (modal.data.modalButtonText === 'Buy More!') { goToHome() }
          else { handleClose() }
        }}>
          <div className="modal-button-text">
            {modal.data.modalButtonText}</div>
        </div>
      </Modal.Footer>
    </Modal>
  );
}

export default CommonModal;