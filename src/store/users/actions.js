import { CLEAR_USER, REQUEST_USER, DELETE_USER, EDIT_USER, CREATE_USER } from '@/store/users/constants';

export function requestUser() {
  return { type: REQUEST_USER };
}

export function clearUser() {
  return { type: CLEAR_USER };
}

export function deleteUser(id) {
  return { type: DELETE_USER, data: id };
}

export function editUser(data, id) {
  return { type: EDIT_USER, data: data, id: id };
}

export function createUser(data, id) {
  return { type: CREATE_USER, data: data, id: id };
}