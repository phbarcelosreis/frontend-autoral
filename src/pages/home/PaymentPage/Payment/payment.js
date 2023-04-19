import React, { useContext, useState } from "react";
import Cards from "react-credit-cards";
import "react-credit-cards/es/styles-compiled.css";
import styled from "styled-components";
import axios from "axios";
import InputMask from "react-input-mask";
import { AuthContext } from "../../../../context/AuthContext";

const Teste = styled.div`
  display: flex;
  width: 100%;
  height: 100%;
  align-items: center;
  justify-content: center;
`;

const CardForm = styled.form`
  display: flex;
  gap: 20px;
  width: 50%;
  min-width: 400px;
  height: 70%;
  border-radius: 30px;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  background-color: lightgrey;
  p{
    font-family: "Raleway";
    color: black;
  }
  button p {
    color: black;
  }
  #cardInput {
    margin-top: 15px;
  }
  #inputs {
    display: flex;
    flex-direction: column;
    gap: 10px;
    justify-content: center;
    align-items: center;
    p {
      font-size: 12px;
      color: grey;
    }
    input {
      box-sizing: border-box;
      border-radius: 5px;
      border: 1.5px solid grey;
      height: 40px;
      width: 350px;
      font-family: "Roboto";
      font-style: normal;
      font-weight: 300;
      font-size: 20px;
      line-height: 23px;
      color: black;
      padding: 10px;
      ::placeholder {
        color: #8e8e8e;
      }
    }
    #MinorInputs {
      display: flex;
      gap: 20px;
      input {
        width: 200px;
      }
      #minor2 {
        width: 130px;
      }
    }
    button {
      width: 100%; 
      max-width: 200px;
      height: 50px;
      border: 1px solid purple;
      border-radius: 10px;
      background-color: blueviolet;
      cursor: pointer;
      :hover {
        background-color: purple;
      }
    }
  }
`;

const Display = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100vh;
  justify-content: center;
  align-items: center;
`;

export default function Payment() {
  const { token } = useContext(AuthContext);
  const [cvc, setCvc] = useState("");
  const [expiry, setExpiry] = useState("");
  const [focus, setFocus] = useState("");
  const [name, setName] = useState("");
  const [number, setNumber] = useState("");

  const handleInputFocus = (e) => {
    setFocus(e.target.name.length);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    switch (name) {
      case "number":
        setNumber(value);
        break;
      case "name":
        setName(value);
        break;
      case "expiry":
        setExpiry(value);
        break;
      case "cvc":
        setCvc(value);
        break;
      default:
        break;
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const cardData = {
      issuer: "generic",
      name,
      number,
      cvv: cvc,
      expirationDate: expiry,
    };
    const reqBody = { cardData: cardData };
    const API = "http://localhost:4000/payments";
    const config = {
      headers: { Authorization: `Bearer ${token}` },
    };

    await axios
      .post(API, reqBody, config) // eslint-disable-next-line
      .then((response) => console.log(response.data)) // eslint-disable-next-line
      .catch((error) => console.error(error));
  };

  return (
    <Display>
      <Teste id="PaymentForm">
        <CardForm onSubmit={handleSubmit}>
          <p>Área de Pagamento</p>
          <div id="cardInput">
            <Cards
              cvc={cvc}
              expiry={expiry}
              focused={focus}
              name={name}
              number={number}
            />
          </div>
          <div id="inputs">
            <InputMask
              mask="9999 9999 9999 9999"
              maskChar=" "
              name="number"
              onChange={handleInputChange}
              onFocus={handleInputFocus}
              placeholder="Número do cartão"
              value={number}
            />
            <p>Ex: 49....., 51......, 36......., 41.......</p>
            <InputMask
              mask="99/99"
              maskChar=" "
              name="expiry"
              onChange={handleInputChange}
              onFocus={handleInputFocus}
              placeholder="MM/AA"
              value={expiry}
            />
            <InputMask
              mask="999"
              maskChar=" "
              name="cvc"
              onChange={handleInputChange}
              onFocus={handleInputFocus}
              placeholder="CVC"
              value={cvc}
            />
            <input
              id="name"
              type="text"
              name="name"
              onChange={handleInputChange}
              onFocus={handleInputFocus}
              placeholder="Nome (como escrito no cartão)"
              value={name}
              maxLength="16"
            />
            <button confirmBox="FINALIZAR PAGAMENTO" type="submit">
              Confirmar Pagamento!
            </button>
          </div>
        </CardForm>
      </Teste>
    </Display>
  );
}
