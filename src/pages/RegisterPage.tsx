import React, { Component } from 'react'
import { connect } from 'react-redux'
import Register from '../components/Register'
import { BuyOptions } from '../constants/Interfaces'
import { getSecondsForDays } from '../utils/CalcSeconds'

const options: Array<BuyOptions> = [
    {
        id: 1,
        price: '',
        time: 'For 1 year'
    },
    {
        id: 2,
        price: '',
        time: 'For 2 years'
    }, {
        id: 3,
        price: '',
        time: 'For 3 years'
    }, {
        id: 4,
        price: '',
        time: 'For 5 years'
    },
]

export class RegisterPage extends Component<any, any> {

    state = {
        loading: false,
        name: '',
        valueOptions: options
    }

    async componentDidMount(): Promise<any> {
        let web3: any = this.props.contract.fireRegistryControllerContract?.web3
        this.setState({ loading: true })
        let name = this.props?.history?.location?.pathname?.split("/")[1]
        let value = await this.props.contract.fireRegistryControllerContract?.instance?.methods?.available(name.split('.')[0]).call()
        if (this.props.register.data?.name === name.split('.')[0]) {
            this.props.history.push('/')
        } else if (!value) {
            this.props.history.push('/')
        }

        let _options: Array<BuyOptions> = options;

        for (let i = 0; i < _options.length; i++) {
            let time = _options[i].id === 4 ? getSecondsForDays(5 * 365) : getSecondsForDays(_options[i].id * 365)
            let value = await this.props.contract.fireRegistryControllerContract?.instance?.methods?.rentPrice(name.split('.')[0], time).call()

            let price: number = 0
            value?.map((p: any) => price += Number(p))

            let val = await web3?.utils?.fromWei(`${price}`, 'ether');
            _options[i].price = `${val} FIL`
        }

        this.setState({
            name,
            loading: false,
            valueOptions: _options
        })

    }

    async componentDidUpdate(prevProps: any, prevState: any): Promise<void> {
        if (this.props.contract.fireRegistryControllerContract !== prevProps.contract.fireRegistryControllerContract) {
            this.setState({ loading: true })

            let name = this.props?.history?.location?.pathname?.split("/")[1]
            let value = await this.props.contract.fireRegistryControllerContract?.instance?.methods?.available(name.split('.')[0]).call()
            if (this.props.register.data?.name === name.split('.')[0]) {
                this.props.history.push('/')
            } else if (!value) {
                this.props.history.push('/')
            }
            this.setState({ loading: false })
        }

        // if(prevState.name !== this.state.name) 
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
            <div className="RegisterPage custom-scrollbar">
                <Register loadProps={this.state.loading} callApi={this.callApi} pushToHistory={this.pushToHistory} fireName={this.props?.history?.location?.pathname?.split("/")[1]} options={this.state.valueOptions} />
            </div>
        )
    }
}

const mapStateToProps = (state: any) => ({
    register: state.register,
    contract: state.contract,
})

const mapDispatchToProps = (dispatch: Function) => ({
    sendAction: (action: Function, payload?: any) => dispatch(payload ? action(payload) : action())
})

export default connect(mapStateToProps, mapDispatchToProps)(RegisterPage)
