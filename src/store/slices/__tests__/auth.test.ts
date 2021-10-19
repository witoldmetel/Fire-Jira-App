import { store } from '../../store';
import { startLoading, getUserSuccess, getUserReject, hasError, resetState } from '../auth';

describe('auth slice', () => {
  test('get user sucessfully', () => {
    store.dispatch(startLoading());

    let state = store.getState().auth;

    expect(state.isLoading).toBeTruthy();
    expect(state.isAuthenticated).toBeFalsy();
    expect(state.user).toBe(null);

    store.dispatch(getUserSuccess({ id: 1, email: 'random@email.com' }));

    state = store.getState().auth;

    expect(state.isLoading).toBeFalsy();
    expect(state.isAuthenticated).toBeTruthy();
    expect(state.user?.id).toBe(1);
    expect(state.user?.email).toBe('random@email.com');
  });

  test('user rejected', () => {
    store.dispatch(getUserReject());

    let state = store.getState().auth;

    expect(state.isAuthenticated).toBeFalsy();
    expect(state.user).toBe(null);
  });

  test('get error', () => {
    let state = store.getState().auth;

    expect(state.isError).toBeFalsy();
    expect(state.errorMessage).toBe(null);

    store.dispatch(hasError('random error'));

    state = store.getState().auth;

    expect(state.isError).toBeTruthy();
    expect(state.errorMessage).toBe('random error');

    store.dispatch(resetState());

    state = store.getState().auth;

    expect(state.isError).toBeFalsy();
    expect(state.errorMessage).toBe(null);
  });
});
