import {
  FAILURE_DASHBOARD,
  REQUEST_DASHBOARD,
  SUCCESS_DASHBOARD,
  CLEAR_DASHBOARD,

} from '@/store/dashboard/constants';

const INITIAL_STATE = {
  data: [],
  loading: false,
  error: false,
  loaded: false,
  message: '',
};

export default function userReducer(state = INITIAL_STATE, action) {
  switch (action.type) {
    case REQUEST_DASHBOARD:
      return { ...state, loading: true };
    case SUCCESS_DASHBOARD:
      return {
        ...state,
        data: action.payload,
        loading: false,
        loaded: true,
        error: false,
      };
    case FAILURE_DASHBOARD:
      return {
        ...state,
        data: [],
        loading: false,
        loaded: true,
        error: true,
        message: action.message,
      };

    case CLEAR_DASHBOARD:
      return {
        ...state,
        data: [],
        loading: false,
        loaded: true,
        error: false,
      };
    default:
      return state;
  }
}