import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Route, Switch, withRouter } from 'react-router-dom';
import './App.css'
import { Header } from './components/common/Header';
import CommonModal from './components/common/Modal'
import * as ROUTES from './constants/Routes';
import HomePage from './pages/HomePage'
import RegisterPage from './pages/RegisterPage'

import { METAMASK_WALLET, PORTIS_WALLET } from './constants/constants';
import { closePopup, logoutWallet, setContract } from './modules/actions/SetContract';
import { getLocalStorage } from './utils/localStorage';
import { emptyContract } from './constants/EmptyInterfaces';
import { FullScreenLoader } from './components/common/Loader/Loader';

class RoutingComponent extends Component<any, any> {
    state = {
        isOnline: true,
        wallet: ''
    }

    networkListener: any
    unreadMessageFetchedFlag = false

    componentDidMount() {
        const _storage = getLocalStorage()
        this.setState({
            wallet: _storage && _storage.wallet ? _storage.wallet : ''
        }, () => {
            this.props.chooseWalletSetContract(METAMASK_WALLET)
        })
    }

    componentWillUnmount() {
        if (this.networkListener) this.networkListener.remove()
        this.unreadMessageFetchedFlag = false
    }

    componentDidUpdate(prevProps: any, prevState: any) {
        const _storage = getLocalStorage()
        if (_storage && _storage.wallet)
            if (prevState.wallet !== _storage.wallet)
                this.setState({
                    wallet: _storage && _storage.wallet ? _storage.wallet : ''
                }, () => {
                    this.props.chooseWalletSetContract(METAMASK_WALLET)
                })
    }

    walletUpdate = (wallet: string = "") => {
        this.props.chooseWalletSetContract(wallet)
    }

    closeWalletSelect = () => {
        const { contract } = this.props
        this.props.closeWalletSelect()
        const _storage = getLocalStorage()
        if ((
            (_storage && _storage.wallet === PORTIS_WALLET) ||
            (_storage && _storage.wallet === METAMASK_WALLET)) &&
            contract.contract !== emptyContract) { }
        else {
            this.props.history.push('/')
        }
    }
    logoutWallet = () => {
        this.props.logoutWallet()
        this.props.history.push('/')
    }

    render() {
        const { contract } = this.props
        const { wallet } = this.state
        return (
            <>
                {contract && contract.loading && <FullScreenLoader />}
                <div className={`App custom-scrollbar ${contract && contract.loading ? 'noScroll noClick' : ''}`}>
                    <CommonModal history={this.props.history} />
                    <Header wallet={wallet} history={this.props.history} />
                    {/* <WalletSelect show={contract.error === OPEN_WALLET_SELECT_MODAL ? true : false} chooseWallet={this.walletUpdate} closeWalletSelect={this.closeWalletSelect} logoutWallet={this.logoutWallet} /> */}
                    <Switch >
                        <Route exact path={ROUTES.HomePage} component={HomePage} />
                        <Route exact path={ROUTES.RegisterPage} component={RegisterPage} />
                    </Switch>
                </div>
            </>
        )
    }
}

const mapDispatchToProps = (dispatch: Function) => ({
    chooseWalletSetContract: (wallet: string) => dispatch(setContract(wallet)),
    closeWalletSelect: () => dispatch(closePopup()),
    logoutWallet: () => dispatch(logoutWallet())
})

const mapStateToProps = (state: any) => ({
    contract: state.contract
});

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(RoutingComponent))
