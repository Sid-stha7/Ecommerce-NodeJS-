import React, { Fragment } from 'react';
import { Link } from 'react-router-dom';
import Loader from '../loader';
import MetaData from '../MetaData';

import { useAlert } from 'react-alert';
import { useDispatch, useSelector } from 'react-redux';
import { getProductDetails, clearErrors } from '../action/productActions';
import { addItemToCart, removeItemFromCart } from '../action/cartActions';

const Cart = ({ history }) => {
  const dispatch = useDispatch();

  const { cartItems } = useSelector((state) => state.cart);
  const removeCartItemHandler = (id) => {
    dispatch(removeItemFromCart(id));
  };
  const checkoutHandler = () => {
    history.push('/login?redirect=shipping');
  };
  return (
    <Fragment>
      <MetaData title="Cart Items"></MetaData>
      {cartItems.length === 0 ? (
        <h2 className="mt-5">Cart is empty!</h2>
      ) : (
        <Fragment>
          <h2 class="mt-5">
            Your Cart: <b>{cartItems.length}</b>
          </h2>

          <div class="row d-flex justify-content-between">
            <div class="col-12 col-lg-8">
              {cartItems.map((item) => (
                <Fragment>
                  <hr />
                  <div class="cart-item">
                    <div class="row">
                      <div class="col-4 col-lg-3">
                        <img
                          src={item.image}
                          alt="Laptop"
                          height="90"
                          width="115"
                        />
                      </div>

                      <div class="col-5 col-lg-3">
                        <Link to={`/product/${item.product} `}>
                          {item.name}
                        </Link>
                      </div>

                      <div class="col-4 col-lg-2 mt-4 mt-lg-0">
                        <p id="card_item_price">${item.price}</p>
                      </div>

                      <div class="col-4 col-lg-3 mt-4 mt-lg-0">
                        <div class="stockCounter d-inline">
                          <span class="btn btn-danger minus">-</span>
                          <input
                            type="number"
                            class="form-control count d-inline"
                            value="1"
                            readOnly
                          />

                          <span class="btn btn-primary plus">+</span>
                        </div>
                      </div>

                      <div class="col-4 col-lg-1 mt-4 mt-lg-0">
                        <i
                          id="delete_cart_item"
                          class="fa fa-trash btn btn-danger"
                          onClick={() => removeCartItemHandler(item.product)}
                        ></i>
                      </div>
                    </div>
                  </div>
                </Fragment>
              ))}

              <hr />
            </div>

            <div class="col-12 col-lg-3 my-4">
              <div id="order_summary">
                <h4>Order Summary</h4>
                <hr />
                <p>
                  Subtotal: <span class="order-summary-values">3 (Units)</span>
                </p>
                <p>
                  Est. total: <span class="order-summary-values">$765.56</span>
                </p>

                <hr />
                <button
                  id="checkout_btn"
                  class="btn btn-primary btn-block"
                  onClick={checkoutHandler}
                >
                  Check out
                </button>
              </div>
            </div>
          </div>
        </Fragment>
      )}
    </Fragment>
  );
};

export default Cart;
