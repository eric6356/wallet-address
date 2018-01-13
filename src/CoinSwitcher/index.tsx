import * as React from 'react';
import * as classNames from 'classnames';
import { connect } from 'react-redux';
import { Dispatch } from 'redux';

import { RootState } from '../store';
import { ActionTypes, switchCoin } from './store';

interface DropdownItemProps {
    name: string;
    isActive: boolean;
    switchTo: () => ActionTypes;
}
const DropdownItem: React.SFC<DropdownItemProps> = (props: DropdownItemProps) => (
    <a
        className={classNames('dropdown-item', { 'is-active': props.isActive })}
        onClick={() => !props.isActive && props.switchTo()}
    >
        {props.name}
    </a>
);

export interface CoinSwitcherProps {
    coinName: string;
    switchCoin: (coinName: string) => ActionTypes;
}

type State = {
    isActive: boolean;
};

class CoinSwitcherComponent extends React.Component<CoinSwitcherProps, State> {
    state: State = {
        isActive: false
    };

    toggleDropDown() {
        return this.setState({ isActive: !this.state.isActive });
    }

    render() {
        const { isActive } = this.state;
        const { coinName, switchCoin } = this.props;
        return (
            <div className={classNames('dropdown is-right is-hoverable', { 'is-active': isActive })}>
                <div className="dropdown-trigger">
                    <button className="button">
                        <span>{coinName}</span>
                        <span className="icon is-small">
                            <i className="fas fa-angle-down" />
                        </span>
                    </button>
                </div>
                <div className="dropdown-menu" style={{ minWidth: 0 }}>
                    <div className="dropdown-content">
                        {['ETH', 'BTC'].map(name => (
                            <DropdownItem
                                name={name}
                                key={name}
                                isActive={coinName === name}
                                switchTo={() => switchCoin(name)}
                            />
                        ))}
                    </div>
                </div>
            </div>
        );
    }
}

const mapStateToProps = (state: RootState) => ({
    coinName: state.coinSwitcher.coinName
});

const mapDispatchToProps = (dispatch: Dispatch<RootState>) => ({
    switchCoin: (coinName: string) => dispatch(switchCoin(coinName))
});

const CoinSwitcher = connect(mapStateToProps, mapDispatchToProps)(CoinSwitcherComponent);

export default CoinSwitcher;
