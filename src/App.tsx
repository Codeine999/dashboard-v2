import { Routes, Route  } from "react-router-dom";
import Layout from "@/layout/mainLayout"
import Home from "@/pages/home"
import Product from "./pages/product/Product";
import Order from "./pages/order/order";
import Login from "./pages/auth/Login";
import ResetPassword from "./pages/auth/ResetPassword";
import OrderConfirm from './pages/order/orderConfirm';
import Profile from "./pages/setting/Setting";
import User from "./pages/user/User";

function App() {

  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="/product" element={<Product />} />
        <Route path="/order" element={<Order />} />
        <Route path="/order/confirm/:id" element={<OrderConfirm />} />

        <Route path="/setting" element={<Profile />} />

        <Route path="/users" element={<User />} />
      </Route>
        <Route path="/login" element={<Login />} />
        <Route path="/reset-password" element={<ResetPassword />} />
    </Routes>
  );
}

export default App;
