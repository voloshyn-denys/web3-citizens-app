import Web3 from 'web3';
import { CONTACT_ABI, CONTACT_ADDRESS } from '../constants';

const NOT_FOUND = 'Not found';
const WRONG_FORMAT_MESSAGE = 'Decoded with wrong format.'

const provider = 
    (window as any).ethereum || 
    (window as any).web3.currentProvider;

const web3 = new Web3(provider);
const contract = new web3.eth.Contract(CONTACT_ABI as any, CONTACT_ADDRESS);

export const citizensAPI = {
    fetchCitizens: async () => {
        const events =  await contract.getPastEvents('Citizen', {
            fromBlock: 0,
            toBlock: 'latest'
        });

        const transactionsData = events.map(async ({ transactionHash, returnValues: { id, age, name } }) => {
            try {
                const { input }  = await web3.eth.getTransaction(transactionHash);
                const parametersTypes = [
                    { type: 'uint256', name: 'age' },
                    { type: 'string', name: 'city' },
                    { type: 'string', name: 'name' },
                ];
                const { city } = web3.eth.abi.decodeParameters(parametersTypes, input.slice(10));
                const isCityHex = web3.utils.isHex(city);

                if (isCityHex) throw new Error(WRONG_FORMAT_MESSAGE);

                return { id, age, name, city };
            } catch(error) {
                console.error(error);

                return { id, age, name, city: NOT_FOUND };
            }
        })

        return await Promise.all(transactionsData);
    },

    fetchNote: async (id: string) => {
        return await contract.methods.getNoteByCitizenId(id).call();
    }
};