import React, { useState } from "react";
import { Link, useNavigate, Route } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "../actions/userActions";
import SearchBox from "./SearchBox";

const Header = () => {
  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch(logout());
    // navigate('/login')
  };

  const [keyword, setKeyword] = useState("");

  const submitHandler = (e) => {
    e.preventDefault();
    if (keyword.trim()) {
      navigate(`/search/${keyword}`);
    } else {
      navigate("/");
    }
  };

  return (
    <header style={{ width: "100%" }}>
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark fixed-top">
        <div className="container-fluid m-2">
          <Link className="navbar-brand" to="/">
            Proshop
          </Link>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <form onSubmit={submitHandler} className="d-flex">
              <input
                type="text"
                name="q"
                onChange={(e) => setKeyword(e.target.value)}
                placeholder="Search Products..."
                className="mr-sm-2 ml-sm-5 form-control me-2"
              ></input>
              <button type="submit" className="p-2 btn btn-outline-success">
                Search
              </button>
            </form>
            <ul
              className="navbar-nav ml-auto mb-2 mb-lg-0 pe-3"
              style={{ marginLeft: "auto" }}
            >
              <li className="nav-item">
                <Link className="nav-link" aria-current="page" to="/cart">
                  <i className="fas fa-shopping-cart"></i> Cart
                </Link>
              </li>
              {userInfo ? (
                <li className="nav-item dropdown">
                  <Link
                    className="nav-link dropdown-toggle"
                    to=""
                    id="navbarDropdown"
                    role="button"
                    data-bs-toggle="dropdown"
                    aria-expanded="false"
                  >
                    {userInfo.name}
                  </Link>
                  <ul
                    className="dropdown-menu p-2"
                    aria-labelledby="navbarDropdown"
                  >
                    <li>
                      <Link to="/profile" className="dropdown-item">
                        Profile
                      </Link>
                    </li>
                    <li
                      onClick={handleLogout}
                      className="dropdown-item"
                      style={{ cursor: "pointer" }}
                    >
                      Logout
                    </li>
                  </ul>
                </li>
              ) : (
                <li className="nav-item">
                  <Link className="nav-link" to="/login">
                    <i className="fas fa-user"></i> Sign In
                  </Link>
                </li>
              )}
              {userInfo && userInfo.isAdmin && (
                <li className="nav-item dropdown">
                  <Link
                    className="nav-link dropdown-toggle"
                    to=""
                    id="navbarDropdown"
                    role="button"
                    data-bs-toggle="dropdown"
                    aria-expanded="false"
                  >
                    {userInfo.name}
                  </Link>
                  <ul
                    className="dropdown-menu p-2"
                    aria-labelledby="navbarDropdown"
                  >
                    <li>
                      <Link to="/admin/userlist" className="dropdown-item">
                        Users
                      </Link>
                    </li>
                    <li>
                      <Link to="/admin/productlist" className="dropdown-item">
                        Products
                      </Link>
                    </li>
                    <li>
                      <Link to="/admin/orderlist" className="dropdown-item">
                        Orders
                      </Link>
                    </li>
                  </ul>
                </li>
              )}

              {/* <li className="nav-item dropdown">
          <a className="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">
            Dropdown
          </a>
          <ul className="dropdown-menu" aria-labelledby="navbarDropdown">
            <li><a className="dropdown-item" href="#">Action</a></li>
            <li><a className="dropdown-item" href="#">Another action</a></li>
            <li><hr className="dropdown-divider"/></li>
            <li><a className="dropdown-item" href="#">Something else here</a></li>
          </ul>
        </li> */}
            </ul>
            {/* <form className="d-flex">
        <input className="form-control me-2" type="search" placeholder="Search" aria-label="Search"/>
        <button className="btn btn-outline-success" type="submit">Search</button>
      </form> */}
          </div>
        </div>
      </nav>
    </header>
  );
};

export default Header;
