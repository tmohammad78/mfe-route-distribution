import React from "react"
import { useState } from "react";
import Data from "../../data"
import { useParams, useNavigate } from 'react-router-dom';

const Post = () => {
    const {id}= useParams()
    const blogPost = Data.find(blog => blog.id === parseInt(id));
    const navigate = useNavigate();
    const [isLoading, setIsLoading] = useState(true);


    if (!blogPost) {
        return <div>Post not found</div>;
    }

    const rows = [];
    for (let i = 0; i < Data.length; i += 3) {
      rows.push(Data.slice(i, i + 3));
    }
    return (
        <div>
            <button
                onClick={() => navigate(-1)}
                className="text-blue-500 hover:underline mb-4 inline-block bg-transparent border-none cursor-pointer"
                >
                &larr; Back to Blogs
            </button>
            <div className="flex items-center flex-col container mx-auto p-4">
                <h1 className="text-3xl font-bold mb-4">{blogPost.title}</h1>
                {isLoading && (
                    <div className="bg-gray-100 rounded-lg h-56 mb-4 w-full animate-pulse"></div>
                )}
                <img  
                    onLoad={() => setIsLoading(false)} 
                    src={blogPost.image} 
                    alt={blogPost.title}  
                    className={`mb-4 rounded-lg ${isLoading ? 'hidden' : 'block'}`}
                />
                <p className="text-gray-600 text-2xl">{blogPost.description}</p>
            </div>
        </div>
    )
}
export default Post;