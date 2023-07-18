import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import Rating from "../components/Rating";
import { useDispatch, useSelector } from "react-redux";
import Loader from "../components/loader/Loader";
import Message from "../components/Message";
import { useNavigate } from "react-router-dom";
import { addToCart } from "../actions/cartActions";
import {
  listProductDetails,
  createProductReview,
} from '../actions/productActions'
import { PRODUCT_CREATE_REVIEW_RESET } from '../constants/productConstants'
import Meta from "../components/Meta";

const ProductPage = () => {
  const { id } = useParams();
  const [qty, setQty] = useState(1);
  const [rating, setRating] = useState(0)
  const [comment, setComment] = useState('')
  const navigate = useNavigate();

  const dispatch = useDispatch();
  const productDetails = useSelector((state) => state.productDetails);
  const { loading, product, error } = productDetails;

  const userLogin = useSelector((state) => state.userLogin)
  const { userInfo } = userLogin

  const productReviewCreate = useSelector((state) => state.productReviewCreate)
  const {
    success: successProductReview,
    loading: loadingProductReview,
    error: errorProductReview,
  } = productReviewCreate

   useEffect(() => {
    if (successProductReview) {
      setRating(0);
      setComment('');
      dispatch(listProductDetails(id));
      dispatch({ type: PRODUCT_CREATE_REVIEW_RESET });
    }
    if (!product._id || product._id !== id) {
      dispatch(listProductDetails(id))
      dispatch({ type: PRODUCT_CREATE_REVIEW_RESET })
    }
  }, [dispatch, id, successProductReview, product])

  const handleAddToCart = () => {
    dispatch(addToCart(id, qty));
    navigate(`/cart/${id}?qty=${qty}`);
  };

  const submitHandler = (e) => {
    e.preventDefault()
    dispatch(
      createProductReview(id, {
        rating,
        comment,
      })
    )
  }
  

  return (
    <>
      <Link className="btn btn-light my-3" to="/">
        Go back
      </Link>
      {loading ? (
        <Loader />
      ) : error ? (
        <Message>{error}</Message>
      ) : (
        <>
        <Meta title={product.name}/>
        <div className="row ">
          <div className="col-md-6">
            <img src={product.image} className="img-fluid" alt={product.name} />
          </div>
          <div className="col-md-3">
            <ul className="list-group">
              <li className="list-group-item">
                <h5>{product.name}</h5>
              </li>
              <li className="list-group-item">
                <Rating
                  value={product.rating}
                  text={`${product.numReviews} reviews`}
                />
              </li>
              <li className="list-group-item">Price: ${product.price}</li>
              <li className="list-group-item">{product.description}</li>
            </ul>
          </div>
          <div className="col-md-3">
            <div className="card" style={{ width: "15rem" }}>
              <ul className="list-group">
                <li className="list-group-item d-flex">
                  <div className="col-6">Price :</div>
                  <div className="col-6">${product.price}</div>
                </li>
                <li className="list-group-item d-flex">
                  <div className="col-6">Status :</div>
                  <div className="col-6">
                    {product.countInStock > 0 ? "In Stock" : "Out of Stock"}
                  </div>
                </li>
                <li className="list-group-item d-flex">
                  <div className="col-6">Qty :</div>
                  <div className="col-6">
                    {product.countInStock > 0 && (
                      <select
                        className="form-select"
                        aria-label="Default select example"
                        value={qty}
                        onChange={(e) => setQty(e.target.value)}
                      >
                        {Array.from(
                          { length: product.countInStock },
                          (x, index) => (
                            <option key={index + 1} value={index + 1}>
                              {index + 1}
                            </option>
                          )
                        )}
                      </select>
                    )}
                  </div>
                </li>
                <li className="list-group-item text-center">
                  <button
                    className="btn btn-dark"
                    onClick={handleAddToCart}
                    disabled={product.countInStock === 0}
                  >
                    Add To Cart
                  </button>
                </li>
              </ul>
            </div>
          </div>
        </div>
        <div className="row">
            <div className="col-md-6">
              <h2>Reviews</h2>
              {product && product.reviews && product.reviews.length === 0 && <Message color="info">No Reviews</Message>}
              <ul>
                {product.reviews &&product.reviews.map((review) => (
                  <li key={review._id}>
                    <strong>{review.name}</strong>
                    <Rating value={review.rating} />
                    <p>{review.createdAt.substring(0, 10)}</p>
                    <p>{review.comment}</p>
                  </li>
                ))}
                <li>
                  <h2>Write a Customer Review</h2>
                  {successProductReview && (
                    <Message color='success'>
                      Review submitted successfully
                    </Message>
                  )}
                  {loadingProductReview && <Loader />}
                  {errorProductReview && (
                    <Message color='danger'>{errorProductReview}</Message>
                  )}
                  {userInfo ? (
                    <form onSubmit={submitHandler}>
                      <div className="mb-3">
                        <label htmlFor="rating" className="form-label">Rating</label>
                        <select
                          className="form-select" aria-label="rating"
                          value={rating}
                          onChange={(e) => setRating(e.target.value)}
                        >
                          <option value=''>Select...</option>
                          <option value='1'>1 - Poor</option>
                          <option value='2'>2 - Fair</option>
                          <option value='3'>3 - Good</option>
                          <option value='4'>4 - Very Good</option>
                          <option value='5'>5 - Excellent</option>
                        </select>
                      </div>
                      <div className="mb-3">
                        <label htmlFor="comment" className="form-label">Comment</label>
                        <textarea
                          className="form-control"
                          id="comment"
                          value={comment}
                          rows="3"
                          onChange={(e) => setComment(e.target.value)}
                        ></textarea>
                      </div>
                      <button
                        disabled={loadingProductReview}
                        type='submit'
                        className="btn btn-dark"
                      >
                        Submit
                      </button>
                    </form>
                  ) : (
                    <Message>
                      Please <Link to='/login'>sign in</Link> to write a review{' '}
                    </Message>
                  )}
                </li>
              </ul>
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default ProductPage;
