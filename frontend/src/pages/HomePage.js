import React, { useEffect } from "react";
import Product from "../components/product";
import { useDispatch, useSelector } from "react-redux";
import { listProducts } from "../actions/productActions";
import Message from "../components/Message";
import Loader from "../components/loader/Loader";
import { useParams,Link } from "react-router-dom";
import Paginate from "../components/Paginate";
import ProductCarousel from "../components/ProductCarousel";
import Meta from "../components/Meta";

const HomePage = () => {
  const {keyword}=useParams()
  const { pageNumber } = useParams();
  const pageNumbers = Number(pageNumber) || 1;
  const dispatch = useDispatch();
  const productList = useSelector((state) => state.productList);
  const { loading, products, error,page,pages } = productList;

  useEffect(() => {
    dispatch(listProducts(keyword,pageNumbers));
  }, [dispatch,keyword,pageNumbers]);

  return (
    <>
    <Meta/>
      <div className="row my-3 mt-8">

      {!keyword ? (
        <ProductCarousel/>
      ) : (
        <Link to='/' className='btn btn-light'>
          Go Back
        </Link>
      )}
        <h3>Latest Products</h3>
        {loading ? (
          <Loader />
        ) : error ? (
          <Message color="danger">{error}</Message>
        ) : (
          <>
            < >
            {products?.map((item) => (
              <div
                className="col-xl-3 col-lg-4 col-md-6 col-sm-12 my-2"
                key={item._id}
              >
                <Product product={item} />
              </div>
            ))}
            </>
            <Paginate
            pages={pages}
            page={page}
            keyword={keyword ? keyword : ''}
          />
          </>
        )}
      </div>
    </>
  );
};

export default HomePage;
