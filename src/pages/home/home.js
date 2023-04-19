import styled from "styled-components";
import img from "../../assets/images/logo3.png";
import { useNavigate } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import axios from "axios";
import { AuthContext } from "../../context/AuthContext";

function Home() {
  const { token } = useContext(AuthContext);
  const [products, setProducts] = useState();
  const [cart, setCart] = useState([]);
  const [sort, setSort] = useState("");

  const navigate = useNavigate();

  const url = "http://localhost:4000/getProducts";

  function addToCart(product) {
    console.log(product)
    setCart([...cart, product]);
    alert("Produto adicionado ao carrinho com sucesso!");
  }

  function handleCart() {
    const url = "http://localhost:4000/cart";
    const newCart = {
      cartProduct: cart.map((product) => ({ productId: product.id })),
    };
    console.log(newCart);
    const config = {
      headers: { Authorization: `Bearer ${token}` },
    };

    axios
      .post(url, newCart, config)
      .then(() => navigate("/cart"))
      .catch((err) => {
        navigate("/cart");
        console.log(err);
      });
  }

  useEffect(() => {
    const promise = axios.get(url);
    promise.then((props) => {
      setProducts(props.data);
    });
    promise.catch((err) => console.log(err));
  }, []);

  function handleSort(e) {
    setSort(e.target.value);
  }

  function sortProducts() {
    if (sort === "name-asc") {
      setProducts([...products].sort((a, b) => a.name.localeCompare(b.name)));
    } else if (sort === "name-desc") {
      setProducts([...products].sort((a, b) => b.name.localeCompare(a.name)));
    } else if (sort === "price-asc") {
      setProducts([...products].sort((a, b) => a.price - b.price));
    } else if (sort === "price-desc") {
      setProducts([...products].sort((a, b) => b.price - a.price));
    }
  }

  useEffect(() => {
    sortProducts();
  }, [sort]);

  if (products && token) {
    return (
      <HomePage>
        <div id="navBar">
          <img src={img} alt="" />
          <CartIcon onClick={handleCart}>
            <ion-icon name="cart-outline"></ion-icon>
          </CartIcon>
        </div>
        <FilterDiv>
          <h3>Ordenar por:</h3>
          <select onChange={handleSort}>
            <option value="">Selecione uma opção</option>
            <option value="name-asc">Nome (A-Z)</option>
            <option value="name-desc">Nome (Z-A)</option>
            <option value="price-asc">Preço (menor-maior)</option>
            <option value="price-desc">Preço (maior-menor)</option>
          </select>
        </FilterDiv>
        <ProductDiv>
          {products.map((props, i) => {
            return (
              <div id="products" key={i}>
                <img src={props.image} alt="" />
                <p>{props.name}</p>
                <p>R${props.price}</p>
                <button onClick={() => addToCart(props)}>
                  Adicionar ao carrinho
                </button>
              </div>
            );
          })}
        </ProductDiv>
      </HomePage>
    );
  } else {
    navigate("/")
  }
}

const ProductDiv = styled.div`
  margin-top: 100px;
  width: 100%;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 50px;
  font-family: "Montserrat", sans-serif;
  font-size: 300;
  #products {
    box-sizing: border-box;
    padding-top: 10px;
    padding-bottom: 10px;
    display: flex;
    flex-direction: column;
    gap: 5%;
    justify-content: center;
    align-items: center;
    width: 15%;
    min-width: 200px;
    height: 300px;
    background-color: #faf0c4;
    border-radius: 20px;
    border: 2px solid lightgrey;
    img {
      border-radius: 5px;
      border: 2px solid lightgrey;
      height: 60%;
      width: 80%;
    }
    button {
      border: 1px solid lightgray;
      border-radius: 10px;
      width: 80%;
      height: 40px;
      background-color: #f25a52;
      cursor: pointer;
      :hover {
        background-color: #f25a01;
      }
    }
  }
`;

const HomePage = styled.div`
  width: 100%;
  #navBar {
    position: fixed;
    top: 0;
    box-sizing: border-box;
    padding: 0px 40px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 100%;
    height: 15%;
    background-color: #f25a52;
    img {
      width: 200px;
      height: 100%;
    }
    #carrin {
      width: 200px;
      height: 30%;
      cursor: pointer;
    }
  }
`;

const CartIcon = styled.div`
  position: fixed;
  right: 50px;
  top: 170px;
  width: 70px;
  height: 70px;
  border-radius: 50%;
  background-color: #f25a52;
  color: white;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
`;

const FilterDiv = styled.div`
  margin-left: 20px;
  margin-top: 150px;
  width: 100%;
  gap: 10px;
  display: flex;
  align-items: center;
  font-family: "Montserrat", sans-serif;
  font-size: 16px;
  #filterOptions {
    display: flex;
    gap: 20px;
  }
  select {
    padding: 8px;
    border-radius: 5px;
    border: none;
    box-shadow: 0px 0px 5px rgba(0, 0, 0, 0.3);
  }
  #searchInput {
    padding: 8px;
    border-radius: 5px;
    border: none;
    box-shadow: 0px 0px 5px rgba(0, 0, 0, 0.3);
  }
  #searchButton {
    background-color: #f25a52;
    color: white;
    border: none;
    border-radius: 5px;
    padding: 8px 16px;
    cursor: pointer;
  }
`;

export default Home;
