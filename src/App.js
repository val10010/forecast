import React, { Component } from "react";
import Main from "./components/main";
import Forecast from "./components/forecast";
import "./App.css";
import { BrowserRouter, Route, Switch } from "react-router-dom";

class App extends Component {
  render() {
    return (
      <BrowserRouter basename={process.env.PUBLIC_URL}>
        <>
          <section class="fog">
            <figure
              class="absolute-bg"
              style={{backgroundImage: 'url("/1600x900")'}}
            />
            <div class="fog__container">
              <div class="fog__img fog__img--first" />
              <div class="fog__img fog__img--second" />
            </div>
          </section>
          <div className="main">
            <Switch>
              <Route exact path="/" component={Main} />
              <Route exact path="/forecast-for-7day" component={Forecast} />
            </Switch>
          </div>
        </>
      </BrowserRouter>
    );
  }
}

export default App;
