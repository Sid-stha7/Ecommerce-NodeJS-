import React from 'react';

import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Footer from './components/footer';
import Header from './components/header';
import Home from './components/home';

import './App.css';

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Header />
        <div className="container-fluid container">
          <Switch>
            <Route path="/" component={Home} exact></Route>
          </Switch>
        </div>
        <Footer />
      </div>
    </BrowserRouter>
  );
}

export default App;
