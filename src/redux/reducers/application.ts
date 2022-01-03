import { FETCH_ACCOUNT } from './actionTypes';
import { ActionTypes, ApplicationState } from './types'

const initialState: ApplicationState = {
    account: '',
};

export default function(state = initialState, action: ActionTypes): ApplicationState {
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
