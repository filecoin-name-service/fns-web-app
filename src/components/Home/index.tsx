import React, { Component } from 'react'
import { Dispatch } from 'redux'
import { connect, ConnectedProps } from 'react-redux'
import { Container } from 'react-bootstrap'
import { RegisterPage } from '../../constants/Routes';
import Logo from '../../assets/logo.png'

import Search from '../common/Search'
import ClaimFil from '../common/ClaimFil'

import { FullScreenLoader } from '../common/Loader/Loader'

import './index.css'

const mapStateToProps = (state: any) => ({
    contract: state.contract
})

const mapDispatchToProps = (dispatch: Dispatch) => ({})

const connector = connect(mapStateToProps, mapDispatchToProps)
type PropsFromRedux = ConnectedProps<typeof connector>

interface State {
    loading: boolean
    searchName: string
    isNameAvailable: boolean
    loadNameAvailability: boolean,
    showUnclaimed: boolean
}
interface OwnProps {
    callApi: Function,
    pushToHistory: Function
}

type Props = PropsFromRedux & OwnProps

export class Home extends Component<Props, State> {

    state = {
        loading: false,
        searchName: '',
        isNameAvailable: false,
        loadNameAvailability: false,
        showUnclaimed: false
    }

    async componentDidUpdate(prevProps: Readonly<Props>, prevState: Readonly<State>) {
        if (this.props.contract?.fireRegistryControllerContract?.accounts !== prevProps.contract?.fireRegistryControllerContract?.accounts || this.state.showUnclaimed !== prevState.showUnclaimed) {
            const acc = this.props.contract?.fireRegistryControllerContract?.accounts[0]
            console.log({ acc })

            let value = await this.props.contract.fireRegistryControllerContract?.faucetInstance?.methods?.faucetClaimTime(acc).call()
            console.log({ value })

            if (Number(value) < parseInt(`${Date.now() / 1000}`) - 60 * 60 * 24) {
                this.setState({
                    showUnclaimed: true
                })
            }

        }
    }

    gotoPage = async () => {
        const { pushToHistory } = this.props

        pushToHistory(RegisterPage.replace(/:fns/, this.state.searchName + `.fil`))
    }


    handleSearchName = async (e: string) => {
        this.setState({
            searchName: e,
            loadNameAvailability: true
        }, async () => {
            let value = await this.props.contract.fireRegistryControllerContract?.instance?.methods?.available(e).call()
            if (value) {
                this.setState({
                    isNameAvailable: true,
                    loadNameAvailability: false
                })
            } else {
                this.setState({
                    isNameAvailable: false,
                    loadNameAvailability: false
                })
            }
        })
    }

    render() {
        const { loading, showUnclaimed } = this.state
        return (
            <>
                {this.state.loading && <FullScreenLoader />}
                {/* {showUnclaimed && <ClaimFil resetClaimBox={() => this.setState({ showUnclaimed: false })} />} */}
                <Container className={`py_40 ${loading ? ' noScroll noClick ' : ''}`}>
                    <img src={Logo} className="App-logo" alt="logo" />
                    <h1 className="home-header">Your fil username</h1>
                    <div className="home-sub-header">Secure your .fil domain for your journey through the FILECOIN ecosystem</div>
                    <hr className="line-style" id="developers" />
                    <Search handleSearchName={this.handleSearchName} searchName={this.state.searchName} showIconOnConfirm={true} isConfirmed={this.state.searchName ? this.state.isNameAvailable ? true : false : false} gotoCheckout={() => this.gotoPage()} loadNameAvailabilityIcon={this.state.loadNameAvailability} />
                </Container>
            </>

        )
    }
}

export default connector(Home)
