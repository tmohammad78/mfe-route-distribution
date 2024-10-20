import {
  Routes,
  Route,
  Link
} from "react-router-dom";
import React , { useEffect } from "react"
import Home from "./pages/Home";
import About from "./pages/About";
import Style from './app.module.css';

function App() {
  let defaultPath = process.env.PUBLIC_URL

  useEffect(() => {
    const event = new CustomEvent('mount', {  detail: { product: "posts", isLoaded: true } });
    window.parent.dispatchEvent(event);
    return () => {
      const event = new CustomEvent('unmount', {  detail: { product: "posts", isLoaded: false } });
      window.parent.dispatchEvent(event);
    };
  }, [])

  return (
    <div className={Style.App}>
      <nav className="bg-gray-700 text-white">
        <ul className="list-none">
          <li>
            <Link to={defaultPath + "/about-us"}>About</Link>
          </li>
        </ul>
      </nav>
      <hr />
        <Routes>
          <Route exact path={defaultPath}  element={<Home />} />
          <Route path={defaultPath + "/about-us"} element={<About />} />
        </Routes>
    </div>
  );
}

export default App;
