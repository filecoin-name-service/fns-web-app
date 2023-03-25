
import { Contract, Modal, BuyOptions } from './Interfaces'

export const emptyContract: Contract = {
    web3: {},
    instance: {},
    accounts: [],
    faucetInstance: {}
}

export const emptyModal: Modal = {
    data: {
        modalHeader: '',
        modalBody: '',
        modalButtonText: '',
    },
    isOpen: false,
}

export const emptyBuyOptions: BuyOptions = {
    id: 0,
    price: "",
    time: ""
}