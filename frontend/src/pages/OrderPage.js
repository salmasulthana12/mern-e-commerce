import React, { useEffect, useState } from "react";
import axios from "axios";
import { PayPalButton } from "react-paypal-button-v2";
import Message from "../components/Message";
import Loader from "../components/loader/Loader";
import { useSelector, useDispatch } from "react-redux";
import { Link, useNavigate, useParams } from "react-router-dom";
import {
  getOrderDetails,
  payOrder,
  deliverOrder,
} from "../actions/orderActions";
import {
  ORDER_PAY_RESET,
  ORDER_DELIVER_RESET,
} from "../constants/orderConstants";

const OrderPage = () => {
  const [sdkReady, setSdkReady] = useState(false);
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const orderCreate = useSelector((state) => state.orderDetails);
  const { order, loading, error } = orderCreate;

  console.log(order);

  const orderPay = useSelector((state) => state.orderPay);
  const { loading: loadingPay, success: successPay } = orderPay;

  const orderDeliver = useSelector((state) => state.orderDeliver);
  const { loading: loadingDeliver, success: successDeliver } = orderDeliver;

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  let itemsPrice;

  if (!loading) {
    //   Calculate prices
    const addDecimals = (num) => {
      return (Math.round(num * 100) / 100).toFixed(2);
    };

    itemsPrice = addDecimals(
      order.orderItems.reduce((acc, item) => acc + item.price * item.qty, 0)
    );
  }

  useEffect(() => {
    if (!userInfo) {
      navigate("/login");
    }

    const addPayPalScript = async () => {
      const { data: clientId } = await axios.get("/api/config/paypal");
      const script = document.createElement("script");
      script.type = "text/javascript";
      script.src = `https://www.paypal.com/sdk/js?client-id=${clientId}`;
      script.async = true;
      script.onload = () => {
        setSdkReady(true);
      };
      document.body.appendChild(script);
    };

    const getOrderDetailsAndUpdate = async () => {
      await dispatch(getOrderDetails(id));

      if (!order || successPay || successDeliver) {
        dispatch({ type: ORDER_PAY_RESET });
        dispatch({ type: ORDER_DELIVER_RESET });
      } else {
        if (!window.paypal) {
          addPayPalScript();
        } else {
          setSdkReady(true);
        }
      }
    };

    if (!order || order._id !== id || successPay) {
      getOrderDetailsAndUpdate();
    }
  }, [dispatch, id, order, successPay, successDeliver, userInfo, navigate]);

  const successPaymentHandler = (paymentResult) => {
    console.log(paymentResult);
    dispatch(payOrder(id, paymentResult));
  };

  const deliverHandler = () => {
    dispatch(deliverOrder(order));
  };

  return loading ? (
    <Loader />
  ) : error ? (
    <Message color="danger">{error}</Message>
  ) : (
    <>
      <h1>order{order._id}</h1>

      <div className="row my-4">
        <div className="col-8">
          <ul className="list-group">
            <li>
              <h2>Shipping</h2>
              <p>
                <strong>Name: </strong> {order.user.name}
              </p>
              <p>
                <strong>Email: </strong>{" "}
                <a href={`mailto:${order.user.email}`}>{order.user.email}</a>
              </p>
              <p>
                <strong>Address: </strong>
                {order.shippingAddress.address}, {order.shippingAddress.city},{" "}
                {order.shippingAddress.postalCode},{" "}
                {order.shippingAddress.country},
              </p>
              {order.isDelivered ? (
                <Message color="success">
                  Delivered on {order.deliveredAt}
                </Message>
              ) : (
                <Message color="danger">Not Delivered</Message>
              )}
            </li>
            <hr />
            <li>
              <h2>Payment Method</h2>
              <p>
                <strong>Method: </strong>
                {order.paymentMethod}
              </p>
              {order.isPaid ? (
                <Message color="success">Paid on {order.paidAt}</Message>
              ) : (
                <Message color="danger">Not paid</Message>
              )}
            </li>
            <hr />
            <li>
              <h2>Order Items</h2>
              <p>
                <strong>Items: </strong>
                {order.orderItems.length === 0 ? (
                  <Message>Order is Empty</Message>
                ) : (
                  <ul className="list-group my-2">
                    {order.orderItems.map((item, index) => (
                      <li key={index}>
                        <div className="row my-2">
                          <div className="col-md-1">
                            <img
                              src={item.image}
                              alt={item.name}
                              className="img-fluid"
                            />
                          </div>
                          <div className="col-md-4">
                            <Link to={`/product/${item.product}`}>
                              {item.name}
                            </Link>
                          </div>
                          <div className="col-md-6">
                            {item.qty} x ${item.price} = {item.qty * item.price}
                          </div>
                        </div>
                      </li>
                    ))}
                  </ul>
                )}
              </p>
            </li>
            <hr />
          </ul>
        </div>
        <div className="col-md-4" style={{ paddingLeft: "3rem" }}>
          <div className="card" style={{ width: "20rem" }}>
            <ul className="list-group">
              <li className="list-group-item">
                <h2>Order Summary</h2>
              </li>
              <li className="list-group-item d-flex">
                <div className="col-6">Items:</div>
                <div className="col-6">${itemsPrice}</div>
              </li>
              <li className="list-group-item d-flex">
                <div className="col-6">Shipping:</div>
                <div className="col-6">${order.shippingPrice}</div>
              </li>
              <li className="list-group-item d-flex">
                <div className="col-6">Tax:</div>
                <div className="col-6">${order.taxPrice}</div>
              </li>
              <li className="list-group-item d-flex">
                <div className="col-6">Total:</div>
                <div className="col-6">${order.totalPrice}</div>
              </li>
              {!order.isPaid && (
                <li className="list-group-item">
                  {loadingPay && <Loader />}
                  {!sdkReady ? (
                    <Loader />
                  ) : (
                    <PayPalButton
                      amount={order.totalPrice}
                      onSuccess={successPaymentHandler}
                    />
                  )}
                </li>
              )}
              {loadingDeliver && <Loader />}
              {userInfo && userInfo.isAdmin && order.isPaid && !order.isDelivered && (
                <li className="list-group-item d-flex justify-content-center">
                  <button className="btn btn-dark" onClick={deliverHandler}>
                    {" "}
                    Mark As Delivered
                  </button>
                </li>
              )}
              {/* <li>
                    {error && <Message color='danger'>{error}</Message>}
                </li> */}
            </ul>
          </div>
        </div>
      </div>
    </>
  );
};

export default OrderPage;
