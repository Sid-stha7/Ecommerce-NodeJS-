import React from 'react';

import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Footer from './components/footer';
import Header from './components/header';
import Home from './components/home';

import './App.css';
import ProductDetails from './components/products/ProductDetails';

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Header />
        <div className="container-fluid container">
          <Switch>
            <Route exact path="/" component={Home} />
            <Route exact path="/product/:id" component={ProductDetails} />
          </Switch>
        </div>
        <Footer />
      </div>
    </BrowserRouter>
  );
}

export default App;
