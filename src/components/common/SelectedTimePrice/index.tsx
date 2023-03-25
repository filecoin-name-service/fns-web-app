import React, { useEffect } from 'react'
import { Container, Row, Col } from 'react-bootstrap'
import { ReactComponent as MinusIcon } from "../../../assets/svg/minus.svg"
import { ReactComponent as PlusIcon } from "../../../assets/svg/plus.svg"
import TokenFil from "../../../assets/filecoin.png"
import { BuyOptions } from '../../../constants/Interfaces'

import './index.css'

interface Props {
  options: Array<BuyOptions>
  selectTime: Function
  selectedTimePrice: BuyOptions
}

const SelectedTimePrice: React.FC<Props> = (props) => {

  useEffect(() => {
  }, [props.selectedTimePrice.price])

  const incrementTimePrice = () => {
    if (props.selectedTimePrice.id === 4) {
    } else {
      props.selectTime(props.options[props.selectedTimePrice.id])
    }
  }
  const decrementTimePrice = () => {
    if (props.selectedTimePrice.id === 1) {
    } else {
      props.selectTime(props.options[props.selectedTimePrice.id - 2])
    }
  }

  return (
    <>
      <Container className="d-flex justify_content_center align-items-center py_25">
        <div className='w_75 d-flex justify_content_center flex-column '>
          <Row className="py_15 time_price_box ">
            <Col xs>
              < MinusIcon className="time_price_box_icon" onClick={decrementTimePrice} />
            </Col>
            <Col xs lg="8" className="time_price_box_data_col">
              <div className="time_price_box_data">{props.selectedTimePrice.time.replace('For', '')}</div>
            </Col>
            <Col xs>
              < PlusIcon className="time_price_box_icon" onClick={incrementTimePrice} />
            </Col>
          </Row>
          <Row className='justify_content_center pt_20'>
            <div className='time_price_box_price'>
              <span className="d-flex justify_content_center align-items-center">
                <img alt="fil token icon" src={TokenFil} className="time_price_box_price_icon" />&nbsp;</span> {props.selectedTimePrice.price}
            </div>
          </Row>
        </div>
      </Container>
    </>
  )
}

export default SelectedTimePrice
