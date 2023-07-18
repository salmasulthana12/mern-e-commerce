import React, { useEffect, useState } from "react";
import axios from "axios";
import { useSelector, useDispatch } from "react-redux";
import Message from "../components/Message";
import Loader from "../components/loader/Loader";
import { Link, useNavigate, useParams } from "react-router-dom";
import { PRODUCT_UPDATE_RESET } from "../constants/productConstants";
import { listProductDetails, updateProduct } from "../actions/productActions";

const ProductEditPage = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [name, setName] = useState("");
  const [price, setPrice] = useState(0);
  const [image, setImage] = useState("");
  const [brand, setBrand] = useState("");
  const [category, setCategory] = useState("");
  const [countInStock, setCountInStock] = useState(0);
  const [description, setDescription] = useState("");
  const [uploading, setUploading] = useState(false);

  const dispatch = useDispatch();

  const productDetails = useSelector((state) => state.productDetails);
  const { loading, error, product } = productDetails;

  const productUpdate = useSelector((state) => state.productUpdate);
  const {
    loading: loadingUpdate,
    error: errorUpdate,
    success: successUpdate,
  } = productUpdate;

  useEffect(() => {
    if (successUpdate) {
      dispatch({ type: PRODUCT_UPDATE_RESET });
      navigate("/admin/productlist");
    } else {
      if (!product.name || product._id !== id) {
        dispatch(listProductDetails(id));
      } else {
        setName(product.name);
        setPrice(product.price);
        setImage(product.image);
        setBrand(product.brand);
        setCategory(product.category);
        setCountInStock(product.countInStock);
        setDescription(product.description);
      }
    }
  }, [dispatch, navigate, id, product, successUpdate]);

  const uploadFileHandler = async (e) => {
    const file = e.target.files[0];
    const formData = new FormData();
    formData.append("image", file);
    setUploading(true);

    try {
      const config = {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      };

      const { data } = await axios.post("/api/upload", formData, config);

      setImage(data);
      setUploading(false);
    } catch (error) {
      console.error(error);
      setUploading(false);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(
      updateProduct({
        _id: id,
        name,
        price,
        image,
        brand,
        category,
        description,
        countInStock,
      })
    );
  };

  return (
    <>
      <Link className="btn btn-light my-3" to="/admin/productlist">
        Go back
      </Link>
      <div className="container">
        <div className="row d-flex justify-content-center">
          <div className="col-4">
            <h1>Edit product</h1>
            {loadingUpdate && <Loader />}
            {errorUpdate && <Message color="danger">{errorUpdate}</Message>}
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
                  <label htmlFor="price" className="form-label">
                    Price
                  </label>
                  <input
                    type="number"
                    className="form-control"
                    id="price"
                    aria-describedby="priceHelp"
                    value={price}
                    placeholder="Enter price"
                    onChange={(e) => setPrice(e.target.value)}
                  />
                </div>

                <div className="mb-3">
                  <label htmlFor="image" className="form-label">
                    image
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="image"
                    aria-describedby="imageHelp"
                    value={image}
                    placeholder="Enter image url"
                    onChange={(e) => setImage(e.target.value)}
                  />
                  <div>
                    <input
                      className="form-control "
                      id="formFileLg"
                      type="file"
                      onChange={uploadFileHandler}
                    />
                    {uploading && <Loader />}
                  </div>
                </div>

                <div className="mb-3">
                  <label htmlFor="brand" className="form-label">
                    brand
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="brand"
                    aria-describedby="brandHelp"
                    value={brand}
                    placeholder="Enter brand"
                    onChange={(e) => setBrand(e.target.value)}
                  />
                </div>

                <div className="mb-3">
                  <label htmlFor="countInStock" className="form-label">
                    Count In Stock
                  </label>
                  <input
                    type="number"
                    className="form-control"
                    id="countInStock"
                    aria-describedby="countInStockHelp"
                    value={countInStock}
                    placeholder="Enter countInStock"
                    onChange={(e) => setCountInStock(e.target.value)}
                  />
                </div>

                <div className="mb-3">
                  <label htmlFor="category" className="form-label">
                    Category
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="category"
                    aria-describedby="categoryHelp"
                    value={category}
                    placeholder="Enter category"
                    onChange={(e) => setCategory(e.target.value)}
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="description" className="form-label">
                    Description
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="description"
                    aria-describedby="descriptionHelp"
                    value={description}
                    placeholder="Enter description"
                    onChange={(e) => setDescription(e.target.value)}
                  />
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

export default ProductEditPage;
