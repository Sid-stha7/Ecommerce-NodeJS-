import React from 'react';
import { useEffect } from 'react';
import { Fragment } from 'react';
import { useAlert } from 'react-alert';
import { useDispatch, useSelector } from 'react-redux';

import Loader from './loader';

import MetaData from './MetaData';

import Pagination from 'react-js-pagination';
import { useState } from 'react';
import { getProducts } from './action/productActions';
import Product from './products/Product';

const Home = ({ match }) => {
  const [currentPage, setCurrentPage] = useState();

  //  TODO for future features for filter

  // const [category, setCategory] = useState('');
  // const categories = [
  //   'Electronics',
  //   'Cameras',
  //   'Laptops',
  //   'Accessories',
  //   'Headphones',
  //   'Food',
  //   'Books',
  //   'Clothes/Shoes',
  //   'Beauty/Health',
  //   'Sports',
  //   'Outdoor',
  //   'Home',
  // ];
  const dispatch = useDispatch();
  const alert = useAlert();
  // const alert = useAlert();
  const { loading, products, error, productCount, resPerPage } = useSelector(
    (state) => state.products
  );

  const keyword = match.params.keyword;
  useEffect(() => {
    if (error) {
      return alert.error(error);
    } else {
      alert.success('success');
    }
    dispatch(getProducts(keyword, currentPage));
  }, [dispatch, alert, error, keyword, currentPage]);

  function setCurrentPageNo(pageNumber) {
    setCurrentPage(pageNumber);
  }
  return (
    <Fragment>
      {loading ? (
        <Loader />
      ) : (
        <Fragment>
          <MetaData title={'Buy Best Products Online'} />
          <h1 id="products_heading">Latest Products</h1>

          <section id="products" class="container mt-5">
            <div class="row">
              <div className="d-flex">
                <hr className="my-5" />

                <div className="mt-5">
                  {/* <h4 className="mb-3">Categories</h4> */}

                  {/* <ul className="pl-0">
                    {categories.map((category) => (
                      <li
                        style={{
                          cursor: 'pointer',
                          listStyleType: 'none',
                        }}
                        key={category}
                        onClick={() => setCategory(category)}
                      >
                        {category}
                      </li>
                    ))}
                  </ul> */}
                </div>

                <div className="row">
                  {products &&
                    products.map((product) => (
                      <Product key={product._id} product={product} />
                    ))}
                </div>
              </div>
            </div>
          </section>
          {resPerPage <= productCount && (
            <div className="d-flex justify-content-center mt-5">
              <Pagination
                activePage={currentPage}
                itemsCountPerPage={resPerPage}
                totalItemsCount={productCount}
                onChange={setCurrentPageNo}
                nextPageText={'Next'}
                prevPageText={'Prev'}
                firstPageText={'First'}
                lastPageText={'Last'}
                itemClass="page-item"
                linkClass="page-link"
              />
            </div>
          )}
        </Fragment>
      )}
    </Fragment>
  );
};

export default Home;
