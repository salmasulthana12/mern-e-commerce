import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import Message from "../components/Message";
import Loader from "../components/loader/Loader";
import { Link, useLocation, useNavigate, useParams } from "react-router-dom";
import { getUserDetails, updateUser } from "../actions/userActions";
import { USER_UPDATE_RESET } from "../constants/userConstants";

const UserEditPage = () => {
  const { id } = useParams();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [isAdmin, setIsAdmin] = useState(false);

  const location = useLocation();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const userDetails = useSelector((state) => state.userDetails);
  const { loading, error, user } = userDetails;

  const userUpdate = useSelector((state) => state.userUpdate)
  const {
    loading: loadingUpdate,
    error: errorUpdate,
    success: successUpdate,
  } = userUpdate

  useEffect(() => {
    if (successUpdate) {
      dispatch({ type: USER_UPDATE_RESET })
      navigate('/admin/userlist')
    } else {
      if (!user || !user.name || user._id !== id) {
        dispatch(getUserDetails(id))
      } else {
        setName(user.name)
        setEmail(user.email)
        setIsAdmin(user.isAdmin)
      }
    }
  }, [dispatch, navigate, id, user, successUpdate])
  

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(updateUser({_id:id,name,email,isAdmin}))
  };
  return (
    <>
      <Link className="btn btn-light my-3" to="/admin/userlist">
        Go back
      </Link>
      <div className="container">
        <div className="row d-flex justify-content-center">
          <div className="col-4">
            <h1>Edit User</h1>
            {loadingUpdate&&<Loader/>}
            {errorUpdate&& <Message color='danger'>{errorUpdate}</Message>}
            {loading ? (
              <Loader />
            ) : error ? (
              <Message color="danger">{error}</Message>
            ) : (
              <form onSubmit={handleSubmit}>
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
                  <input
                    type="checkbox"
                    className="form-check-input"
                    id="isAdmin"
                    checked={isAdmin}
                    onChange={(e) => setIsAdmin(e.target.checked)}
                  />
                  <label htmlFor="isAdmin" className="form-label px-2">
                    Is Admin
                  </label>
                </div>

                <button type="submit" className="btn btn-dark">
                  Update
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default UserEditPage;
