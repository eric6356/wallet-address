import * as React from 'react';
import { Link } from 'react-router-dom';
import * as classNames from 'classnames';

type State = {
    isActive: boolean;
};

export default class Nav extends React.Component<{}, State> {
    state: State = {
        isActive: false
    };

    toggleNav() {
        this.setState({ isActive: !this.state.isActive });
    }

    render() {
        return (
            <nav className="navbar is-black">
                <div className="navbar-brand">
                    <Link className="navbar-item" to="/">
                        Wallet Address
                    </Link>
                    <button className="button navbar-burger is-black" onClick={() => this.toggleNav()}>
                        <span />
                        <span />
                        <span />
                    </button>
                </div>
                <div
                    className={classNames('navbar-menu', {
                        'is-active': this.state.isActive
                    })}
                >
                    <div className="navbar-start">
                        <Link className="navbar-item" to="/random">
                            Random
                        </Link>
                        <Link className="navbar-item" to="/from-private">
                            From Private
                        </Link>
                        <Link className="navbar-item" to="/brain-wallet">
                            Brain Wallet
                        </Link>
                    </div>
                </div>
            </nav>
        );
    }
}
