import React from "react";
import { NavLink, useNavigate, useParams } from "react-router-dom";
import styles from '../Posts.module.css'

const Home = ({ isAuthorized, handleCreatePost, handleGetPosts, postData, pageButtons }) => {
    const [text, setText] = React.useState("");
    const [file, setFile] = React.useState(null);
    const params = useParams();
    const page = params.id;
    const navigate = useNavigate()

    React.useEffect(() => {
        handleGetPosts(page);
    }, [page]);

    const handleFileChange = (e) => {
        const selectedFiles = Array.from(e.target.files); 
        setFile(selectedFiles);
    };

    const handleTextChange = (e) => {
        setText(e.target.value); 
    };

    const onSubmit = () => {
        handleCreatePost(text, file); 
    };

    return (
        <div className={styles.container}>
            <div className={styles.wrapper}>
                <div className={styles.search}>
                    {isAuthorized ? (
                        <div className={styles.createPost}>
                            <textarea
                                value={text}
                                onChange={handleTextChange}
                                placeholder="Введите текст"
                                className={styles.textarea}
                            />
                            <input
                                type="file"
                                onChange={handleFileChange}
                                multiple
                                className={styles.fileInput}
                            />
                            <button onClick={onSubmit} className={styles.button}>
                                Создать
                            </button>
                        </div>
                    ) : (
                        <div className={styles.authMessage}>
                            <NavLink to="/login" className={styles.authLink}>
                                Авторизуйтесь
                            </NavLink>, чтобы создавать посты
                        </div>
                    )}
                </div>
                <button onClick={() => navigate('/my-posts/1')} className={styles.button + ' ' + styles.reverse}>
                    Мои посты &#8594;
                </button>
                <div className={styles.posts}>
                    {postData.length > 0 ? (
                        postData.map((post) => (
                            <div key={post.id} className={styles.post}>
                                <div className={styles.postAuthor}>
                                    {post.user}
                                    <span className={styles.date}>{post.date.split('T')[0]}</span>
                                </div>
                                <p className={styles.postText}>{post.text}</p>
                                <div className={styles.postMedia}>
                                    {post.media.map((media) => (
                                        media.mimeType.startsWith('image/') ? (
                                        <img
                                            key={media.id}
                                            src={media.base64}
                                            alt=""
                                            className={styles.postImg}
                                        />) : (
                                            <video controls className={styles.postImg}>
                                                <source src={media.base64} type={media.mimeType}/>
                                            </video>
                                        )
                                    ))}
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
                            to={`/my-posts/${i}`} 
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

export default Home;