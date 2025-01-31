import { NavLink } from "react-router-dom"
import React from 'react'
import styles from './Posts.module.css'

const Main = () => {
    return (
        <div className={styles.container}>
            <div className={styles.verticalWrapper}>
                <NavLink className={styles.button} to="/login">Авторизация</NavLink>
                <NavLink className={styles.button} to="/register">Регистрация</NavLink>
                <NavLink className={styles.button} to="/1">Посты</NavLink>
                <NavLink className={styles.button} to="/my-posts/1">Мои посты</NavLink>
            </div>
        </div>
    )
}

export default Main