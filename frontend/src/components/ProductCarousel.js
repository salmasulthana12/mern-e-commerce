import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import Loader from "./loader/Loader";
import Message from "./Message";
import { listTopProducts } from "../actions/productActions";

const ProductCarousel = () => {
  const dispatch = useDispatch();

  const productTopRated = useSelector((state) => state.productTopRated);
  const { loading, error, products } = productTopRated;

  useEffect(() => {
    dispatch(listTopProducts());
  }, [dispatch]);

  return (
    <>
      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant="danger">{error}</Message>
      ) : (
        <div
          id="carouselExampleDark"
          className="carousel  slide"
          data-bs-ride="carousel"
        >
          <ol className="carousel-indicators">
            {products.map((_, index) => (
              <li
                key={index}
                data-bs-target="#carouselExampleDark"
                data-bs-slide-to={index}
                className={index === 0 ? "active" : ""}
              ></li>
            ))}
          </ol>

          <div className="carousel-inner">
            {products.map((product, index) => (
              <div
                className={`carousel-item ${index === 0 ? "active" : ""}`}
                key={product._id}
              >
                <Link to={`/product/${product._id}`}>
                  <img
                    src={product.image}
                    alt={product.name}
                    className="d-block w-100"
                  />
                  <div className="carousel-caption d-none d-md-block">
                    <h2>
                      {product.name} (${product.price})
                    </h2>
                  </div>
                </Link>
              </div>
            ))}
          </div>

          <a
            className="carousel-control-prev"
            href="#carouselExampleDark"
            role="button"
            data-bs-slide="prev"
          >
            <span className="carousel-control-prev-icon" aria-hidden="true"></span>
            <span className="visually-hidden">Previous</span>
          </a>
          <a
            className="carousel-control-next"
            href="#carouselExampleDark"
            role="button"
            data-bs-slide="next"
          >
            <span className="carousel-control-next-icon" aria-hidden="true"></span>
            <span className="visually-hidden">Next</span>
          </a>
        </div>
      )}
    </>
  );
};

export default ProductCarousel;
