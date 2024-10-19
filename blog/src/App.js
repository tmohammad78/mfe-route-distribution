import React from "react"
import {
  Routes,
  Route,
} from "react-router-dom";
import Posts from "./pages/posts";
import Post from "./pages/post";

function App() {
  let defaultPath = process.env.PUBLIC_URL

  const worker = new SharedWorker('http://localhost:8000/sharedWorker.js');


  worker.port.postMessage({ 
    type: 'publish', 
    event: 'test', 
    data: {
      test: "blog"
    } 
  });

  return (
      <div className="mx-20">
        <div>
          <h1 className="text-center text-gray-700">Welcome To Blog App</h1>
        </div>
        <Routes>
          <Route exact path={defaultPath} element={<Posts />} />
          <Route path={defaultPath + "/:id"} element={<Post />} />
        </Routes>
      </div>
  );
}

export default App;
