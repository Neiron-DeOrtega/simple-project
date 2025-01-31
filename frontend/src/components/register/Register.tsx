import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import styles from "../Auth.module.css";

const Register = ({ handleSubmit }) => {
    const [login, setLogin] = useState("");
    const [password, setPassword] = useState("");

    return (
        <div className={styles.authContainer}>
            <h2 className={styles.title}>Регистрация</h2>
            <form className={styles.form}>
                <div className={styles.formGroup}>
                    <label htmlFor="register-login" className={styles.label}>
                        Логин:
                    </label>
                    <input
                        type="text"
                        id="register-login"
                        value={login}
                        onChange={(e) => setLogin(e.target.value)}
                        className={styles.input}
                        placeholder="Введите логин"
                        required
                    />
                </div>
                <div className={styles.formGroup}>
                    <label htmlFor="register-password" className={styles.label}>
                        Пароль:
                    </label>
                    <input
                        type="password"
                        id="register-password"
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
                    Зарегистрироваться
                </button>
            </form>
            <p className={styles.authMessage}>
                Уже есть аккаунт?{" "}
                <NavLink to="/login" className={styles.authLink}>
                    Войти
                </NavLink>
            </p>
        </div>
    );
};

export default Register;