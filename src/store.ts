import { combineReducers, createStore } from 'redux';

import * as CSStore from './CoinSwitcher/store';

export interface RootState {
    coinSwitcher: CSStore.State;
}

export const RootReducer = combineReducers({
    coinSwitcher: CSStore.reducer
});

export type RootAction = CSStore.ActionTypes;

export const store = createStore(
    RootReducer,
    (<any>window).__REDUX_DEVTOOLS_EXTENSION__ && (<any>window).__REDUX_DEVTOOLS_EXTENSION__() // tslint:disable-line
);
