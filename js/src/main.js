import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { Router, Route, IndexRoute, hashHistory  } from 'react-router'
import App from './Containers/App';
import Play from './Containers/Play';
import History from './Containers/History';
import Historic from './Containers/Historic';
import store from './store';
import Menu from './Containers/Menu'
import PreWorkout from './Containers/PreWorkout';
import Templates from './Containers/Templates';
import Template from './Containers/Template';

render((
    <Provider store={store}>
        <Router history={hashHistory}>
            <Route path="/" component={App}>
                <IndexRoute component={Menu}/>
                <Route path="menu" component={Menu}/>
                <Route path="setup/:players" component={PreWorkout}/>
                <Route path="play/:players" component={Play}/>
                <Route path="history" component={History}/>
                <Route path="historic/:timestamp" component={Historic}/>
                <Route path="templates/:backTo">
                    <IndexRoute component={Templates}/>
                    <Route path="create" component={Template}/>
                    <Route path="edit/:template" component={Template}/>
                </Route>
            </Route>

        </Router>
    </Provider>
), document.getElementById('app'));