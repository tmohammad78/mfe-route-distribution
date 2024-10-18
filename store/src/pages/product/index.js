import { useState } from "react";
import Products from '../../data/products';
import { useParams, useNavigate } from 'react-router-dom';

const Product = () => {
    const {id}= useParams()
    const productData = Products.find(blog => blog.id === parseInt(id));
    const navigate = useNavigate();
    const [isLoading, setIsLoading] = useState(true);


    if (!productData) {
        return <div>Post not found</div>;
    }

    const rows = [];
    for (let i = 0; i < Products.length; i += 3) {
      rows.push(Products.slice(i, i + 3));
    }
    return (
        <div>
            <button
                onClick={() => navigate(-1)}
                className="text-blue-500 hover:underline mb-4 inline-block bg-transparent border-none cursor-pointer"
                >
                &larr; Back to Products
            </button>
            <div className="flex items-center flex-col container mx-auto p-4">
                <h1 className="text-3xl font-bold mb-4">{productData.title}</h1>
                {isLoading && (
                    <div className="bg-gray-100 rounded-lg h-64 mb-4 w-full animate-pulse"></div>
                )}
                <img  
                    onLoad={() => setIsLoading(false)} 
                    src={productData.image} 
                    alt={productData.title}  
                    className={`mb-4 rounded-lg ${isLoading ? 'hidden' : 'block'}`}
                />
                <p className="text-gray-600 text-2xl">{productData.description}</p>
            </div>
        </div>
    )
}
export default Product;