import { Modal } from '../../../constants/Interfaces'
import {
  MODAL_OPEN,
  MODAL_CLOSE,
  MODAL_UPDATE
} from '../../actionTypes/Modal'

export function closeModalAction() {
  //Return dispatch
  return async (dispatch: any) => {
    dispatch(closeModal())
  }
}

export function openModalAction(data: Modal) {
  //Return dispatch
  return async (dispatch: any) => {
    //Dispatch start
    dispatch(openModal(data))
  }
}

export function updateModalAction(data: Modal) {
  //Return dispatch
  return async (dispatch: any) => {
    //Dispatch start
    dispatch(updateModal(data.data))
  }
}


//Get customer property basic info by id start
export function closeModal() {
  return {
    type: MODAL_CLOSE,
    payload: {},
  }
}

//Get customer property basic info by id success
export function openModal(data: Modal) {
  return {
    type: MODAL_OPEN,
    payload: { data },
  }
}

//Get customer property basiic info by id failure
export function updateModal(data: any) {
  return {
    type: MODAL_UPDATE,
    payload: { data },
  }
}