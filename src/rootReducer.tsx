import { combineReducers } from 'redux'
import contract from './modules/reducers/SetContract'
import register from './modules/reducers/Register'
import modal from './modules/reducers/Modal'

export default combineReducers({
    contract,
    register,
    modal
})
