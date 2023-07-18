import React, { useEffect } from "react";
import CheckoutSteps from "../components/CheckoutSteps";
import Message from "../components/Message";
import { useSelector, useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { createOrder } from "../actions/orderActions";

const PlaceOrderPage = () => {

    const navigate = useNavigate()

    const cart = useSelector((state) => state.cart);
    const dispatch = useDispatch();

    const addDecimal = (num) => {
        return (Math.round(num * 100) / 100).toFixed(2);
    };

    const itemsPrice = cart.cartItems.reduce(
        (acc, item) => acc + item.price * item.qty,
        0
    );
    const shippingPrice = itemsPrice > 500 ? 0 : 100;
    const taxPrice = addDecimal(Number((0.15 * itemsPrice).toFixed(2)));
    const totalPrice = (Number(itemsPrice) + Number(shippingPrice) + Number(taxPrice)).toFixed()

    const orderCreate = useSelector(state => state.orderCreate)
    const { order, success, error } = orderCreate

    useEffect(() => {
        if (success) {
            navigate(`/order/${order._id}`)
        }

    }, [navigate, order, success]);


    const handlePlaceOrder = () => {
        dispatch(createOrder({
            orderItems: cart.cartItems,
            shippingAddress: cart.shippingAddress,
            paymentMethod: cart.paymentMethod,
            itemsPrice: itemsPrice,
            shippingPrice: shippingPrice,
            taxPrice: taxPrice,
            totalPrice: totalPrice
        }))
    };




    return <div className="container">
        <div className="row d-flex justify-content-center">
            <div className="col-6">
                <CheckoutSteps step1 step2 step3 step4 />
            </div>
        </div>
        <div className="row my-4">
            <div className="col-8">
                <ul className="list-group">
                    <li>
                        <h2>Shipping</h2>
                        <p>
                            <strong>Address: </strong>
                            {cart.shippingAddress.address}, {cart.shippingAddress.city}, {cart.shippingAddress.postalCode}, {cart.shippingAddress.country},
                        </p>
                    </li>
                    <hr />
                    <li>
                        <h2>Payment Method</h2>
                        <p>
                            <strong>Method: </strong>
                            {cart.paymentMethod}
                        </p>
                    </li>
                    <hr />
                    <li>
                        <h2>Order Items</h2>
                        <p>
                            <strong>Items: </strong>
                            {cart.cartItems.length === 0 ? <Message>Your cart is Empty</Message> : (
                                <ul className="list-group my-2">
                                    {cart.cartItems.map((item, index) => (
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
                        <li className="list-group-item"><h2>Order Summary</h2></li>
                        <li className="list-group-item d-flex">
                            <div className="col-6">
                                Items:
                            </div>
                            <div className="col-6">
                                ${itemsPrice}
                            </div>

                        </li>
                        <li className="list-group-item d-flex">
                            <div className="col-6">
                                Shipping:
                            </div>
                            <div className="col-6">
                                ${shippingPrice}
                            </div>
                        </li>
                        <li className="list-group-item d-flex">
                            <div className="col-6">
                                Tax:
                            </div>
                            <div className="col-6">
                                ${taxPrice}
                            </div>
                        </li>
                        <li className="list-group-item d-flex">
                            <div className="col-6">
                                Total:
                            </div>
                            <div className="col-6">
                                ${totalPrice}
                            </div>
                        </li>
                        <li>
                            {error && <Message color='danger'>{error}</Message>}
                        </li>
                        <li className="list-group-item d-flex justify-content-center">
                            <button
                                style={{ width: "15rem" }}
                                className="btn btn-dark"
                                disabled={cart.cartItems.length === 0}
                                onClick={handlePlaceOrder}
                            >
                                Proceed To Checkout
                            </button>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    </div>
};

export default PlaceOrderPage;
