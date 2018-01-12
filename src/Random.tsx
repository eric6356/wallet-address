import * as React from 'react';

import { randKey } from './utils';
import InputHasCopy from './InputHasCopy';

class State {
    pr: string = '';
    address: string = '';
}

export default class Random extends React.Component<{}, State> {
    constructor(props: {}) {
        super(props);
        this.state = new State();
    }

    componentDidMount() {
        this.newAddress();
    }

    render() {
        return (
            <div className="section">
                <div className="container">
                    <div className="content">
                        <h1>Random Address</h1>
                        <hr />
                        <div className="field is-horizontal">
                            <div className="field-label">
                                <label className="label">Private Key</label>
                            </div>
                            <div className="field-body">
                                <InputHasCopy value={this.state.pr} />
                            </div>
                        </div>
                        <div className="field is-horizontal">
                            <div className="field-label is-normal">
                                <label className="label">Address</label>
                            </div>
                            <div className="field-body">
                                <InputHasCopy value={this.state.address} />
                            </div>
                        </div>

                        <div className="field is-horizontal">
                            <div className="field-label" />
                            <div className="field-body">
                                <div className="field">
                                    <button
                                        className="button is-black"
                                        onClick={() => this.newAddress()}
                                    >
                                        <span className="icon">
                                            <i className="fas fa-sync" />
                                        </span>
                                        <span>New</span>
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    private newAddress() {
        const key = randKey();
        this.setState({ pr: key.privateKey, address: key.address });
    }
}
