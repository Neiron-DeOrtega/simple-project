import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import styles from "../Auth.module.css";

const Login = ({ handleSubmit }) => {
    const [login, setLogin] = useState("");
    const [password, setPassword] = useState("");

    return (
        <div className={styles.authContainer}>
            <h2 className={styles.title}>Авторизация</h2>
            <form className={styles.form}>
                <div className={styles.formGroup}>
                    <label htmlFor="login-login" className={styles.label}>
                        Логин:
                    </label>
                    <input
                        type="text"
                        id="login-login"
                        value={login}
                        onChange={(e) => setLogin(e.target.value)}
                        className={styles.input}
                        placeholder="Введите логин"
                        required
                    />
                </div>
                <div className={styles.formGroup}>
                    <label htmlFor="login-password" className={styles.label}>
                        Пароль:
                    </label>
                    <input
                        type="password"
                        id="login-password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className={styles.input}
                        placeholder="Введите пароль"
                        required
                    />
                </div>
                <button
                    type="button"
                    className={styles.button}
                    onClick={(e) => handleSubmit(e, login, password)}
                >
                    Войти
                </button>
            </form>
            <p className={styles.authMessage}>
                Нет аккаунта?{" "}
                <NavLink to="/register" className={styles.authLink}>
                    Зарегистрироваться
                </NavLink>
            </p>
        </div>
    );
};

export default Login;