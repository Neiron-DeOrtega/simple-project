import React from "react";
import axios from "axios";
import Home from "./Home.tsx";

const HomeContainer = () => {
    const isAuthorized = !!localStorage.getItem("accessToken")
    const [postData, setPostData] = React.useState<
        {
            id: number, 
            fileName: string,
            base64: string
        }[]
    >([])
    const [postsCount, setPostsCount] = React.useState<number>(0)

    const handleGetPosts = async (page = 1) => {
        try {
            const response = await axios.get(`${process.env.REACT_APP_SERVER_URL}/posts/${page}`,
                {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem("accessToken")}`
                    }
                }
            )
            
            setPostData(response.data.postsWithMedia)
            setPostsCount(response.data.postsCount)
        } catch (error) {
            console.log(error)
            setPostData([])
        }
    }

    const handleCreatePost = async (text, files) => {
        if (!text.trim()) {
            alert("Пост не может быть пустым!");
            return;
        }

        const formData = new FormData();
        formData.append("text", text)

        if (files && files.length > 0) {
            files.forEach((file, index) => {
                formData.append("media", file)
            });
        }

        try {
            const response = await axios.post(
                `${process.env.REACT_APP_SERVER_URL}/posts`,
                formData,
                {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
                        "Content-Type": "multipart/form-data", 
                    },
                }
            );

            alert("Пост успешно создан!");
            setPostData(postData)
        } catch (err) {
            alert(err.message || "Произошла ошибка при создании поста");
        }
    };

    const totalPages = Math.ceil(postsCount / 10);

    const pageButtons: number[] = [];
    for (let i = 1; i <= totalPages; i++) {
        pageButtons.push(
            i
        );
    }

    return <Home 
                isAuthorized={isAuthorized} 
                handleCreatePost={handleCreatePost}
                handleGetPosts={handleGetPosts}
                postData={postData} 
                pageButtons={pageButtons} />;
};

export default HomeContainer;