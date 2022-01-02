import { 
  FETCH_CITIZENS_SUCCESS, 
  FETCH_CITIZENS_PENDING, 
  FETCH_CITIZENS_ERROR, 
  FETCH_NOTE_SUCCESS,
  CLEAR_CITIZEN_NOTE,
  ADD_NEW_CITIZEN,
  FETCH_CITIZENS_COUNT
} from './actionTypes';

const initialState = {
    citizens: [],
    pending: false,
    error: false,
    citizenNote: '',
    citizensCount: 0
};

export default function(state = initialState, action: any) {
  switch (action.type) {
    case FETCH_CITIZENS_SUCCESS: {
      const citizens = action.citizens.sort((a: any, b: any) => b.id - a.id);

      return {
        ...state,
        citizens,
        pending: false,
        error: false,
        citizenNote: ''
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
    case CLEAR_CITIZEN_NOTE: {
      return {
        ...state,
        citizenNote: ''
      };
    }
    case ADD_NEW_CITIZEN: {
      const { id, name, age, city } = action.citizen;
      return {
        ...state,
        citizens: [
          { id, name, age, city },
          ...state.citizens, 
        ],
        citizensCount: state.citizensCount + 1
      };
    }
    case FETCH_CITIZENS_COUNT: {
      return {
        ...state,
        citizensCount: action.citizensCount
      }
    }
    default:
      return state;
  }
};
