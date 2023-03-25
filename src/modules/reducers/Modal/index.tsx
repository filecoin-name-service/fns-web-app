import {
    MODAL_OPEN,
    MODAL_CLOSE,
    MODAL_UPDATE
} from '../../actionTypes/Modal'
import { Modal } from '../../../constants/Interfaces'
import { emptyModal } from '../../../constants/EmptyInterfaces'

//Set initial state for owner
const initialState: Modal = emptyModal

//Export new state using switch
const registerReducer = (state = initialState, action: any = {}) => {
    switch (action.type) {

        case MODAL_OPEN:
            return {
                ...state,
                ...action.payload.data,
            }

        case MODAL_CLOSE:
            return {
                ...emptyModal,
            }
        case MODAL_UPDATE:
            return {
                ...state,
                data: action.payload.data,
            }
        default:
            return state
    }
}

export default registerReducer