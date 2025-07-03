import { Routes, Route } from "react-router-dom";
import Layout from "@/layout/mainLayout"
import Home from "@/pages/home"
import Product from "./pages/product/Product";
import AddProduct from "./pages/product/Add-product";
import EditProduct from "./pages/product/Edit-product";
import Order from "./pages/order/order";
import Login from "./pages/auth/Login";
import ResetPassword from "./pages/auth/ResetPassword";
import OrderConfirm from './pages/order/orderConfirm';
import User from "./pages/user/User";

function App() {

  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="/product" element={<Product />} />
        <Route path="/product/add-product" element={<AddProduct />} />
        <Route path="/product/edit-product/:id" element={<EditProduct />} />
        <Route path="/order" element={<Order />} />
        <Route path="/order/confirm/:id" element={<OrderConfirm />} />

        <Route path="/users" element={<User />} />
      </Route>
      <Route path="/login" element={<Login />} />
      <Route path="/reset-password" element={<ResetPassword />} />
    </Routes>
  );
}

export default App;
