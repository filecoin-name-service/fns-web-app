import React from 'react'
import { Container, Row, Col } from 'react-bootstrap'
import TokenFil from "../../../assets/filecoin.png"
import { BuyOptions } from '../../../constants/Interfaces'

import './index.css'

interface Props {
  data: BuyOptions
  selectOption: Function
}

const OptionsLabel: React.FC<Props> = (props) => {

  return (
    <>
      <Container className="options-label-box p_10" onClick={() => props.selectOption(props.data)}>
        <Row>
          <Col xs="4" className="d-flex justify_content_center align-items-center">
            <img alt="FIL token icon" src={TokenFil} className="options-label-price-icon" />
          </Col>
          <Col className="text-left padding_0">
            <Col className="padding_0">
              <div className='options-label-price'>{props.data.price}</div>
            </Col>
            <Col className="padding_0">
              <div className='options-label-diration'>{props.data.time}</div>
            </Col >
          </Col>
        </Row>

      </Container>
    </>

  )
}

export default OptionsLabel
