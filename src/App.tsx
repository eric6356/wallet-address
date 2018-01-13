import * as React from 'react';
import { Redirect, Route, HashRouter } from 'react-router-dom';

import Random from './Random';
import FromPrivate from './FromPrivate';
import Nav from './Nav';

export const App: React.SFC = () => (
    <HashRouter>
        <div>
            <Nav />
            <Route exact={true} path="/" component={() => <Redirect to="/random" />} />
            <Route path="/random" component={Random} />
            <Route path="/from-private" component={FromPrivate} />
        </div>
    </HashRouter>
);
