import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import Message from "../components/Message";
import Loader from "../components/loader/Loader";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { getUserDetails, updateUserProfile } from "../actions/userActions";
import {listMyOrders} from '../actions/orderActions'

const ProfilePage = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [message, setMessage] = useState(null);

  const location = useLocation();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const userDetails = useSelector((state) => state.userDetails);
  const { loading, error, user } = userDetails;

  const orderListMy = useSelector((state) => state.orderListMy);
  const { loading:loadingOrders, error:errorOrders, orders } = orderListMy;

  console.log(orders)

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const userUpdateProfile = useSelector((state) => state.userUpdateProfile);
  const { success } = userUpdateProfile;

  useEffect(() => {
    if (!userInfo) {
      navigate("/login");
    } else {
      if (!user.name) {
        dispatch(getUserDetails("profile"));
        dispatch(listMyOrders())
      } else {
        setName(user.name);
        setEmail(user.email);
      }
    }
  }, [navigate, userInfo, dispatch, user]);

  const handleUpdate = (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      setMessage("Passwords do not match");
    } else {
      dispatch(updateUserProfile({ id: user._id, name, email, password }));
    }
  };
  return (
    <div>
      <div className="container">
        <div className="row mx-2">
          <div className="col-3">
            <h1>Profile</h1>
            {message && <Message color="danger">{message}</Message>}
            {error && <Message color="danger">{error}</Message>}
            {success && <Message color="success">Profile Updated</Message>}
            {loading && <Loader />}
            <form onSubmit={handleUpdate}>
              <div className="mb-3">
                <label htmlFor="name" className="form-label">
                  Name
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="name"
                  aria-describedby="emailHelp"
                  value={name}
                  placeholder="Enter name"
                  onChange={(e) => setName(e.target.value)}
                />
              </div>
              <div className="mb-3">
                <label htmlFor="email" className="form-label">
                  Email address
                </label>
                <input
                  type="email"
                  className="form-control"
                  id="email"
                  aria-describedby="emailHelp"
                  value={email}
                  placeholder="Enter Email"
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              <div className="mb-3">
                <label htmlFor="password" className="form-label">
                  Password
                </label>
                <input
                  type="password"
                  className="form-control"
                  id="password"
                  placeholder="Enter password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
              <div className="mb-3">
                <label htmlFor="confirmPassword" className="form-label">
                  Confirm Password
                </label>
                <input
                  type="password"
                  className="form-control"
                  id="confirmPassword"
                  placeholder="Confirm password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                />
              </div>

              <button type="submit" className="btn btn-dark">
                Update
              </button>
            </form>
          </div>
          <div className="col-9" style={{ paddingLeft: "2rem" }}>
            <h1>My Orders</h1>
            {loadingOrders?<Loader/>:errorOrders?<Message color='danger'>{errorOrders}</Message>:(
              <table style={{width:"100%"}}>
                <thead>
                  <tr>
                    <th>
                      ID
                    </th>
                    <th>
                      DATE
                    </th>
                    <th>
                      TOTAL
                    </th>
                    <th>
                      PAID
                    </th>
                    <th>
                      DELIVERED
                    </th>
                    <th>

                    </th>
                  </tr>
                </thead>
                <tbody>
                  {orders.map(order=>(
                    <tr key={order._id}>
                      <td>
                        {order._id}
                      </td>
                      <td>
                        {order.createdAt.substring(0,10)}
                      </td>
                      <td>
                        {order.totalPrice}
                      </td>
                      <td>
                        {order.isPaid?order.paidAt.substring(0,10):(<i className="fas fa-times " style={{color:'red'}}></i>)}
                      </td>
                      <td>
                        {order.isDelivered?order.deliveredAt.substring(0,10):(<i className="fas fa-times " style={{color:'red'}}></i>)}
                      </td>
                      <td>
                        <Link to={`/order/${order._id}`}>
                          <button className="btn btn-dark">Details</button>
                        </Link>
                      </td>

                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
