import React, { Component } from 'react'
import { connect } from 'react-redux'
import Home from '../components/Home'
import { registerMakeCommitmentReset } from '../modules/actions/Register'

export class HomePage extends Component<any, any> {

    componentDidMount(): void {
        this.props.sendAction(registerMakeCommitmentReset)
    }

    callApi = (action: any, payload: any) => {
        if (payload != null) this.props.sendAction(action, payload);
        else this.props.sendAction(action);
    };

    pushToHistory = (path: string) => {
        this.props.history.push(path)
    }

    render() {
        return (
            <div className="HomePage custom-scrollbar">
                <header className="Home-header">
                    <Home callApi={this.callApi} pushToHistory={this.pushToHistory} />
                </header>
            </div>
        )
    }
}

const mapStateToProps = (state: any) => ({})

const mapDispatchToProps = (dispatch: Function) => ({
    sendAction: (action: Function, payload?: any) => dispatch(payload ? action(payload) : action())
})

export default connect(mapStateToProps, mapDispatchToProps)(HomePage)
