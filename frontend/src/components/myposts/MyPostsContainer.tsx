import axios from "axios"
import React from 'react'
import { useNavigate } from "react-router-dom"
import MyPosts from "./MyPosts.tsx"

const MyPostsContainer = () => {

    const [postData, setPostData] = React.useState<
        {
            id: number, 
            fileName: string,
            base64: string
        }[]
    >([])
    const [postsCount, setPostsCount] = React.useState<number>(0)
    const navigate = useNavigate()

    const handleMyPosts = async (page = 1) => {
        try {
            const response = await axios.get(`${process.env.REACT_APP_SERVER_URL}/my-posts/${page}`,
                {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem("accessToken")}`
                    }
                }
            )
            
            setPostData(response.data.postsWithMedia)
            setPostsCount(response.data.postsCount)
        } catch (error) {
            if (error.status === 401) {
                navigate('/login')
            }
            setPostData([])
        }
    }

    const handleDeletePost = async (id) => {
        try {
            await axios.delete(`${process.env.REACT_APP_SERVER_URL}/my-posts/${id}`, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('accessToken')}`
                }
            }).then((response) => {
                handleMyPosts(1)
            }).catch((err) => {
                alert(err.message)
            })
        } catch (error) {
            
        }
    }

    const handleEditPost = async (postId, newText) => {
        try {
            const response = await axios.put(
                `${process.env.REACT_APP_SERVER_URL}/my-posts/${postId}`,
                { text: newText },
                {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
                    },
                }
            );
            console.log('Пост обновлён:', response.data);
            handleMyPosts(1);
        } catch (error) {
            console.error('Ошибка при обновлении поста:', error);
        }
    };

    const totalPages = Math.ceil(postsCount / 10);

    const pageButtons: number[] = [];
    for (let i = 1; i <= totalPages; i++) {
        pageButtons.push(
            i
        );
    }

    return (
        <MyPosts 
            postData={postData} 
            handleMyPosts={handleMyPosts} 
            handleDeletePost={handleDeletePost}
            handleEditPost={handleEditPost}
            pageButtons={pageButtons}/>
    )
}

export default MyPostsContainer