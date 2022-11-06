import React, { Fragment, useEffect } from 'react';

import MetaData from '../MetaData';
import CheckoutSteps from './checkOutSteps';

import { useAlert } from 'react-alert';
import { useDispatch, useSelector } from 'react-redux';
import { createOrder, clearErrors } from '../action/orderActions';

import axios from 'axios';

const Payment = ({ history }) => {
  const alert = useAlert();

  const dispatch = useDispatch();

  const { user } = useSelector((state) => state.auth);
  const { cartItems, shippingInfo } = useSelector((state) => state.cart);
  const { error } = useSelector((state) => state.newOrder);

  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }
  }, [dispatch, alert, error]);

  const order = {
    orderItems: cartItems,
    shippingInfo,
  };

  const orderInfo = JSON.parse(sessionStorage.getItem('orderInfo'));
  if (orderInfo) {
    order.itemsPrice = orderInfo.itemsPrice;
    order.shippingPrice = orderInfo.shippingPrice;
    order.taxPrice = orderInfo.taxPrice;
    order.totalPrice = orderInfo.totalPrice;
  }

  const submitHandler = async (e) => {
    e.preventDefault();

    document.querySelector('#pay_btn').disabled = true;

    try {
      dispatch(createOrder(order));

      history.push('/success');
    } catch (error) {
      document.querySelector('#pay_btn').disabled = false;
      alert.error(error.response.data.message);
    }
  };

  return (
    <Fragment>
      <MetaData title={'Payment'} />

      <CheckoutSteps shipping confirmOrder payment />

      <div className="row wrapper">
        <div className="col-10 col-lg-5">
          <form className="shadow-lg" onSubmit={submitHandler}>
            <h1 className="mb-4">{`Your total amount is $${
              orderInfo && orderInfo.totalPrice
            }`}</h1>

            <button id="pay_btn" type="submit" className="btn btn-block py-3">
              Order!
            </button>
          </form>
        </div>
      </div>
    </Fragment>
  );
};

export default Payment;
