import * as React from 'react';
import { Link, Redirect, Route, HashRouter } from 'react-router-dom';
import * as classNames from 'classnames';

import Random from './Random';

class State {
    navIsActive: boolean = false;
}

class App extends React.Component<{}, State> {
    constructor(props: {}) {
        super(props);
        this.state = new State();
    }

    render() {
        return (
            <HashRouter>
                <div>
                    <nav className="navbar is-black">
                        <div className="navbar-brand">
                            <Link className="navbar-item" to="/">
                                Wallet Address
                            </Link>
                            <button
                                className="button navbar-burger is-black"
                                onClick={() => this.toggleNav()}
                            >
                                <span />
                                <span />
                                <span />
                            </button>
                        </div>
                        <div
                            className={classNames('navbar-menu', {
                                'is-active': this.state.navIsActive
                            })}
                        >
                            <div className="navbar-start">
                                <Link className="navbar-item" to="/random">
                                    Random
                                </Link>
                            </div>
                        </div>
                    </nav>
                    <Route
                        exact={true}
                        path="/"
                        component={() => <Redirect to="/random" />}
                    />
                    <Route path="/random" component={Random} />
                </div>
            </HashRouter>
        );
    }

    private toggleNav() {
        this.setState({ navIsActive: !this.state.navIsActive });
    }
}

export default App;
