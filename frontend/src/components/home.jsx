import React from 'react';
import { useEffect } from 'react';
import { Fragment } from 'react';
import { useAlert } from 'react-alert';
import { useDispatch, useSelector } from 'react-redux';

// import Loader from './loader';

import MetaData from './MetaData';

import Pagination from 'react-js-pagination';
import { useState } from 'react';
import { getProducts } from './action/productActions';
import Product from './products/Product';

const Home = () => {
  // const [currentPage, setCurrentPage] = useState();
  const dispatch = useDispatch();

  // const alert = useAlert();
  const { loading, products, error, productCount } = useSelector(
    (state) => state.products
  );

  useEffect(() => {
    dispatch(getProducts());
  }, [dispatch]);

  return (
    <Fragment>
      <MetaData title={'Buy Best Products Online'} />
      <h1 id="products_heading">Latest Products</h1>

      <section id="products" class="container mt-5">
        <div class="row">
          {products &&
            products.map((product) => (
              <Product key={product._id} product={product} />
            ))}
        </div>
      </section>
    </Fragment>
  );
};

export default Home;
