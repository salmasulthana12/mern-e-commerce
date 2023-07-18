import React from "react";
import { Link } from 'react-router-dom'


const CheckoutSteps = ({ step1, step2, step3, step4 }) => {
    return <div>
        <nav>
            <ul
                className="navbar-nav  d-flex flex-row justify-content-between"
                style={{ marginLeft: "auto" }}
            >
                {step1 ? <li className="nav-item" >
                    <Link className="nav-link" style={{ color: "black" }} aria-current="page" to="/login">Sign In</Link>

                </li> : <li className="nav-item" disabled>
                    <Link className="nav-link disabled" aria-current="page" to="/login">Shipping</Link>

                </li>}
                {step2 ? <li className="nav-item" >
                    <Link className="nav-link" style={{ color: "black" }} aria-current="page" to="/shipping">Shipping</Link>

                </li> : <li className="nav-item" disabled>
                    <Link className="nav-link disabled" aria-current="page" to="/shipping">Shipping</Link>

                </li>}
                {step3 ? <li className="nav-item" >
                    <Link className="nav-link" style={{ color: "black" }} aria-current="page" to="/payment">Payment</Link>

                </li> : <li className="nav-item" >

                    <Link className="nav-link disabled" aria-current="page" to="/payment">Payment</Link>
                </li>}
                {step4 ? <li className="nav-item" >
                    <Link className="nav-link" style={{ color: "black" }} aria-current="page" to="/placeorder">Place Order</Link>

                </li> : <li className="nav-item" disabled>
                    <Link className="nav-link disabled" aria-current="page" to="/placeorder">place Order</Link>

                </li>}
            </ul>
        </nav>
    </div>;
};

export default CheckoutSteps;
