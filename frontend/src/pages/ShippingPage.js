import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import Message from "../components/Message";
import Loader from "../components/loader/Loader";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { register } from "../actions/userActions";
import { saveShippingAddress } from "../actions/cartActions";
import CheckoutSteps from "../components/CheckoutSteps";

const ShippingPage = () => {
  const cart = useSelector((state) => state.cart);
  const { shippingAddress } = cart;
  const [address, setAddress] = useState(shippingAddress.address);
  const [city, setCity] = useState(shippingAddress.city);
  const [postalCode, setPostalCode] = useState(shippingAddress.postalCode);
  const [country, setCountry] = useState(shippingAddress.country);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(saveShippingAddress({ address, city, postalCode, country }));
    navigate("/payment");
  };
  return (
    <div>
      <div className="container">
        <div className="row d-flex justify-content-center">
          <div className="col-6">
            <CheckoutSteps step1 step2 />
            <h1>Shipping</h1>
            <form onSubmit={handleSubmit}>
              <div className="mb-3">
                <label htmlFor="address" className="form-label">
                  Address
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="Address"
                  aria-describedby="emailHelp"
                  value={address}
                  placeholder="Enter address"
                  onChange={(e) => setAddress(e.target.value)}
                />
              </div>
              <div className="mb-3">
                <label htmlFor="city" className="form-label">
                  City
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="city"
                  aria-describedby="emailHelp"
                  value={city}
                  placeholder="Enter City"
                  onChange={(e) => setCity(e.target.value)}
                />
              </div>
              <div className="mb-3">
                <label htmlFor="postalCode" className="form-label">
                  PostalCode
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="postalCode"
                  placeholder="Enter postalCode"
                  value={postalCode}
                  onChange={(e) => setPostalCode(e.target.value)}
                />
              </div>
              <div className="mb-3">
                <label htmlFor="country" className="form-label">
                  Country
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="country"
                  placeholder="Confirm country"
                  value={country}
                  onChange={(e) => setCountry(e.target.value)}
                />
              </div>

              <button type="submit" className="btn btn-dark">
                Submit
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ShippingPage;
