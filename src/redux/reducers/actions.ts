import { citizensAPI } from '../../api';
import { 
    FETCH_CITIZENS_SUCCESS, 
    FETCH_CITIZENS_PENDING, 
    FETCH_CITIZENS_ERROR, 
    FETCH_NOTE_SUCCESS,
    CLEAR_CITIZEN_NOTE,
    ADD_NEW_CITIZEN,
    FETCH_ACCOUNT,
    FETCH_CITIZENS_COUNT
} from './actionTypes';

export const setCitizens = (citizens: any) => ({
    type: FETCH_CITIZENS_SUCCESS,
    citizens
});

export const setPending = () => ({
    type: FETCH_CITIZENS_PENDING,
});

export const setError = () => ({
    type: FETCH_CITIZENS_ERROR,
});

export const setCitizenNote = (citizenNote: string) => ({
    type: FETCH_NOTE_SUCCESS,
    citizenNote
});

export const clearCitizenNote = () => ({
    type: CLEAR_CITIZEN_NOTE
});

export const addNewCitizenAction = (citizen: any) => ({
    type: ADD_NEW_CITIZEN,
    citizen
})

export const setAccount = (account: string) => ({
    type: FETCH_ACCOUNT,
    account
});

export const setCitizensCount = (citizensCount: number) => ({
    type: FETCH_CITIZENS_COUNT,
    citizensCount
});


export const getCitizensCount = () => async (dispatch: any) => {
    try {
        const count = await citizensAPI.getCitizensCount();
        dispatch(setCitizensCount(count));
    } catch ({ message }) {
        console.error(message);
    }
}

export const addNewCitizen = (formValues: any) => async (dispatch: any) => {
    try {
        const citizen = await citizensAPI.addNewCitizen(formValues);
        dispatch(addNewCitizenAction(citizen));
    } catch ({ message }) {
        console.error(message);
    }
};

export const getCitizens = ({ page, limit }: any) => async (dispatch: any) => {
    try {
        dispatch(setPending());

        const count = await citizensAPI.getCitizensCount();
        const citizens = await citizensAPI.fetchCitizens(page, limit, count);
        
        dispatch(setCitizens(citizens));
    } catch (error) {
        console.error(error);
        dispatch(setError());
    }
};

export const getCitizenNote = (id: string) => async (dispatch: any) => {
    try {
        const citizenNote = await citizensAPI.fetchNote(id);
        dispatch(setCitizenNote(citizenNote));
    } catch (error) {
        console.error(error);
    }
};
