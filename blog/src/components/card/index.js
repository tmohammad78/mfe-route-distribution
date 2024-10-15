import React from "react";
import { Link } from 'react-router-dom';
import { useState } from "react";

const Card = ({ blog }) => {
    const [imageError, setImageError] = useState(false);
    const handleError = () => {
        setImageError(true);
      };
    return (
        <div className="bg-white shadow-md mt-4 rounded-lg overflow-hidden m-2" style={{ width: '300px' }}>
        <div className={`w-full h-32 rounded`}>
            {!imageError ? (
            <img 
                className={`w-full h-32 object-cover rounded-lg block`}
                src={blog.image} 
                alt={blog.name} 
                onError={handleError}
            />
            ) : (
            <span>Image not available</span>
            )}
        </div>
        <div className="p-4">
            <h2 className="text-xl font-semibold mb-2">
                <Link to={`/blog/${blog.id}`}>{blog.title}</Link>
            </h2>        
            <p className="text-gray-600">{blog.description}</p>
        </div>
    </div>
    )
};

export default Card