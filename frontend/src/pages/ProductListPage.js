import React, { useEffect } from "react";
import Loader from "../components/loader/Loader";
import Message from "../components/Message";
import { useSelector, useDispatch } from "react-redux";
import { Link, useNavigate,useParams } from "react-router-dom";
import { createProduct, deleteProduct, listProducts } from "../actions/productActions";
import { deleteUser } from "../actions/userActions";
import { PRODUCT_CREATE_RESET } from "../constants/productConstants";
import Paginate from "../components/Paginate";

const ProductListPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { pageNumber } = useParams();
  const pageNumbers = Number(pageNumber) || 1;
  const productList = useSelector((state) => state.productList);
  const { loading, error, products,page,pages } = productList;

  const productDelete = useSelector((state) => state.productDelete);
  const { loading:loadingDelete, error:errorDelete, success:successDelete } = productDelete;

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const productCreate = useSelector((state) => state.productCreate)
  const {
    loading: loadingCreate,
    error: errorCreate,
    success: successCreate,
    product: createdProduct,
  } = productCreate

  useEffect(() => {
    dispatch({type:PRODUCT_CREATE_RESET})
    if (!userInfo || !userInfo.isAdmin) {
      navigate('/login')
    }

    if (successCreate) {
      navigate(`/admin/product/${createdProduct._id}/edit`)
    } else {
      dispatch(listProducts("", pageNumbers))
    }
  }, [dispatch, navigate, userInfo,successDelete,successCreate,createdProduct,pageNumbers]);

  const deleteHandler = (id) => {
    if (window.confirm("Are you sure")) {
      dispatch(deleteProduct(id));
    }
  };

  const createProductHandler = () =>{
    dispatch(createProduct())
  }

  return (
    <>
      <div className="row">
        <div className="col-6 text-start">
          <h1>Products</h1>
        </div>
        <div className="col-6 text-end">
            <button className=" btn btn-dark my-3" onClick={createProductHandler}><i className="fas fa-plus"></i> Create Product</button>
        </div>
      </div>
      {loadingDelete && <Loader/>}
      {errorDelete && <Message color='danger'>{errorCreate}</Message>}
      {loadingCreate && <Loader/>}
      {errorCreate && <Message color='danger'>{errorCreate}</Message>}
      {loading ? (
        <Loader />
      ) : error ? (
        <Message color="danger">{error}</Message>
      ) : (
        <>
        <table style={{ width: "100%" }}>
          <thead>
            <tr>
              <th>ID</th>
              <th>NAME</th>
              <th>PRICE</th>
              <th>CATEGORY</th>
              <th>BRAND</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {products.map((product) => (
              <tr key={product._id}>
                <td>{product._id}</td>
                <td>{product.name}</td>
                <td>
                ${product.price}
                </td>
                <td>
                {product.category}
                </td>
                <td>{product.brand}</td>
                
                <td>
                  <Link to={`/admin/product/${product._id}/edit`}>
                    <button className="btn">
                      <i className="fas fa-edit"></i>
                    </button>
                  </Link>
                  <button
                    onClick={() => deleteHandler(product._id)}
                    className="btn btn-danger"
                  >
                    <i className="fas fa-trash"></i>
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <Paginate
            pages={pages}
            page={page}
            isAdmin={true}
          />
        </>
      )}
    </>
  );
};

export default ProductListPage;
