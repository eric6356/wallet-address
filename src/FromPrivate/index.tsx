import * as React from 'react';
import { connect } from 'react-redux';
import * as classNames from 'classnames';

import InputHasCopy from '../InputHasCopy';
import { accountFromPrivate } from '../utils';
import Content from '../Content';
import { RootState } from '../store';

interface Props {
    coinName: string;
}

type State = {
    pr: string;
    address: string;
    isTouched: boolean;
    isStartsWith0x: boolean;
    isRightChar: boolean;
};

class FromPrivateComponent extends React.Component<Props, State> {
    state: State = {
        pr: '',
        address: '',
        isTouched: false,
        isStartsWith0x: false,
        isRightChar: false
    };

    handleChange(event: React.ChangeEvent<HTMLInputElement>) {
        this.setState({ isTouched: true });
        const pr = event.target.value;
        const updater = {
            isTouched: true,
            isStartsWith0x: pr.startsWith('0x'),
            isRightChar: /0x[a-fA-F0-9]{64}/.test(pr),
            pr
        };
        this.setState(updater);
    }

    isValid() {
        return this.state.isStartsWith0x && this.state.isRightChar;
    }

    render() {
        return (
            <Content title="Address From Private Key">
                <div className="field is-horizontal">
                    <div className="field-label">
                        <label className="label">Private Key</label>
                    </div>
                    <div className="field-body">
                        <div className="field">
                            <div className="control">
                                <input
                                    type="text"
                                    className={classNames('input', {
                                        'is-danger': this.state.isTouched && !this.isValid()
                                    })}
                                    value={this.state.pr}
                                    onChange={e => this.handleChange(e)}
                                />
                            </div>
                            {this.state.isTouched &&
                                !this.state.isStartsWith0x && (
                                    <p className="help is-danger is-marginless">
                                        Private key must starts with <code>0x</code>
                                    </p>
                                )}
                            {this.state.isTouched &&
                                !this.state.isRightChar && (
                                    <p className="help is-danger is-marginless">
                                        Private key must be 64 characters HEX string
                                    </p>
                                )}
                        </div>
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
                                disabled={!this.isValid()}
                                className="button is-black"
                                onClick={() => this.fromPrivate()}
                            >
                                {/* <span className="icon">
                                    <i className="fas fa-exchange-alt fa-rotate-90" />
                                </span> */}
                                <span>Generate</span>
                            </button>
                        </div>
                    </div>
                </div>
            </Content>
        );
    }

    private fromPrivate() {
        const account = accountFromPrivate(this.props.coinName, this.state.pr);
        this.setState({ pr: account.privateKey, address: account.address });
    }
}

const FromPrivate = connect((state: RootState) => ({
    coinName: state.coinSwitcher.coinName
}))(FromPrivateComponent);

export default FromPrivate;
