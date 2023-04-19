import { Routes, Route } from "react-router-dom";
import SignUp from "./pages/signUp/signUp";
import SignIn from "./pages/signIn/signIn";
import Home from "./pages/home/home";
import Payment from "./pages/home/PaymentPage/Payment/payment";
import Cart from "./pages/home/PaymentPage/Cart/cart";

function Rotas() {
  return (
    <Routes>
      <Route path="/" element={<SignIn />} />
      <Route path="/home" element={<Home />} />
      <Route path="/register" element={<SignUp />} />
      <Route path="/cart" element={<Cart />} />
      <Route path="/payment" element={<Payment />} />
    </Routes>
  );
}

export default Rotas;
