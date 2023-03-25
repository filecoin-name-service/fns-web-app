
import axios from 'axios';

export const fetchFromIPFS = async (path: string) => {
    try {
        const response = await axios.get(`https://ipfs.io/ipfs/${path}`)
        return response.data
    } catch (err: any) {
        throw err
    }
}