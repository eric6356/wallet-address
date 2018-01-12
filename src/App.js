import React, { Component } from 'react'
import { Link, Redirect, Route } from 'react-router-dom'
import classNames from 'classnames'

import Random from './Random';

class App extends Component {
    constructor(props) {
        super(props)
        this.state = {
            navIsActive: false
        }
    }

    toggleNav() {
        this.setState({ navIsActive: !this.state.navIsActive })
    }

    render() {
        return (
            <div>
                <nav className="navbar is-black">
                    <div className="navbar-brand">
                        <Link className="navbar-item" to="/">Wallet Address</Link>
                        <button className="button navbar-burger is-black" onClick={() => this.toggleNav()}>
                            <span></span>
                            <span></span>
                            <span></span>
                        </button>
                    </div>
                    <div className={classNames("navbar-menu", { "is-active": this.state.navIsActive })}>
                        <div className="navbar-start">
                            <Link className="navbar-item" to="/random">Random</Link>
                        </div>
                    </div>
                </nav>
                <Route exact path="/" component={() => <Redirect to="/random" />} />
                <Route path="/random" component={Random} />
            </div>
        )
    }
}

export default App
