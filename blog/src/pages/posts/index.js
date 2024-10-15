import React from "react"
import Data from "../../data"
import Card from "../../components/card"

const Posts = () => {
    const rows = [];
    for (let i = 0; i < Data.length; i += 3) {
      rows.push(Data.slice(i, i + 3));
    }
    return (
        <div className="container mx-auto p-4">
        <h1 className="text-3xl text-center font-bold mb-6">Blogs</h1>
        {rows.map((row, rowIndex) => (
          <div key={rowIndex} className="flex justify-center flex-wrap -m-2">
            {row.map((blog) => (
              <Card key={blog.id} blog={blog} />
            ))}
          </div>
        ))}
      </div>
    )
}
export default Posts;