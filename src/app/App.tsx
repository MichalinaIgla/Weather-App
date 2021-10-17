import React, { Component, Suspense } from "react";

import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";

import MapWeather from "../pages/MapWeather";
import Home from "../pages/Home";
const Loader = () => {
  return <div>loading...</div>;
};

const App = () => {
  return (
    <Router>
      <Suspense fallback={<Loader />}>
        <Switch>
          <Route path="/map" component={MapWeather}></Route>
          <Route path="/" component={Home}></Route>
        </Switch>
      </Suspense>
    </Router>
  );
};

export default App;
