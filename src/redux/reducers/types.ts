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
import { Citizen } from '../../types'

interface ISetCitizensAction {
    type: typeof FETCH_CITIZENS_SUCCESS,
    citizens: Citizen[]
};

interface ISetPendingAction {
    type: typeof FETCH_CITIZENS_PENDING,
};

interface ISetErrorAction {
    type: typeof FETCH_CITIZENS_ERROR,
};

interface ISetCitizenNoteAction {
    type: typeof FETCH_NOTE_SUCCESS,
    citizenNote: string
};

interface IClearCitizenNoteAction {
    type: typeof CLEAR_CITIZEN_NOTE
};

interface IAddNewCitizenAction {
    type: typeof ADD_NEW_CITIZEN,
    citizen: Citizen
};

interface ISetAccountAction {
    type: typeof FETCH_ACCOUNT,
    account: string
};

interface ISetCitizensCountAction {
    type: typeof FETCH_CITIZENS_COUNT,
    citizensCount: number
};

export type ActionTypes = 
    ISetCitizensAction | 
    ISetPendingAction | 
    ISetErrorAction | 
    ISetCitizenNoteAction | 
    IClearCitizenNoteAction |
    IAddNewCitizenAction |
    ISetAccountAction |
    ISetCitizensCountAction;

export type CitizensState = {
    citizens: Citizen[],
    pending: boolean,
    error: boolean,
    citizenNote: string,
    citizensCount: number,
};

export type ApplicationState = {
    account: string,
}