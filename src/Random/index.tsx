import * as React from 'react';
import { connect } from 'react-redux';

import { createAccount } from '../utils';
import Content from '../Content';
import InputHasCopy from '../InputHasCopy';
import { RootState } from '../store';

interface Props {
    coinName: string;
}

type State = {
    pr: string;
    address: string;
};

class RandomComponent extends React.Component<Props, State> {
    state: State = {
        pr: '',
        address: ''
    };

    componentDidMount() {
        this.newAccount();
    }

    componentDidUpdate(prevProps: Props) {
        if (prevProps.coinName !== this.props.coinName) {
            this.newAccount();
        }
    }

    render() {
        return (
            <Content title="Random Address">
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
                            <button className="button is-black" onClick={() => this.newAccount()}>
                                {/* <span className="icon">
                                    <i className="fas fa-sync" />
                                </span> */}
                                <span>Generate</span>
                            </button>
                        </div>
                    </div>
                </div>
            </Content>
        );
    }

    private newAccount() {
        const account = createAccount(this.props.coinName);
        this.setState({ pr: account.privateKey, address: account.address });
    }
}

const Random = connect((state: RootState) => ({
    coinName: state.coinSwitcher.coinName
}))(RandomComponent);

export default Random;
