import { useNavigate } from "react-router-dom";
import Register from "./Register.tsx";
import axios from "axios";
import React from "react";

const RegisterContainer = () => {
    const navigate = useNavigate();

    const handleSubmit = async (e, login, password) => {
        e.preventDefault();

        try {
            const response = await axios.post(`${process.env.REACT_APP_SERVER_URL}/register`, {
                login,
                password,
            });

            navigate("/login");
        } catch (err) {
            alert(err.message || "Произошла ошибка при регистрации");
        }
    };

    return <Register handleSubmit={handleSubmit} />;
};

export default RegisterContainer;