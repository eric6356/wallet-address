import React from 'react'
import PropTypes from 'prop-types'
import Clipboard from 'clipboard'

class InputHasCopy extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            isCopied: false
        }
    }

    copyClicked() {
        this.setState({ isCopied: true })
    }

    componentDidMount() {
        const { control, input } = this;

        this.clipboard = new Clipboard(
            control, {
                target: () => input
            }
        )
    }

    componentWillUnmount() {
        this.props.clipboard.destroy()
    }

    addressCopied() {
        this.setState({ isCopied: true })
    }

    componentDidUpdate(prevProps) {
        if (prevProps.value !== this.props.value) {
            this.setState({isCopied: false})
        }
    }

    render() {
        return (
            <div className="field has-addons">
                <div className="control is-expanded">
                    <input
                        type="text"
                        className="input"
                        value={this.props.value}
                        ref={el => { this.input = el }}
                        readOnly
                    />
                </div>
                <div
                    className="control"
                    onClick={() => this.copyClicked()}
                    ref={el => { this.control = el }}
                >
                    <a
                        className="button"
                        style={{ display: this.state.isCopied ? "none" : "flex" }}
                    >
                        <span className="icon">
                            <i className="fas fa-copy"></i>
                        </span>
                    </a>
                    <a
                        className="button is-success"
                        style={{ display: !this.state.isCopied ? "none" : "flex" }}

                    >
                        <span className="icon">
                            <i className="fas fa-check"></i>
                        </span>
                    </a>
                </div>
            </div>
        )

    }
}

InputHasCopy.propTypes = {
    value: PropTypes.string.isRequired
}

export default InputHasCopy
