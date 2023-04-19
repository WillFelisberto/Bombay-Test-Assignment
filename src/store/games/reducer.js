import {
  FAILURE_GAMES,
  REQUEST_GAMES,
  SUCCESS_GAMES,
  CLEAR_GAMES,
  CREATE_GAME,
  EDIT_GAME,
  DELETE_GAME
} from '@/store/games/constants';

const INITIAL_STATE = {
  data: [],
  loading: false,
  error: false,
  loaded: false,
  message: '',
};

export default function gamesReducer(state = INITIAL_STATE, action) {
  switch (action.type) {
    case REQUEST_GAMES:
      return { ...state, loading: true };
    case SUCCESS_GAMES:
      return {
        ...state,
        data: action.payload.data,
        loading: false,
        loaded: true,
        error: false,
      };
    case FAILURE_GAMES:
      return {
        ...state,
        data: [],
        loading: false,
        loaded: true,
        error: true,
        message: action.payload.message,
      };

    case CLEAR_GAMES:
      return {
        ...state,
        data: [],
        loading: false,
        loaded: false,
        error: false,
      };
    case CREATE_GAME:
      return {
        ...state,
        data: action.data,
        loading: false,
        loaded: false,
        error: false,
      };
    case DELETE_GAME:
      return {
        ...state,
        data: action.data,
        loading: false,
        loaded: false,
        error: false,
      };
    case EDIT_GAME:
      return {
        ...state,
        data: action.data,
        loading: false,
        loaded: false,
        error: false,
      };
    default:
      return state;
  }
}