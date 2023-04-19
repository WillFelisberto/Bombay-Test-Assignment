import { put, call, takeLatest } from 'redux-saga/effects';
import { api } from '@/api/services';
import { FAILURE_GAMES, REQUEST_GAMES, SUCCESS_GAMES, CREATE_GAME, DELETE_GAME, EDIT_GAME } from '@/store/games/constants';

async function getGamesApi() {
  try {
    const data = await api.get('/games');
    return data.data;
  } catch (error) {
    throw error;
  }
}

async function postGamesApi(dataToSave) {
  try {
    const data = await api.post('/games', dataToSave.data);
    return data.data;
  } catch (error) {
    throw error;
  }
}

async function deleteGameApi(id) {
  try {
    const data = await api.delete(`/games/${id.data}`);
    return data.data;
  } catch (error) {
    throw error;
  }
}

async function updateGameApi(dataToSave, id) {
  try {
    const data = await api.put(`/games/${id}`, dataToSave);
    return data.data;
  } catch (error) {
    throw error;
  }
}

function* getGames(action) {
  try {
    const response = yield call(getGamesApi, action);
    yield put({ type: SUCCESS_GAMES, payload: { data: response } });
  } catch (err) {
    yield put({ type: FAILURE_GAMES, payload: { message: err.message } });
  }
}

function* createGame(data) {
  try {
    yield call(postGamesApi, data);
    yield put({ type: REQUEST_GAMES });
  } catch (err) {
    yield put({ type: FAILURE_GAMES, payload: { message: err.message } });
  }
}

function* deleteGame(id) {
  try {
    yield call(deleteGameApi, id);
    yield put({ type: REQUEST_GAMES });
  } catch (err) {
    yield put({ type: FAILURE_GAMES, payload: { message: err.message } });
  }
}

function* updateGame(data) {
  const id = data.id;
  const dataToSave = data.data;
  try {
    yield call(updateGameApi, dataToSave, id);
    yield put({ type: REQUEST_GAMES });
  } catch (err) {
    yield put({ type: FAILURE_GAMES, payload: { message: err.message } });
  }
}

export default function* gamesSaga() {
  yield takeLatest(REQUEST_GAMES, getGames);
  yield takeLatest(CREATE_GAME, createGame);
  yield takeLatest(DELETE_GAME, deleteGame);
  yield takeLatest(EDIT_GAME, updateGame);
}
