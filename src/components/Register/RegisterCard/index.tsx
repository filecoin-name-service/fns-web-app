import React, { useState } from 'react'
import { Container, Card } from 'react-bootstrap'

import SelectedTimePrice from '../../common/SelectedTimePrice'
import MoreOptions from '../../common/MoreOptions'
import { MakeCommitmentData, BuyOptions } from '../../../constants/Interfaces'
import { getSecondsForDays } from '../../../utils/CalcSeconds'

import './index.css'
interface Props {
  pushToHistory: Function,
  fireName: string
  onRegister: Function,
  options: Array<BuyOptions>
}

const RegisterCard: React.FC<Props> = (props) => {

  const [loading, setLoading] = useState<boolean>(false)
  const [selectedTimePrice, setSelectedTimePrice] = useState<BuyOptions>(props.options[0])

  const setSelectedTime = (timePrice: BuyOptions) => {
    setSelectedTimePrice(timePrice)
  }

  const startRegistration = () => {
    let data: MakeCommitmentData = {
      name: props.fireName.split('.')[0],
      duration: selectedTimePrice.id === 4 ? getSecondsForDays(5 * 365) : getSecondsForDays(selectedTimePrice.id * 365),
      setReverse: false,
      data: [],
      ownerControlledFuses: 0
    }
    props.onRegister(data)
  }

  return (
    <>
      <Container className={`py_40 ${loading ? ' noScroll noClick ' : ''}`}>
        <Card className="card_center">
          <Card.Body>
            <div className="register_name_header">{props.fireName}</div>

            <SelectedTimePrice options={props.options} selectTime={setSelectedTime} selectedTimePrice={selectedTimePrice} />

            <MoreOptions options={props.options.filter((val: any) => val.id !== selectedTimePrice.id)} selectTime={setSelectedTime} selectedTimePrice={selectedTimePrice} />

            <div className="register-button-box">
              <div className="register-button" onClick={startRegistration}>
                <div className="register-button-text">Register</div>
              </div>
            </div>
          </Card.Body>


        </Card>
      </Container>
    </>

  )
}

export default RegisterCard
