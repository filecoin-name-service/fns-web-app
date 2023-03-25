declare global {
    interface Window {
        REDUX_INITIAL_DATA: any
        __REDUX_DEVTOOLS_EXTENSION__: any
        location: Location
        recaptchaVerifier: any
        recaptchaWidgetId: any
    }
}

export interface payload {
    id: string
}

export interface ActionObject {
    type: string
    payload: payload
}

export interface ActionWithPayload {
    type: string
    payload: any
}

export interface MakeCommitmentData {
    name: string
    duration: number
    setReverse: boolean
    data: Array<Object>
    ownerControlledFuses: number
}

// -------- FOR REDUCERS --------- //

export interface Contract {
    web3: any
    instance: any,
    accounts: [],
    faucetInstance: any
}

export interface Modal {
    data: {
        modalHeader: string,
        modalBody: string,
        modalButtonText: any,
    }
    isOpen: boolean,
}

export interface BuyOptions {
    id: number,
    price: string,
    time: string
}