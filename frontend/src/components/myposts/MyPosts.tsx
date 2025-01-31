import React, { useState } from 'react';
import styles from '../Posts.module.css';
import { NavLink, useParams } from 'react-router-dom';

const MyPosts = ({ postData, handleMyPosts, handleDeletePost, handleEditPost, pageButtons }) => {
    const params = useParams();
    const page = params.id;

    // Состояние для редактирования
    const [editingPostId, setEditingPostId] = useState(null); // ID поста, который редактируется
    const [editedText, setEditedText] = useState(''); // Текст, который редактируется

    React.useEffect(() => {
        handleMyPosts(page);
    }, [page]);

    const handleDelete = (id) => {
        handleDeletePost(id);
    };

    const handleEdit = (post) => {
        // Включаем режим редактирования для выбранного поста
        setEditingPostId(post.id);
        setEditedText(post.text); // Устанавливаем текущий текст поста
    };

    const handleSave = (post) => {
        // Сохраняем изменения и выключаем режим редактирования
        handleEditPost(post.id, editedText); // Передаём ID поста и новый текст
        setEditingPostId(null); // Выходим из режима редактирования
    };

    const handleCancel = () => {
        // Отменяем редактирование
        setEditingPostId(null);
    };

    return (
        <div className={styles.container}>
            <div className={styles.wrapper}>
                <h2 className={styles.title}>Мои посты</h2>
                <div className={styles.posts}>
                    {postData.length > 0 ? (
                        postData.map((post) => (
                            <div key={post.id} className={styles.post}>
                                <div className={styles.postAuthor}>
                                    {post.user}
                                    <span className={styles.date}>{post.date.split('T')[0]}</span>
                                </div>

                                {editingPostId === post.id ? (
                                    <input
                                        type="text"
                                        value={editedText}
                                        onChange={(e) => setEditedText(e.target.value)}
                                        className={styles.editInput}
                                    />
                                ) : (
                                    <p className={styles.postText}>{post.text}</p>
                                )}

                                <div className={styles.postMedia}>
                                    {post.media.map((media) =>
                                        media.mimeType.startsWith('image/') ? (
                                            <img
                                                key={media.id}
                                                src={media.base64}
                                                alt=""
                                                className={styles.postImg}
                                            />
                                        ) : (
                                            <video controls className={styles.postImg}>
                                                <source src={media.base64} type={media.mimeType} />
                                            </video>
                                        )
                                    )}
                                </div>

                                <div className={styles.btnWrapper}>
                                    {editingPostId === post.id ? (
                                        <>
                                            <button
                                                className={`${styles.button} ${styles.reverse}`}
                                                onClick={() => handleSave(post)}
                                            >
                                                Сохранить
                                            </button>
                                            <button
                                                className={styles.button}
                                                onClick={handleCancel}
                                            >
                                                Отмена
                                            </button>
                                        </>
                                    ) : (
                                        <>
                                            <button
                                                className={`${styles.button} ${styles.reverse}`}
                                                onClick={() => handleEdit(post)}
                                            >
                                                Редактировать
                                            </button>
                                            <button
                                                className={styles.button}
                                                onClick={() => handleDelete(post.id)}
                                            >
                                                Удалить
                                            </button>
                                        </>
                                    )}
                                </div>
                            </div>
                        ))
                    ) : (
                        <div className={styles.notFound}>Постов не найдено</div>
                    )}
                </div>
                <div className={styles.pagination}>
                    {pageButtons.map((i) => {
                        return (<NavLink
                            key={i}
                            to={`/${i}`} 
                            className={({ isActive }) => 
                                isActive ? `${styles.pageButton} ${styles.active}` : styles.pageButton
                            }
                        >
                            {i}
                        </NavLink>)
                    })
                    }
                </div>
            </div>
        </div>
    );
};

export default MyPosts;