import { CLEAR_GAMES, REQUEST_GAMES, CREATE_GAME, DELETE_GAME, EDIT_GAME } from '@/store/games/constants';

export function requestGames() {
  return { type: REQUEST_GAMES };
}

export function clearGames() {
  return { type: CLEAR_GAMES };
}

export function createGame(data) {
  return { type: CREATE_GAME, data: data };
}

export function deleteGame(id) {
  return { type: DELETE_GAME, data: id };
}
export function editGame(data, id) {
  return { type: EDIT_GAME, data: data, id: id };
}