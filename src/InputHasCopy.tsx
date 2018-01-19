import * as React from 'react';
import * as Clipboard from 'clipboard';

export interface Props {
    value: string;
}

class State {
    isCopied: boolean = false;
}

class InputHasCopy extends React.Component<Props, State> {
    control: Element;
    input: HTMLInputElement;
    clipboard: Clipboard;
    constructor(props: Props) {
        super(props);
        this.state = new State();
    }

    componentDidMount() {
        const { control, input } = this;

        this.clipboard = new Clipboard(control, {
            target: () => input
        });
    }

    componentWillUnmount() {
        this.clipboard.destroy();
    }

    addressCopied() {
        this.setState({ isCopied: true });
    }

    componentDidUpdate(prevProps: Props) {
        if (this.props.value !== undefined && this.input.value !== this.props.value) {
            this.setState({ isCopied: false });
            this.input.value = this.props.value;
        }
    }

    render() {
        return (
            <div className="field has-addons">
                <div className="control is-expanded">
                    <input
                        type="text"
                        className="input"
                        ref={el => {
                            if (el) {
                                this.input = el;
                            }
                        }}
                        readOnly={true}
                    />
                </div>
                <div
                    className="control"
                    onClick={() => this.copyClicked()}
                    ref={el => {
                        if (el) {
                            this.control = el;
                        }
                    }}
                >
                    <a
                        className="button"
                        style={{
                            display: this.state.isCopied ? 'none' : 'flex'
                        }}
                    >
                        <span className="icon">
                            <i className="fas fa-copy" />
                        </span>
                    </a>
                    <a
                        className="button is-success"
                        style={{
                            display: !this.state.isCopied ? 'none' : 'flex'
                        }}
                    >
                        <span className="icon">
                            <i className="fas fa-check" />
                        </span>
                    </a>
                </div>
            </div>
        );
    }

    private copyClicked() {
        this.setState({ isCopied: true });
    }
}

export default InputHasCopy;
