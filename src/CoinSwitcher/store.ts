import { Reducer, Action } from 'redux';

// Action
export enum ActionKeys {
    SWITCH_COIN = 'SWITCH_COIN'
}

interface SwitchCoinAction extends Action {
    coinName: string;
}

export const switchCoin = (coinName: string) => ({
    type: ActionKeys.SWITCH_COIN,
    coinName
});

export type ActionTypes = SwitchCoinAction;

// Reducer
export type State = {
    readonly coinName: string;
};

const initialState: State = {
    coinName: 'ETH'
};

export const reducer: Reducer<State> = (state: State = initialState, action: ActionTypes) => {
    switch (action.type) {
        case ActionKeys.SWITCH_COIN:
            return state.coinName === action.coinName ? state : { coinName: action.coinName };
        default:
            return state;
    }
};
