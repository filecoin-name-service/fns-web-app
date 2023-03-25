import { MakeCommitmentData } from '../../../constants/Interfaces'
import { makeCommitment, commitName, registerName } from '../../../services/Contract'
import { openModalAction, updateModalAction } from '../Modal'

import { Spinner } from 'react-bootstrap'

import {
  REGISTER_MAKE_COMMITMENT_START,
  REGISTER_MAKE_COMMITMENT_FAILURE,
  REGISTER_MAKE_COMMITMENT_SUCCESS,
  REGISTER_COMMIT_NAME_START,
  REGISTER_COMMIT_NAME_FAILURE,
  REGISTER_COMMIT_NAME_SUCCESS,
  REGISTER_COMMIT_NAME_RESET,
  REGISTER_NAME_START,
  REGISTER_NAME_FAILURE,
  REGISTER_NAME_SUCCESS,
} from '../../actionTypes/Register'


/** COMMIT COMMITMENT HASH */

export function commitNameAction(data: MakeCommitmentData) {
  //Return dispatch
  return async (dispatch: any, getState: any) => {
    const state = getState();
    //Dispatch start
    dispatch(commitNameStart())
    dispatch(openModalAction({
      data: {
        modalHeader: 'Committing your .fil name',
        modalBody: 'Kindly open your wallet to sign the commit transactions.',
        modalButtonText: <Spinner animation="grow" id="modal-loader" key="modal-loader" />,
      },
      isOpen: true
    }))
    //Send properties get request
    try {
      const transactionHash = await commitName(data, state)
      //Dispatch success
      dispatch(commitNameSuccess({ ...data, ...transactionHash }))
      dispatch(updateModalAction({
        data: {
          modalHeader: 'Your .fil name committed',
          modalBody: 'Kindly wait for sometime to ensure that the name is not taken.',
          modalButtonText: <Spinner animation="grow" id="modal-loader" key="modal-loader-timer" />,
        },
        isOpen: true
      }))
    } catch (err: any) {
      //Dispatch failure
      dispatch(commitNametFail(err.message))
      dispatch(updateModalAction({
        data: {
          modalHeader: 'Error while .fil registration',
          modalBody: 'Please retry registring the .fil name.',
          modalButtonText: 'Close',
        },
        isOpen: true
      }))
    }
  }
}

//Get customer property basic info by id start
export function commitNameStart() {
  return {
    type: REGISTER_COMMIT_NAME_START,
    payload: {},
  }
}

//Get customer property basic info by id success
export function commitNameSuccess(data: any) {
  return {
    type: REGISTER_COMMIT_NAME_SUCCESS,
    payload: { data },
  }
}

//Get customer property basiic info by id failure
export function commitNametFail(error: any) {
  return {
    type: REGISTER_COMMIT_NAME_FAILURE,
    payload: { error },
  }
}

/** MAKE COMMITMENT HASH */

export function makeCommitmentAction(data: MakeCommitmentData) {
  //Return dispatch
  return async (dispatch: any, getState: any) => {
    const state = getState();
    //Dispatch start
    dispatch(registerMakeCommitmentStart())
    //Send properties get request
    try {
      const transactionHash = await makeCommitment(data, state)
      //Dispatch success
      dispatch(registerMakeCommitmentSuccess({ transactionHash }))
    } catch (err: any) {
      //Dispatch failure
      dispatch(registerMakeCommitmentFail(err.message))
    }
  }
}

//Get customer property basic info by id start
export function registerMakeCommitmentStart() {
  return {
    type: REGISTER_MAKE_COMMITMENT_START,
    payload: {},
  }
}

//Get customer property basic info by id success
export function registerMakeCommitmentSuccess(data: any) {
  return {
    type: REGISTER_MAKE_COMMITMENT_SUCCESS,
    payload: { data },
  }
}

//Get customer property basiic info by id failure
export function registerMakeCommitmentFail(error: any) {
  return {
    type: REGISTER_MAKE_COMMITMENT_FAILURE,
    payload: { error },
  }
}

//Get customer property basiic info by id failure
export function registerMakeCommitmentReset() {
  return {
    type: REGISTER_COMMIT_NAME_RESET,
    payload: {},
  }
}

/** REGISTER .fil NAME */

export function registerNameAction() {
  //Return dispatch
  return async (dispatch: any, getState: any) => {
    const state = getState();
    //Dispatch start
    dispatch(registertNameStart())
    dispatch(openModalAction({
      data: {
        modalHeader: 'Registering your .fil name',
        modalBody: 'Kindly open your wallet to sign the registration transactions.',
        modalButtonText: <Spinner animation="grow" id="modal-loader" key="modal-loader" />,
      },
      isOpen: true
    }))
    //Send properties get request
    try {
      const { txnHash: registerTxnHash } = await registerName(state)
      //Dispatch success
      dispatch(registerNameSuccess({ ...state.register.data, ...registerTxnHash }))
      dispatch(updateModalAction({
        data: {
          modalHeader: 'Your .fil name is registered.',
          modalBody: 'Congratulations! You have successfully bought your .fil domain.',
          modalButtonText: 'Buy More!',
        },
        isOpen: true
      }))
    } catch (err: any) {
      //Dispatch failure
      dispatch(registerNametFail(err.message))
      dispatch(updateModalAction({
        data: {
          modalHeader: 'Error while FNS registration',
          modalBody: 'Please retry registring the .fil name.',
          modalButtonText: 'Close',
        },
        isOpen: true
      }))
    }
  }
}

//Get customer property basic info by id start
export function registertNameStart() {
  return {
    type: REGISTER_NAME_START,
    payload: {},
  }
}

//Get customer property basic info by id success
export function registerNameSuccess(data: any) {
  return {
    type: REGISTER_NAME_SUCCESS,
    payload: { data },
  }
}

//Get customer property basiic info by id failure
export function registerNametFail(error: any) {
  return {
    type: REGISTER_NAME_FAILURE,
    payload: { error },
  }
}