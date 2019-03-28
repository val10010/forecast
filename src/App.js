import React, { Component } from 'react';
import Main from './components/main';
import Forecast from './components/forecast';
import './App.css';
import {BrowserRouter, Route, Switch} from 'react-router-dom';

class App extends Component {

    render() {
        return (
        <BrowserRouter basename={process.env.PUBLIC_URL}>
            <div className="main">
            <Switch>
              <Route exact path='/' component={Main} />
              <Route exact path='/forecast-for-5day' component={Forecast} /> 
            </Switch>
            </div>
        </BrowserRouter>
        )
        
    }
}



export default App;