import {
    REGISTER_COMMIT_NAME_START,
    REGISTER_COMMIT_NAME_FAILURE,
    REGISTER_COMMIT_NAME_SUCCESS,
    REGISTER_COMMIT_NAME_RESET
} from '../../actionTypes/Register'

//Set initial state for owner
const initialState = {
    data: {},
    loading: null,
    error: null,
}

//Export new state using switch
const registerReducer = (state = initialState, action: any = {}) => {
    switch (action.type) {

        case REGISTER_COMMIT_NAME_START:
            return {
                ...state,
                loading: true
            }

        case REGISTER_COMMIT_NAME_SUCCESS:
            return {
                ...state,
                loading: false,
                error: false,
                data: action.payload.data,
            }
        case REGISTER_COMMIT_NAME_FAILURE:
            return {
                ...state,
                loading: false,
                error: action.payload.error,
            }
        case REGISTER_COMMIT_NAME_RESET:
            return {
                ...initialState,
            }
        default:
            return state
    }
}

export default registerReducer