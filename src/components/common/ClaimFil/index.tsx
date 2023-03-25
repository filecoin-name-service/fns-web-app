import React, { useState, useEffect } from "react";
import { Card, Row, Col } from "react-bootstrap";
import TokenFil from "../../../assets/filecoin.png"

import { useDispatch, useSelector } from "react-redux";
import { FEVM_TESTNET_CONTRACT_ADDRESSES } from "../../../constants/constants"
import { openModalAction, updateModalAction } from '../../../modules/actions/Modal'
import { Spinner } from 'react-bootstrap'

import "./index.css"

interface P {
  resetClaimBox: Function
}

const ClaimFil: React.FC<P> = (props) => {

  const [claimAmount, setClaimAmount] = useState(0)

  const contract = useSelector((state: any) => state.contract)
  const dispatch = useDispatch()

  useEffect(() => {
    async function getClaimAmount() {
      let amount = await contract.fireRegistryControllerContract?.faucetInstance?.methods?.appClaimAmount().call()
      let value = await contract.fireRegistryControllerContract?.web3.utils.fromWei(amount)
      setClaimAmount(value)

    }
    getClaimAmount()
  }, [contract?.fireRegistryControllerContract?.accounts[0], contract.fireRegistryControllerContract?.faucetInstance])

  const claimFil = async () => {

    dispatch(openModalAction({
      data: {
        modalHeader: `Claiming ${claimAmount} tFIL`,
        modalBody: 'Please wait while your funds are being transferred.',
        modalButtonText: <Spinner animation="grow" id="modal-loader" key="modal-loader" />,
      },
      isOpen: true
    }))
    try {


      const acc = contract?.fireRegistryControllerContract?.accounts[0]

      let data = await contract.fireRegistryControllerContract?.faucetInstance?.methods?.claimFaucetFromDapp(acc).encodeABI()
      let gas = await contract.fireRegistryControllerContract?.faucetInstance?.methods?.claimFaucetFromDapp(acc).estimateGas({ from: process.env.REACT_APP_FAUCET_CALLER_ADDRESS })

      const tx = {
        from: process.env.REACT_APP_FAUCET_CALLER_ADDRESS,
        to: FEVM_TESTNET_CONTRACT_ADDRESSES.FaucetContract,
        data,
        gas
      }

      const signedTx = await contract.fireRegistryControllerContract?.web3.eth.accounts.signTransaction(tx, process.env.REACT_APP_FAUCET_CALLER_ADDRESS_PRIVATE_KEY);

      const sentTx = await contract.fireRegistryControllerContract?.web3.eth.sendSignedTransaction(signedTx.rawTransaction)

      dispatch(updateModalAction({
        data: {
          modalHeader: 'Your account is funded.',
          modalBody: `tFIL has been transferred to your address.\n Transaction hash: ${sentTx.transactionHash}`,
          modalButtonText: 'Complete',
        },
        isOpen: true
      }))

      props.resetClaimBox()

    } catch (e: any) {

      let z = e.message.split('"')

      dispatch(updateModalAction({
        data: {
          modalHeader: 'You account is not funded.',
          modalBody: `Error while transferring tFIL.\n Message: ${z[z.indexOf("message") + 2]}.\n Try again later.`,
          modalButtonText: 'Close!',
        },
        isOpen: true
      }))

    }
  }

  return (
    <Card className="claim-fil-card claim-fil-card-hover " onClick={claimFil}>
      <Row>
        <Col xs="12" sm="4" md="2" className="d-flex align-items-center claim-fil-icon-div">
          <img alt="fil token icon" src={TokenFil} className="claim-fil-icon" />
        </Col>
        <Col className="text-left">
          <Row>
            <Col>
              <h2>You have unclaimed tFIL!</h2></Col>
          </Row>

          <Row>
            <Col><h5>Each address on Filcoin testnet can claim {claimAmount} tFIL to test out the new FNS manager app, as well as all the new contracts.</h5></Col>
          </Row>
        </Col>
      </Row>
    </Card>
  );
};

export default ClaimFil