import { useNavigate } from "react-router-dom";
import styled from "styled-components";

function SideBar() {

    const navigate = useNavigate();

    const token = '';

    function signUp() {

        navigate("/sign-in");

    }

    function cartPage() {

        if(token === '') {
            return navigate("/sign-in");
        }

        navigate("/cart");
    }

    function searchText() {
        console.log('Ta funfando')

    }

    return (
        <Container>
            <Bar>
                <SearchBox onSubmit={searchText}>
                    <input placeholder="Pesquisar..." type="text" id="searchInput"/>
                </SearchBox>
                <button onClick={signUp}><h1>Entrar</h1></button>
                <ion-icon onClick={cartPage} id="cart" name="cart-outline"></ion-icon>
            </Bar>
        </Container>
    )
    
}

const Container = styled.div`
    width: 100%;
    height: 100%;
`;

const Bar = styled.div`
    display: flex;
    box-sizing: border-box;
    padding-right: 10em;
    align-items: center;
    justify-content: flex-end;
    width: 100%;
    height: 7vw;
    background-color: rgba(164, 217,214, 1);
    
    button {
        display: flex;
        width: 10%;
        height: 40%;
        justify-content: center;
        align-items: center;
        cursor: pointer;
        border-radius: 5px;
        border: none;
        font-family: 'Josefin Sans', sans-serif;
        font-size: 2.5rem;
        margin-right: 80px;
    }

    #cart {
        width: 50px;
        height: 50px;
    }
`;

const SearchBox = styled.form`
    display: flex;
    justify-content: center; 
    align-items: center;
    height: 100%;
    width: 100%;
    input {
        box-sizing: border-box;
        text-align: center;
        border-radius: 5px;
        padding: 10px;
        border: none;
        height: 35%;
        width: 50%;

    }

`;

export default SideBar;