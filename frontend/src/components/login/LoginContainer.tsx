import { useNavigate } from "react-router-dom";
import Login from "./Login.tsx"
import axios from "axios";
import React from 'react'

const LoginContainer = () => {

    const navigate = useNavigate()

    const handleSubmit = async (e, login, password) => {
        e.preventDefault();

        await axios.post(`${process.env.REACT_APP_SERVER_URL}/login`, {
            login, password
        }).then((response) => {
            localStorage.setItem('accessToken', response.data.accessToken)
            localStorage.setItem('refreshToken', response.data.refreshToken)

            navigate('/1')
        }).catch((err) => {
            alert(err.message)
        })


    };

    return (
        <Login handleSubmit={handleSubmit}/>
    );
}

export default LoginContainer