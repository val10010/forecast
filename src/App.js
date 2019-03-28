import React, { Component } from 'react';
import Main from './components/main';
import Forecast from './components/forecast';
import './App.css';
import {BrowserRouter, Route} from 'react-router-dom';

class App extends Component {

    render() {
        return (
        <BrowserRouter>
            <div className="main">
              <Route exact path='/' component={Main} />
              <Route exact path='/forecast' component={Forecast} /> 
            </div>
            
        </BrowserRouter>
        )
        
    }
}



export default App;