import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import {Switch , BrowserRouter ,Route} from 'react-router-dom'
import Test from './component/test'
import {routerRedux} from 'react-router-redux'
//const { ConnectedRouter } = routerRedux

ReactDOM.render(

    <Router>
    <App>
        <Switch>
            <Route path="/test" component={Test}/>
        </Switch>
    </App>
    </Router>


, document.getElementById('root'));
registerServiceWorker();
