import * as React from 'react';
import { connect } from 'react-redux';

import InputHasCopy from '../InputHasCopy';
import Content from '../Content';
import { RootState } from '../store';
import { accountFromPhrase } from '../utils';

interface Props {
    coinName: string;
}

type State = {
    phrase: string;
    phrase2: string;
    showPhrase: boolean;
    hashRepeat: number;
    isTouched: boolean;
    privateKey: string;
    address: string;
};

class BrainWalletComponent extends React.Component<Props, State> {
    state: State = {
        phrase: '',
        phrase2: '',
        showPhrase: false,
        hashRepeat: 1,
        isTouched: false,
        privateKey: '',
        address: ''
    };

    flipShowPhrase() {
        this.setState({ showPhrase: !this.state.showPhrase });
    }

    phraseChanged(e: React.ChangeEvent<HTMLInputElement>) {
        this.setState({ phrase: e.target.value });
    }

    phrase2Changed(e: React.ChangeEvent<HTMLInputElement>) {
        this.setState({ isTouched: true, phrase2: e.target.value });
    }

    hashRepeatChange(e: React.ChangeEvent<HTMLInputElement>) {
        this.setState({ hashRepeat: Math.max(parseInt(e.target.value, 10), 1) });
    }

    isValid() {
        return this.state.phrase.length > 0 && (this.state.showPhrase || this.state.phrase === this.state.phrase2);
    }

    fromPhrase() {
        const account = accountFromPhrase(this.props.coinName, this.state.phrase, this.state.hashRepeat);
        this.setState({ ...account });
    }

    render() {
        return (
            <Content title="Create Yoru Brain Wallet Address">
                <div className="field is-horizontal">
                    <div className="field-label">
                        <label className="label">Phrase</label>
                    </div>
                    <div className="field-body">
                        <div className="field">
                            <div className="control">
                                <input
                                    type={this.state.showPhrase ? 'text' : 'password'}
                                    className="input"
                                    value={this.state.phrase}
                                    onChange={e => this.phraseChanged(e)}
                                />
                            </div>
                        </div>
                    </div>
                </div>

                {!this.state.showPhrase && (
                    <div className="field is-horizontal">
                        <div className="field-label">
                            <label className="label">Repeat Phrase</label>
                        </div>
                        <div className="field-body">
                            <div className="field">
                                <div className="control">
                                    <input
                                        type="password"
                                        className="input"
                                        name="phrase2"
                                        value={this.state.phrase2}
                                        onChange={e => this.phrase2Changed(e)}
                                    />
                                </div>
                                {this.state.isTouched &&
                                    this.state.phrase !== this.state.phrase2 && (
                                        <p className="help is-danger is-marginless">Phrase mismatch</p>
                                    )}
                            </div>
                        </div>
                    </div>
                )}

                <div className="field is-horizontal">
                    <div className="field-label">
                        <label className="label">Show Phrase</label>
                    </div>
                    <div className="field-body">
                        <div className="field">
                            <div className="control">
                                <label className="checkbox">
                                    <input
                                        type="checkbox"
                                        id="showPhrase"
                                        onChange={() => this.flipShowPhrase()}
                                        checked={this.state.showPhrase}
                                    />
                                    <span style={{ paddingLeft: '5px' }}>
                                        {this.state.showPhrase ? 'Phrase is shown' : 'Phrase is hidden'}
                                    </span>
                                </label>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="field is-horizontal">
                    <div className="field-label">
                        <label htmlFor="showPhrase" className="label">
                            Hash Repeat
                        </label>
                    </div>
                    <div className="field-body">
                        <div className="field">
                            <div className="control">
                                <input
                                    type="number"
                                    className="input"
                                    value={this.state.hashRepeat}
                                    onChange={e => this.hashRepeatChange(e)}
                                />
                            </div>
                        </div>
                    </div>
                </div>

                <div className="field is-horizontal">
                    <div className="field-label">
                        <label htmlFor="showPhrase" className="label">
                            Algrorithm
                        </label>
                    </div>
                    <div className="field-body">
                        <div className="field">
                            <div className="control">
                                <input
                                    type="text"
                                    className="input"
                                    value={Array(Math.max(1, this.state.hashRepeat))
                                        .fill(0)
                                        .reduce(s => `SHA256(${s})`, '${Phrase}')}
                                    readOnly={true}
                                />
                            </div>
                        </div>
                    </div>
                </div>

                <div className="field is-horizontal">
                    <div className="field-label" />
                    <div className="field-body">
                        <div className="field">
                            <button
                                disabled={!this.isValid()}
                                className="button is-black"
                                onClick={() => this.fromPhrase()}
                            >
                                {/* <span className="icon">
                                    <i className="fas fa-exchange-alt fa-rotate-90" />
                                </span> */}
                                <span>Generate</span>
                            </button>
                        </div>
                    </div>
                </div>

                <div className="field is-horizontal">
                    <div className="field-label">
                        <label className="label">Private Key</label>
                    </div>
                    <div className="field-body">
                        <InputHasCopy value={this.state.privateKey} />
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
            </Content>
        );
    }
}

const BrainWallet = connect((state: RootState) => ({
    coinName: state.coinSwitcher.coinName
}))(BrainWalletComponent);

export default BrainWallet;
