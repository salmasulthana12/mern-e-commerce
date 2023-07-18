import React, {  useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { savePaymentMethod } from "../actions/cartActions";
import CheckoutSteps from "../components/CheckoutSteps";

const PaymentPage = () => {

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const cart = useSelector((state) => state.cart);
    const { shippingAddress } = cart;

    if (!shippingAddress) {
        navigate("/shipping")
    }

    const [paymentMethod, setPaymentMethod] = useState("PayPal");



    const handleSubmit = (e) => {
        e.preventDefault();
        dispatch(savePaymentMethod(paymentMethod));
        navigate("/placeorder");
    };
    return (
        <div>
            <div className="container">
                <div className="row d-flex justify-content-center">
                    <div className="col-6">
                        <CheckoutSteps step1 step2 step3 />
                        <h1>Payment Method</h1>
                        <form onSubmit={handleSubmit}>
                            <div className="mb-3">
                                <label htmlFor="country" className="form-label" style={{ fontSize: "20px" }}>
                                    Select Method
                                </label>
                                <div className="form-check">
                                    <input className="form-check-input" type="radio" value="PayPal" checked id="PayPal" name="paymentMethod" onChange={(e) => setPaymentMethod(e.target.value)} />
                                    <label className="form-check-label" htmlFor="PayPal">
                                        PayPal or credit card
                                    </label>
                                </div>
                                {/*<div className="form-check">
                                    <input className="form-check-input" type="radio" value="PayPal" id="Stripe" name="paymentMethod" onChange={(e) => setPaymentMethod(e.target.value)} />
                                    <label className="form-check-label" htmlFor="Stripe">
                                        Stripe
                                    </label>
                                </div>*/}
                            </div>

                            <button type="submit" className="btn btn-dark">
                                Continue
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default PaymentPage;
