import { Cmd, Loop, liftState, loop } from 'redux-loop';
import { compose } from 'redux';
import { Actions } from './types/actions.type';
import { Picture } from './types/picture.type';
import fakedatas from './fake-datas.json';
import { none, Option, some } from 'fp-ts/lib/Option';
import { cmdFetch } from './commands';
import { Pictures } from './types/api.type';
import { fetchCatsRequest } from './actions';
export type State = {
  counter: number,
  pictures: Pictures,
  selectedPicture?: Option<Picture>,
};


const INITIAL_PICTURE_NUMBER = 3
export const defaultState: State = {
  counter: INITIAL_PICTURE_NUMBER,
  pictures: { kind: 'SUCCESS', pictures: [] },
  selectedPicture: none,  
};



export const reducer = (state: State | undefined, action: Actions): State | Loop<State> => {
  if (!state) return defaultState; // mandatory by redux
  switch (action.type) {
    case 'INCREMENT':
      return loop(
        { ...state, counter: state.counter + 1},
        Cmd.action(fetchCatsRequest(state.counter + 1))
      );
    case 'DECREMENT':
      if (state.counter <= 3) {
        return state;
      }
      return loop(
        { ...state, counter: state.counter - 1},
        Cmd.action(fetchCatsRequest(state.counter - 1))
      );
    case 'SELECT_PICTURE':
      return { ...state, selectedPicture: some(action.picture) };
    case 'CLOSE_MODAL':
      return { ...state, selectedPicture: none };
    case 'FETCH_CATS_REQUEST':
      return loop(
        { ...state, pictures: { kind: 'LOADING' }},
        cmdFetch(action)
      );
    case 'FETCH_CATS_COMMIT':
      return { ...state, pictures: { kind: 'SUCCESS', pictures: action.payload as Picture[] } };
    case 'FETCH_CATS_ROLLBACK':
      return { ...state, pictures: { kind: 'FAILURE', error: action.error.message } };
  }
};

export const counterSelector = (state: State) => {
  return state.counter;
};
export const picturesSelector = (state: State) => {
  return state.pictures;
};
export const getSelectedPicture = (state: State) => {
  return state.selectedPicture;
};

export default compose(liftState, reducer);