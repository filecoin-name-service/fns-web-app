import { MakeCommitmentData } from "../constants/Interfaces"
import { FEVM_TESTNET_CONTRACT_ADDRESSES } from "../constants/constants";

export const registerName = async (reduxState: any) => {
    try {
        const { data } = reduxState.register
        const { fireRegistryControllerContract } = reduxState.contract
        let currAccount = await fireRegistryControllerContract.web3.eth.getAccounts();

        const priceArray = await fireRegistryControllerContract.instance.methods.rentPrice(data.name, data.duration).call({ from: currAccount[0].toString() });
        let price: number = 0
        priceArray.map((p: any) => price += Number(p))

        // string memory name, address owner, uint256 duration, bytes32 secret, address resolver, bytes[] calldata data, bool reverseRecord, uint16 ownerControlledFuses
        // getCommitment).send({ from: currAccount[0].toString() });
        let registerName = await fireRegistryControllerContract.instance.methods.register(
            data.name,
            currAccount[0].toString(),
            data.duration,
            process.env.REACT_APP_COMMITMENT_SECRET,
            FEVM_TESTNET_CONTRACT_ADDRESSES.PublicResolver,
            data.data ?? [],
            data.setReverse ?? false,
            data.ownerControlledFuses ?? 0).send({ from: currAccount[0].toString(), value: price });

        return { txnHash: registerName.transactionHash.toString() }
    } catch (err: any) {
        throw err
    }
}

export const commitName = async (data: MakeCommitmentData, reduxState: any) => {
    try {
        const { fireRegistryControllerContract } = reduxState.contract
        let currAccount = await fireRegistryControllerContract.web3.eth.getAccounts();

        const getCommitment = await makeCommitment(data, reduxState);

        // string memory name, address owner, uint256 duration, bytes32 secret, address resolver, bytes[] calldata data, bool reverseRecord, uint16 ownerControlledFuses
        let commitedName = await fireRegistryControllerContract.instance.methods.commit(getCommitment).send({ from: currAccount[0].toString() });
        // data.name,
        // currAccount[0].toString(),
        // data.duration,
        // process.env.REACT_APP_COMMITMENT_SECRET,
        // FEVM_TESTNET_CONTRACT_ADDRESSES.PublicResolver,
        // data.data ?? [],
        // data.setReverse ?? false,
        // data.ownerControlledFuses ?? 0).call({ from: currAccount[0].toString() });

        return { commitment: getCommitment, txnHash: commitedName.transactionHash.toString() }
    } catch (err: any) {
        throw err
    }
}

export const makeCommitment = async (data: MakeCommitmentData, reduxState: any) => {
    try {
        const { fireRegistryControllerContract } = reduxState.contract
        let currAccount = await fireRegistryControllerContract.web3.eth.getAccounts();

        // string memory name, address owner, uint256 duration, bytes32 secret, address resolver, bytes[] calldata data, bool reverseRecord, uint16 ownerControlledFuses
        let commitmentHash = await fireRegistryControllerContract.instance.methods.makeCommitment(
            data.name,
            currAccount[0].toString(),
            data.duration,
            process.env.REACT_APP_COMMITMENT_SECRET,
            FEVM_TESTNET_CONTRACT_ADDRESSES.PublicResolver,
            data.data ?? [],
            data.setReverse ?? false,
            data.ownerControlledFuses ?? 0).call({ from: currAccount[0].toString() });

        return commitmentHash
    } catch (err: any) {
        throw err
    }
}
