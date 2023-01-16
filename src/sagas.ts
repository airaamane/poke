import { call, takeEvery, put } from "redux-saga/effects";
import { sagaActions } from "./sagaActions";
import { load, PokeListResponse, select } from "./app/store";
import { IPokemon } from "./config/pokemon";
import { PayloadAction } from "@reduxjs/toolkit";

const API_URL = "https://pokeapi.co/api/v2";

export function* fetchPokemonSaga(action: PayloadAction<{ params: string }>) {
  try {
    let result: PokeListResponse = yield call(() =>
      fetch(`${API_URL}/pokemon?${action.payload.params}`).then((res) =>
        res.json()
      )
    );
    yield put({
      type: sagaActions.LOAD_POKEMON_SUCCEEDED_SAGA,
      payload: result,
    });
  } catch (e) {
    yield put({ type: sagaActions.LOAD_POKEMON_FAILED_SAGA });
  }
}

export function* fetchPokemonSucceededSaga(
  action: PayloadAction<PokeListResponse>
) {
  yield put(load(action.payload));
}

//FIXME: cache the result to avoid fetching the same pokemon twice fromn the API
export function* selectPokemonSaga(
  action: PayloadAction<{ url: string } | null>
) {
  try {
    if (action.payload === null) {
      yield put(select(null));
    } else {
      let result: IPokemon = yield call(() =>
        fetch(action.payload!.url).then((res) => res.json())
      );
      yield put(select(result));
    }
  } catch (e) {
    yield put({ type: sagaActions.GENERIC_ERROR_SAGA });
  }
}

export default function* rootSaga() {
  yield takeEvery(sagaActions.LOAD_POKEMON_SAGA, fetchPokemonSaga);
  yield takeEvery(
    sagaActions.LOAD_POKEMON_SUCCEEDED_SAGA,
    fetchPokemonSucceededSaga
  );
  yield takeEvery(sagaActions.SELECT_POKEMON, selectPokemonSaga);
}
