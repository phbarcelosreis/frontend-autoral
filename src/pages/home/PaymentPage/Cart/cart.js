import { useContext, useEffect } from "react";
import styled from "styled-components";
import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../../../context/AuthContext";

function Cart() {
  const { token } = useContext(AuthContext);
  const [products, setProducts] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    const config = {
      headers: { Authorization: `Bearer ${token}` },
    };
    const promise = axios.get(`http://localhost:4000/cart`, config);
    promise.then((props)=> {
      console.log(props.data.cartProducts)
      const cartNew = props.data.cartProducts
      let newCart = [];
      let totalPrice = 0;
      cartNew.map((props, i) => {
        newCart.push(props.product)
        totalPrice += Number(props.product.price)
      })
      setTotalPrice(totalPrice)
      setProducts(newCart)
    })
  }, []);

  function checkOut() {

    navigate("/payment");

  }
  /*     useEffect(() => {
        console.log(token)
        if(!token) {
            alert("Você não está logado");
            navigate("/");
        }
    }, [navigate, token]); */

  return (
    <Container>
      <CartProducts>
        <h1>Itens Selecionados</h1>
        <ProdSubs>
          <h1>Item</h1>
          <h3>Valor</h3>
        </ProdSubs>
        <Border></Border>
        {products.map((product, i) => (
          <>
            <ProdDetails>
              <img src={product.image} />
              <div>{product.name}</div>
              <h3>{product.quantity}</h3>
              <h4>R$: {product.price}</h4>
            </ProdDetails>
            <Border></Border>
          </>
        ))}
        <p>Subtotal: R$:{totalPrice.toFixed(2)}</p>
        <h5>Frete: GRÁTIS!</h5>
        <GotoCheckout onClick={checkOut}>Ir ao Checkout</GotoCheckout>
      </CartProducts>
    </Container>
  );
}

const Container = styled.div`
  width: 100%;
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const GotoCheckout = styled.button`
  margin-top: 12px;
  position: absolute;
  right: 20px;
  bottom: 10px;
  width: 120px;
  height: 45px;
  background-color: #f25a52;
  border-radius: 6px;
  color: white;
  border: none;
  :hover {
    cursor: pointer;
  }
`;

const CartProducts = styled.div`
  padding: 20px;
  margin-left: 20px;
  padding-bottom: 70px;
  width: 80%;
  height: 100%;
  background-color: white;
  border-radius: 10px;
  display: flex;
  flex-direction: column;
  position: relative;
  h1 {
    margin-bottom: 20px;
    font-family: "Raleway";
    font-style: normal;
    font-weight: 700;
    font-size: 20px;
    line-height: 30px;
    letter-spacing: 0.04em;
  }
  p {
    display: flex;
    justify-content: right;
    font-family: "Raleway";
    font-style: normal;
    font-weight: 200;
    font-size: 18px;
  }
  h5 {
    display: flex;
    justify-content: right;
    font-family: "Raleway";
    font-style: normal;
    font-weight: 700;
    font-size: 18px;
    line-height: 30px;
    color: #80b4a9;
  }
`;

const ProdSubs = styled.div`
  display: flex;
  justify-content: space-between;
  font-family: "Raleway";
  font-style: normal;
  h1 {
    font-weight: 700;
    font-size: 16px;
    line-height: 30px;
    letter-spacing: 0.04em;
    margin-right: 200px;
  }
  h2 {
    font-weight: 700;
    font-size: 16px;
    line-height: 30px;
    letter-spacing: 0.04em;
  }
  h3 {
    font-weight: 700;
    font-size: 16px;
    line-height: 30px;
    letter-spacing: 0.04em;
    margin-right: 20px;
  }
`;

const ProdDetails = styled.div`
  display: flex;
  font-family: "Raleway";
  justify-content: space-between;
  font-style: normal;
  margin-bottom: 20px;
  height: 80px;
  img {
    width: 80px;
  }
  div {
    width: 100%;
    display: flex;
    justify-content: left;
    padding-left: 20px;
    align-items: center;
    font-weight: 400;
    font-size: 14px;
    line-height: 30px;
    letter-spacing: 0.04em;
  }
  h3 {
    display: flex;
    align-items: center;
    justify-content: center;
    font-weight: 400;
    font-size: 14px;
    line-height: 30px;
    padding-left: 10px;
    letter-spacing: 0.04em;
  }
  h4 {
    width: 400px;
    display: flex;
    align-items: center;
    justify-content: right;
    padding-right: 10px;
    font-weight: 400;
    font-size: 14px;
    line-height: 30px;
    letter-spacing: 0.04em;
  }
`;

const Border = styled.div`
  width: 98%;
  height: 1px;
  margin-top: 5px;
  margin-bottom: 20px;
  border-radius: 2px;
  background-color: lightgrey;
`;

export default Cart;
