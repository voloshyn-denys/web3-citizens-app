import { 
  FETCH_CITIZENS_SUCCESS, 
  FETCH_CITIZENS_PENDING, 
  FETCH_CITIZENS_ERROR, 
  FETCH_NOTE_SUCCESS 
} from './actionTypes';

const initialState = {
    citizens: [],
    pending: false,
    error: false,
    citizenNote: ''
};

export default function(state = initialState, action: any) {
  switch (action.type) {
    case FETCH_CITIZENS_SUCCESS: {
      const citizens = action.citizens.sort((a: any, b: any) => b.id - a.id);
      return {
        citizens,
        pending: false,
        error: false
      };
    }
    case FETCH_CITIZENS_PENDING: {
      return {
        ...state,
        pending: true
      };
    }
    case FETCH_CITIZENS_ERROR: {
      return {
        ...state,
        pending: false,
        error: true
      };
    }
    case FETCH_NOTE_SUCCESS: {
      return {
        ...state,
        citizenNote: action.citizenNote
      };
    }
    default:
      return state;
  }
};
