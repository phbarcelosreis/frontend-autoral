import styled from "styled-components";
import { useState } from 'react';
import axios from "axios";
import { useNavigate } from "react-router-dom";

function SignUp() {

    const [name, setName] = useState();
    const [email, setEmail] = useState();
    const [password, setPassword] = useState();
    

    const navigate = useNavigate();

    function submit(event){
        event.preventDefault();

        const url = "http://localhost:4000/registerUser"

        const obj = {
            name,
            email,
            password
        }

        const promise = axios.post(url, obj);
        promise.then((props) => {
            console.log(props)
            navigate("/")
        })
        .catch((err) => console.log(err))


    };

    function loginPage() {
        navigate("/")
    }

    return (
        <AllScreen>
        <form id="loginScreen" onSubmit={submit}>
          <input label="Name" placeholder="name" type="text" fullWidth value={name} onChange={e => setName(e.target.value)} required />
          <input label="E-mail" placeholder="email" type="text" fullWidth value={email} onChange={e => setEmail(e.target.value)} required />
          <input label="Senha" placeholder="password" type="password" fullWidth value={password} onChange={e => setPassword(e.target.value)} required/>
          <button type="submit"><p>Entrar</p></button>
          <p onClick={loginPage}>Possui conta? Entre já!</p>
        </form>
        </AllScreen>
    )

}

const AllScreen = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
    height: 100vh;
    background-color: #f25a52;
    font-family: 'Montserrat', sans-serif;
    font-size: 300;
    #loginScreen {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        border-radius: 20px;
        gap: 2%;
        width:  45%;
        height: 60%;
        background-color: #FAF0C4;
    } 
    img{
        width: 200px;
        height: 250px;
    }
    #loginScreen > input {
        border: none;
        border-radius: 5px;
        width: 40%;
        height: 7%;
    }
    button {
        display: flex;
        flex-direction: row;
        align-items: center;
        justify-content: center;
        gap: 10px;
        width: 40%;
        height: 10%;
        border-radius: 10px;
        background: #f49590;
        border: none;
        font-family: 'Montserrat', sans-serif;
        font-size: 300;
    }
    p{
        cursor: pointer;
    }
`;

export default SignUp;