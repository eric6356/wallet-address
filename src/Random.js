import React from 'react'

import { randAddress } from './utils'
import InputHasCopy from './InputHasCopy';

export default class Random extends React.Component {
    constructor(props) {
        super(props)
        this.state = randAddress()
    }

    newAddress() {
        this.setState(randAddress())
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
                                <InputHasCopy value={this.state.pr}/>
                            </div>
                        </div>
                        <div className="field is-horizontal">
                            <div className="field-label is-normal">
                                <label className="label">Address</label>
                            </div>
                            <div className="field-body">
                                <InputHasCopy value={this.state.address}/>
                            </div>
                        </div>

                        <div className="field is-horizontal">
                            <div className="field-label"></div>
                            <div className="field-body">
                                <div className="field">
                                    <button className="button is-black" onClick={() => this.newAddress()}>
                                        <span className="icon">
                                            <i className="fas fa-sync"></i>
                                        </span>
                                        <span>New</span>
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}
