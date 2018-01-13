import * as React from 'react';
import CoinSwitcher from './CoinSwitcher';

const Content: React.SFC<{ title: string }> = props => {
    return (
        <div className="section">
            <div className="container">
                <div className="content">
                    <h1>
                        {props.title}
                        <span className="is-pulled-right">
                            <CoinSwitcher />
                        </span>
                    </h1>
                    <hr />
                    {props.children}
                </div>
            </div>
        </div>
    );
};

export default Content;
