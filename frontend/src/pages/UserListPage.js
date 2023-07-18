import React, { useEffect } from "react";
import Loader from "../components/loader/Loader";
import Message from "../components/Message";
import { useSelector, useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { deleteUser, listUsers } from "../actions/userActions";

const UserListPage = () => {
  const dispatch = useDispatch();
  const navigate=useNavigate();
  const userList = useSelector((state) => state.userList);
  const { loading, error, users } = userList;

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin ;

  const userDelete = useSelector((state) => state.userDelete)
  const { success: successDelete } = userDelete

  useEffect(() => {
    if(userInfo && userInfo.isAdmin){
        dispatch(listUsers());
    }
    else{
        navigate('/login')
    }
  }, [dispatch,navigate,successDelete,userInfo]);

  const deleteHandler=(id)=>{
    if(window.confirm('Are you sure')){
      dispatch(deleteUser(id))
    }
  }

  return (
    <>
      <h1>Users</h1>
      {loading ? (
        <Loader />
      ) : error ? (
        <Message color="danger">{error}</Message>
      ) : (
        <table style={{width:"100%"}}>
          <thead>
            <tr>
              <th>ID</th>
              <th>NAME</th>
              <th>EMAIL</th>
              <th>ADMIN</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user._id}>
                <td>{user._id}</td>
                <td>{user.name}</td>
                <td>
                  <a href={`mailto:${user.email}`}>{user.email}</a>
                </td>
                <td>
                  {user.isAdmin ? (
                    <i className="fas fa-check" style={{ color: "green" }}></i>
                  ) : (
                    <i className="fas fa-times" style={{ color: "red" }}></i>
                  )}
                </td>
                <td>
                    <Link to={`/admin/user/${user._id}/edit`}> 
                    <button className="btn">
                        <i className="fas fa-edit"></i></button></Link>
                        <button onClick={() => deleteHandler(user._id)} className="btn btn-danger">
                            <i className="fas fa-trash"></i>
                        </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </>
  );
};

export default UserListPage;
