import React from "react";
import { Link } from "react-router-dom";
import Rating from "./Rating";

const product = (props) => {
  const { product } = props;
  return (
    <>
      <div className="card" style={{ height: "23rem", color: "black" }}>
        <div className="card-body">
          <Link to={`/product/${product._id}`}>
            <img src={product.image} className="card-img-top" alt="..." />
          </Link>
          <Link to={`/product/${product._id}`}>
            <div className="card-title">{product.name}</div>
            {/* <p className="card-text">
            {product.rating} from {product.numReviews} reviews
          </p> */}
            <div>
              <Rating
                value={product.rating}
                text={`${product.numReviews} reviews`}
              />
            </div>
            <div>
              <p>
                <strong>${product.price}</strong>
              </p>
            </div>
          </Link>
        </div>
      </div>
    </>
  );
};

export default product;
