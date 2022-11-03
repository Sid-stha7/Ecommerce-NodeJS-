import React from 'react';

import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Footer from './components/layouts/footer';
import Header from './components/layouts/header';
import Home from './components/layouts/home';
import './App.css';
function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Header />
        <div className="container-fluid container">
          <Switch>
            <Route path="/" component={Home}></Route>
          </Switch>
        </div>
        <Footer />
      </div>
    </BrowserRouter>
  );
}

export default App;
