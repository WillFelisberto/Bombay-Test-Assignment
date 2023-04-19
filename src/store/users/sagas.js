import { put, call, takeLatest } from 'redux-saga/effects';
import { api } from '@/api/services';
import { CREATE_USER, DELETE_USER, EDIT_USER, FAILURE_USER, REQUEST_USER, SUCCESS_USER } from '@/store/users/constants';

async function getUsersApi() {
  try {
    const data = await api.get(`/users`);
    return data.data;
  } catch (error) {
    throw error;
  }
}
async function deleteUsersApi(id) {
  try {
    const data = await api.delete(`/users/${id.data}`);
    return data.data;
  } catch (error) {
    throw error;
  }
}

function* getUser() {
  try {


    const response = yield call(getUsersApi);
    yield put({ type: SUCCESS_USER, payload: { data: response } });
  } catch (err) {
    yield put({ type: FAILURE_USER, payload: { message: err.message } });
  }
}

function* deleteUser(id) {
  try {
    yield call(deleteUsersApi, id);
    yield put({ type: REQUEST_USER });
  } catch (err) {
    yield put({ type: FAILURE_USER, payload: { message: err.message } });
  }
}

async function updateUserApi(dataToSave, id) {
  try {
    const data = await api.put(`/users/${id}`, dataToSave);

    return data.data;
  } catch (error) {
    throw error;
  }
}


async function postUsersApi(dataToSave) {
  try {
    const data = await api.post('/users', dataToSave.data);
    return data.data;
  } catch (error) {
    throw error;
  }
}

function* updateUser(data) {
  const id = data.id;
  const dataToSave = data.data;
  try {
    yield call(updateUserApi, dataToSave, id);
    yield put({ type: REQUEST_USER });
  } catch (err) {
    yield put({ type: FAILURE_USER, payload: { message: err.message } });
  }
}

function* createUser(data) {
  try {
    yield call(postUsersApi, data);
    yield put({ type: REQUEST_USER });
  } catch (err) {
    yield put({ type: FAILURE_USER, payload: { message: err.message } });
  }
}
export default function* usersSaga() {
  yield takeLatest(REQUEST_USER, getUser);
  yield takeLatest(DELETE_USER, deleteUser);
  yield takeLatest(EDIT_USER, updateUser);
  yield takeLatest(CREATE_USER, createUser);
}
