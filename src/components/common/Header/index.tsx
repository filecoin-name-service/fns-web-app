import React from "react";
import { Nav, Navbar } from "react-bootstrap";
import Logo from '../../../assets/logo.png'

import { useDispatch, useSelector } from "react-redux";
import { setContract } from "../../../modules/actions/SetContract";
import { METAMASK_WALLET } from "../../../constants/constants";

import { History } from 'history';

import "./index.css"

interface P {
  wallet: string,
  history: History
}

export const Header: React.FC<P> = (props) => {

  const contract = useSelector((state: any) => state.contract)
  const dispatch = useDispatch()

  const changeWallet = () => {
    // this.props.chooseWalletSetContract(wallet)
    dispatch(setContract(METAMASK_WALLET))
  }

  return (
    <Navbar className="bg_transparent header_fixed" expand="sm">
      <Navbar.Brand href="/"><img
        alt=""
        src={Logo}
        // width="150"
        // height="150"
        className="header_image"
      />
      </Navbar.Brand>
      {/* <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="ml-auto">
          <Nav.Link href="/">Home</Nav.Link>
          <Nav.Link href="/#developers">Developers</Nav.Link>
          <Nav.Link href="/#users">Users</Nav.Link>
          <Nav.Link onClick={() => props.history.push(ProfilePage)}>Your Apps</Nav.Link>
        </Nav>
      </Navbar.Collapse> */}
      <Nav.Link className="d-flex justify_content_center">
        {
          contract.fireRegistryControllerContract?.accounts.length && contract.fireRegistryControllerContract?.web3 ?
            <div className="header-wallet-select-button"><div className="header-wallet-select-button-text">{contract.fireRegistryControllerContract.accounts}</div></div>
            :
            <div className="header-wallet-select-button" onClick={changeWallet}>
              <div className="header-wallet-select-button-text">Connect Wallet</div></div>
        }
      </Nav.Link>
    </Navbar>
  );
};
