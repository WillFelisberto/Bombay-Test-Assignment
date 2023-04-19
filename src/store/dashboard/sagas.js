/* eslint-disable import/no-anonymous-default-export */
import { put, call, takeLatest } from 'redux-saga/effects';
import { api } from '@/api/services';
import { REQUEST_DASHBOARD, SUCCESS_DASHBOARD, FAILURE_DASHBOARD } from '@/store/dashboard/constants';

async function getDashboardApi() {
  try {
    const users = await api.get(`/users`);
    const games = await api.get(`/games`);
    const dataToReturn = {
      totals: {
        users: users.data.length,
        games: games.data.length,
      }
    }

    return dataToReturn;
  } catch (error) {
    throw error;
  }
}

function* getDashboard() {
  try {
    const response = yield call(getDashboardApi);
    yield put({ type: SUCCESS_DASHBOARD, payload: response });
  } catch (err) {
    yield put({ type: FAILURE_DASHBOARD, payload: { message: err.message } });
  }
}

export default function* () {
  yield takeLatest(REQUEST_DASHBOARD, getDashboard);
}