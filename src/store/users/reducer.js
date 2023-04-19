import {
  FAILURE_USER,
  REQUEST_USER,
  SUCCESS_USER,
  CLEAR_USER,
  DELETE_USER,
  EDIT_USER,
  CREATE_USER,
} from '@/store/users/constants';

const INITIAL_STATE = {
  data: [],
  loading: false,
  error: false,
  loaded: false,
  message: '',
};

export default function userReducer(state = INITIAL_STATE, action) {
  switch (action.type) {
    case REQUEST_USER:
      return { ...state, loading: true };
    case SUCCESS_USER:
      return {
        ...state,
        data: action.payload.data,
        loading: false,
        loaded: true,
        error: false,
      };
    case FAILURE_USER:
      return {
        ...state,
        data: [],
        loading: false,
        loaded: true,
        error: true,
        message: action.payload.message,
      };

    case CLEAR_USER:
      return {
        ...state,
        data: [],
        loading: false,
        loaded: false,
        error: false,
      };
    case DELETE_USER:
      return {
        ...state,
        data: [],
        loading: true,
        loaded: false,
        error: false,
      };
    case EDIT_USER:
      return {
        ...state,
        data: action.data,
        loading: true,
        loaded: false,
        error: false,
      };
    case CREATE_USER:
      return {
        ...state,
        data: action.data,
        loading: true,
        loaded: false,
        error: false,
      };
    default:
      return state;
  }
}