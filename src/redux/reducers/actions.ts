import { citizensAPI } from '../../api';
import { 
    FETCH_CITIZENS_SUCCESS, 
    FETCH_CITIZENS_PENDING, 
    FETCH_CITIZENS_ERROR, 
    FETCH_NOTE_SUCCESS 
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

export const setCitizenNote = (citizenNote: any) => ({
    type: FETCH_NOTE_SUCCESS,
    citizenNote
});

export const getCitizens = () => async (dispatch: any) => {
    try {
        dispatch(setPending());
        const citizens = await citizensAPI.fetchCitizens();
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