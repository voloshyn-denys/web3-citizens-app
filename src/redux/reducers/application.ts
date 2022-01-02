import { FETCH_ACCOUNT } from './actionTypes';

const initialState = {
    account: '',
};

export default function(state = initialState, action: any) {
    switch (action.type) {
        case(FETCH_ACCOUNT): {
            return {
                ...state,
                account: action.account
            }
        }
        default:
            return state;
    }
};
