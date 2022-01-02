import Web3 from 'web3';
import { v4 as uuidv4 } from 'uuid';

import { CONTACT_ABI, CONTACT_ADDRESS } from '../constants';
import { getCitizensIdsToSearch } from './utils';

const NOT_FOUND = 'Not found';
const WRONG_FORMAT_MESSAGE = 'Decoded with wrong format.'

const provider = 
    (window as any).ethereum || 
    (window as any).web3.currentProvider;

const web3 = new Web3(provider);
const contract = new web3.eth.Contract(CONTACT_ABI as any, CONTACT_ADDRESS);

export const citizensAPI = {
    getCitizensCount: async () => {
        const events =  await contract.getPastEvents('Citizen', {
            fromBlock: 0,
            toBlock: 'latest'
        });

        return events.length;
    },

    fetchCitizens: async (page: number, limit: number, count: number) => {
        const citizenIds = getCitizensIdsToSearch(page, limit, count);
        
        const events =  await contract.getPastEvents('Citizen', {
            filter: {id: citizenIds},
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
    },

    addNewCitizen: async (citizen: any) => {
        const { age, name, city, note } = citizen;
        const { events } =  await contract.methods
            .addCitizen(age, city, name, note)
            .send({ 
                from: (window as any).ethereum.selectedAddress 
            });
        const id = events?.Citizen?.returnValues?.id || uuidv4();

        console.info(id);

        return { id, age, name, city };
    }
};