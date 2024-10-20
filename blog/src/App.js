import React , { useEffect } from "react"
import {
  Routes,
  Route,
} from "react-router-dom";
import Posts from "./pages/posts";
import Post from "./pages/post";

function App() {
  let defaultPath = process.env.PUBLIC_URL

  useEffect(() => {
    const event = new CustomEvent('mount', {  detail: { product: "blog", isLoaded: true } });
    window.parent.dispatchEvent(event);
    return () => {
      const event = new CustomEvent('unmount', {  detail: { product: "blog", isLoaded: false } });
      window.parent.dispatchEvent(event);
    };
  }, [])

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
