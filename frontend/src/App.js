import React from "react";
import Footer from "./components/Footer";
import Header from "./components/Header";
import HomePage from "./pages/HomePage";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import ProductPage from "./pages/ProductPage";
import CartPage from "./pages/CartPage";
import LoginPage from "./pages/loginPage";
import RegisterPage from "./pages/RegisterPage";
import ProfilePage from "./pages/ProfilePage";
import ShippngPage from "./pages/ShippingPage";
import PaymentPage from "./pages/PaymentPage";
import PlaceOrderPage from "./pages/PlaceOrderPage";
import OrderPage from "./pages/OrderPage";
import UserListPage from "./pages/UserListPage";
import UserEditPage from "./pages/UserEditPage";
import ProductListPage from "./pages/ProductListPage";
import ProductEditPage from "./pages/ProductEditPage";
import OrderListPage from "./pages/OrderListPage";


const App = () => {
  return (
    <Router>
      <Header />
      <main>
        <div className="container">
          <Routes>
            <Route path="/order/:id" element={<OrderPage/>} />
            <Route path="/placeorder" element={<PlaceOrderPage />} />
            <Route path="/payment" element={<PaymentPage />} />
            <Route path="/shipping" element={<ShippngPage />} />
            <Route path="/profile" element={<ProfilePage />} />
            <Route path="/register" element={<RegisterPage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/product/:id" element={<ProductPage />} />
            <Route path="/cart/:id?" element={<CartPage />} />
            <Route path="/admin/userlist" element={<UserListPage />} />
            <Route path="/admin/user/:id/edit" element={<UserEditPage/>} />
            <Route path="/admin/productlist" exact element={<ProductListPage />} />
            <Route path="/admin/productlist/:pageNumber" exact element={<ProductListPage />} />
            <Route path="/admin/product/:id/edit" element={<ProductEditPage/>} />
            <Route path="/admin/orderlist" element={<OrderListPage/>} />
            <Route path="/search/:keyword" exact element={<HomePage />} />
            <Route path="/page/:pageNumber" exact element={<HomePage />} />
            <Route path="/search/:keyword/page/:pageNumber" exact element={<HomePage />} />
            <Route path="/"  exact element={<HomePage />} />
          </Routes>
        </div>
      </main>
      <Footer />
    </Router>
  );
};

export default App;
