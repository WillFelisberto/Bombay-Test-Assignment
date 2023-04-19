import { combineReducers } from 'redux';

import users from '@/store/users/reducer';
import games from '@/store/games/reducer';
import dashboard from '@/store/dashboard/reducer';

const rootReducer = combineReducers({
  users,
  games,
  dashboard
});

export default rootReducer;