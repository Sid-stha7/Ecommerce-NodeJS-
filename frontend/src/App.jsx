import React from 'react';

import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Footer from './components/footer';
import Header from './components/header';
import Home from './components/home';
import Login from './components/user/login';
import './App.css';
import ProductDetails from './components/products/ProductDetails';

import Cart from './components/cart/cart';
import Shipping from './components/cart/shipping';
import ConfirmOrder from './components/cart/ConfirmOrder';
import OrderSuccess from './components/cart/orderSuccess';
import Payment from './components/cart/payment';
import ListOrders from './components/order/ListOrders';
import OrderDetails from './components/order/orderDetails';

import Register from './components/user/register';
import { loadUser } from './components/action/userActions';
import store from './store';
import { useEffect } from 'react';
import Profile from './components/user/profile';

import ProtectedRoute from './components/route/protectedRoute';
import UpdateProfile from './components/user/UpdateProfile';
import UpdatePassword from './components/user/updatePassword';
import { useState } from 'react';
import axios from 'axios';
import { loadStripe } from '@stripe/stripe-js';
import { Elements } from '@stripe/react-stripe-js';

//admin
import Slidebar from './components/admin/Slidebar';
import Dashboard from './components/admin/Dashboard';
import ProductList from './components/admin/productList';
import NewProduct from './components/admin/newProduct';
import { useSelector } from 'react-redux';
import UpdateProduct from './components/admin/UpdateProduct';
import OrdersList from './components/admin/OrderList';
import ProcessOrder from './components/admin/ProcessOrder';

function App() {
  useEffect(() => {
    store.dispatch(loadUser());
  }, []);

  const { user, loading } = useSelector((state) => state.auth);
  return (
    <BrowserRouter>
      <div className="App">
        <Header />
        <div className="container-fluid container">
          <Switch>
            <Route exact path="/" component={Home} />
            <Route path="/login" component={Login} />
            <Route path="/register" component={Register} />
            <ProtectedRoute exact path="/me" component={Profile} />
            <ProtectedRoute exact path="/orders/me" component={ListOrders} />
            <ProtectedRoute exact path="/order/:id" component={OrderDetails} />
            <ProtectedRoute
              exact
              path="/password/update"
              component={UpdatePassword}
            />
            <Route exact path="/me/update" component={UpdateProfile} />
            <Route path="/search/:keyword" component={Home} />
            <Route exact path="/cart" component={Cart} />
            <ProtectedRoute exact path="/shipping" component={Shipping} />
            <ProtectedRoute path="/confirm" component={ConfirmOrder} exact />
            <ProtectedRoute path="/success" component={OrderSuccess} />
            {/* //TODO Route for payment */}

            <ProtectedRoute path="/payment" component={Payment} />

            <ProtectedRoute
              exact
              path="/password/update"
              component={UpdatePassword}
            />
            <Route exact path="/product/:id" component={ProductDetails} />
          </Switch>
        </div>
        <ProtectedRoute
          exact
          path="/dashboard"
          isAdmin={true}
          component={Dashboard}
        />
        <ProtectedRoute
          exact
          path="/admin/products"
          isAdmin={true}
          component={ProductList}
        />

        <ProtectedRoute
          exact
          path="/admin/product"
          isAdmin={true}
          component={NewProduct}
        />

        <ProtectedRoute
          exact
          path="/admin/product/:id"
          isAdmin={true}
          component={UpdateProduct}
        />
        <ProtectedRoute
          path="/admin/orders"
          isAdmin={true}
          component={OrdersList}
          exact
        />
        <ProtectedRoute
          path="/admin/order/:id"
          isAdmin={true}
          component={ProcessOrder}
          exact
        />
        <Footer />
      </div>
    </BrowserRouter>
  );
}

export default App;
