import { all, fork } from 'redux-saga/effects';

import * as gamesSagas from '@/store/games/sagas';
import * as dashboardSagas from '@/store/dashboard/sagas';
import * as usersSagas from '@/store/users/sagas';

export default function* rootSaga() {
  yield all([...Object.values(gamesSagas)].map(fork));
  yield all([...Object.values(usersSagas)].map(fork));
  yield all([...Object.values(dashboardSagas)].map(fork));
}