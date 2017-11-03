import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import {Switch , BrowserRouter ,Route} from 'react-router-dom'
import Test from './component/test'


ReactDOM.render(

    <BrowserRouter>
    <App>
        <Switch>
            <Route path="/test" component={Test}/>
        </Switch>
    </App>
    </BrowserRouter>


, document.getElementById('root'));
registerServiceWorker();
