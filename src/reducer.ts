import { Loop, liftState } from 'redux-loop';
import { compose } from 'redux';
import { Actions } from './types/actions.type';
import { Picture } from './types/picture.type';
import fakedatas from './fake-datas.json';
export type State = {
  counter: number,
  pictures: Picture[],
};


const INITIAL_PICTURE_NUMBER = 3
export const defaultState: State = {
  counter: INITIAL_PICTURE_NUMBER,
  pictures: fakedatas.slice(0, INITIAL_PICTURE_NUMBER) as Picture[],
};



export const reducer = (state: State | undefined, action: Actions): State | Loop<State> => {
  if (!state) return defaultState; // mandatory by redux
  switch (action.type) {
    case 'INCREMENT':
      return { ...state, counter: state.counter + 1, pictures: fakedatas.slice(0, state.counter + 1) as Picture[] };
    case 'DECREMENT':
      if (state.counter <= 3) {
        return state;
      }
      return { ...state, counter: state.counter - 1, pictures: fakedatas.slice(0, state.counter - 1) as Picture[] };

    case 'SELECT_PICTURE':
      return { ...state };
    case 'CLOSE_MODAL':
      throw 'Not Implemented';
    case 'FETCH_CATS_REQUEST':
      throw 'Not Implemented';
    case 'FETCH_CATS_COMMIT':
      throw 'Not Implemented';
    case 'FETCH_CATS_ROLLBACK':
      throw 'Not Implemented';
  }
};

export const counterSelector = (state: State) => {
  return state.counter;
};
export const picturesSelector = (state: State) => {
  return state.pictures;
};
export const getSelectedPicture = (state: State) => {
  throw 'Not Implemented';
};

export default compose(liftState, reducer);
