import React, { Component } from 'react'
import Spinner from 'react-bootstrap/Spinner';

import { ReactComponent as ArrowRight } from "../../../assets/svg/arrow-right.svg"
import { ReactComponent as CheckBag } from "../../../assets/svg/check-bag.svg"
import { ReactComponent as CrossBag } from "../../../assets/svg/cross-bag.svg"

import './index.css'

interface State {
  showCheckoutIcon: boolean
}

interface Props {
  handleSearchName: (e: string) => {}
  searchName: string
  showIconOnConfirm: boolean
  isConfirmed: boolean
  gotoCheckout: () => {}
  loadNameAvailabilityIcon: boolean
}

export class Home extends Component<Props, State> {

  state = {
    showCheckoutIcon: false
  }

  componentDidMount() { }

  handleInput = (e: any) => {
    this.props.handleSearchName(e.target.value.toLowerCase())
  }

  changeIcon: any = (showCheckOut: boolean) => {
    const { showIconOnConfirm, isConfirmed } = this.props
    if (showIconOnConfirm && isConfirmed)
      this.setState({ showCheckoutIcon: showCheckOut })
  }

  render() {
    const { showIconOnConfirm, isConfirmed } = this.props
    const { showCheckoutIcon } = this.state
    return (
      <div className='search-box-container'>
        <input type="text" className=" search-box required" placeholder='Search for a name' onChange={this.handleInput} value={this.props.searchName} ></input>
        <div className='icon-box' onMouseEnter={() => this.changeIcon(true)} onMouseLeave={() => this.changeIcon(false)}>
          {this.props.loadNameAvailabilityIcon ? <Spinner animation="border" variant="info" /> : showIconOnConfirm && isConfirmed ? showCheckoutIcon ? <ArrowRight className="icons-size text_success" onClick={this.props.gotoCheckout} /> : <CheckBag className="icons-size text_success" /> : showIconOnConfirm && !isConfirmed && this.props.searchName !== "" ? <CrossBag className=" icons-size text_danger" /> : <></>}
        </div>
      </div>
    )
  }
}

export default Home
