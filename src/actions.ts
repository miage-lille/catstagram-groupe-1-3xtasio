import { CloseModal, Decrement, FetchCatsCommit, FetchCatsRequest, FetchCatsRollback, Increment, SelectPicture } from './types/actions.type';
import { Picture } from './types/picture.type';

export const increment = (): Increment => ({ type: 'INCREMENT' });
export const decrement = (): Decrement => ({ type: 'DECREMENT' });
export const closeModal = (): CloseModal => ({ type: 'CLOSE_MODAL' });
export const fetchCatsRequest = (counter:number): FetchCatsRequest => ({
  type: 'FETCH_CATS_REQUEST',
  method: 'GET',
  path: `https://pixabay.com/api/?key=48766663-e8a50bdcd4507021d89beb1f2&per_page=${counter}&q=cat`,
});

export const selectPicture = (picture: Picture): SelectPicture => ({ type: 'SELECT_PICTURE', picture });
export const fetchCatsCommit = (payload: unknown): FetchCatsCommit => ({ type: 'FETCH_CATS_COMMIT', payload });

export const fetchCatsRollback = (error: Error): FetchCatsRollback => ({ type: 'FETCH_CATS_ROLLBACK', error });
