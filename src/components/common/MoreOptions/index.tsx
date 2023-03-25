import React from 'react'
import { Container, Row, Col } from 'react-bootstrap'
import OptionsLabel from './OptionsLabel'
import { BuyOptions } from '../../../constants/Interfaces'

import './index.css'

interface Props {
  options: Array<BuyOptions>
  selectTime: Function
  selectedTimePrice: BuyOptions
}


const MoreOptions: React.FC<Props> = (props) => {

  return (
    <>
      <Container className="pb_50">
        <Row className="justify_content_center pb_10">
          <div className="more-options-text"> More Options </div>
        </Row>
        <Row className="justify_content_center">
          {props.options.map(val =>
            <Col lg={3} md={4} xs={8} key={val.id} className="py_5">
              <OptionsLabel data={val} selectOption={props.selectTime} />
            </Col>
          )}

        </Row>

      </Container>
    </>

  )
  // }
}

export default MoreOptions
