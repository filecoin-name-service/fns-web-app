import React from 'react'
import { Container } from 'react-bootstrap'
import RegisterCard from './RegisterCard'
import { commitNameAction } from '../../modules/actions/Register';
import { MakeCommitmentData, BuyOptions } from '../../constants/Interfaces'
import { FullScreenLoader } from '../common/Loader/Loader'

import './index.css'
interface Props {
    loadProps: boolean
    callApi: Function,
    pushToHistory: Function
    fireName: string,
    options: Array<BuyOptions>
}

const Register: React.FC<Props> = (props) => {

    const onRegister: any = (data: MakeCommitmentData) => {
        props.callApi(commitNameAction, data)
    }

    return (
        <>
            {(props.loadProps) && <FullScreenLoader />}
            <Container className={`py_40 ${props.loadProps ? ' noScroll noClick ' : ''}`}>
                <RegisterCard pushToHistory={props.pushToHistory} fireName={props.fireName} onRegister={onRegister} options={props.options} />
            </Container>
        </>

    )
}

export default Register
