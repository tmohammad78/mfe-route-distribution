import React, { useState } from "react"
import { useNavigate } from "react-router-dom"

function App() {
  const [loadingIframe,setLoadingIframe] = useState(false)
  const [renderApp,setRenderApp] = useState(null)
  const navigate = useNavigate()
  const [isNotHome,setIsHome] = useState(false)



  function loadPage(page) {
    if(page === '/') {
      setIsHome(true)
    }
    navigate(page)
    setRenderApp(page)
  }

  return (
      <div className="">
        <nav className="bg-zinc-700 p-4">
          <ul className="list-none flex space-x-4 items-center">
            <li>
              <button className="bg-zinc-700 text-white cursor-pointer hover:text-gray-400 border-none text-lg" 
                onClick={() => loadPage('/')}>
                  Home
              </button>
            </li>
            <li>
              <button className="bg-zinc-700 text-white cursor-pointer hover:text-gray-400 border-none text-lg" 
                onClick={() => loadPage('/posts/')}>
                  Blog
              </button>
            </li>
            <li>
              <button className="bg-zinc-700 text-white cursor-pointer hover:text-gray-400 border-none text-lg" 
                onClick={() => loadPage('/blog/')}>
                  Posts
              </button>
            </li>
            <li>
              <button className="bg-zinc-700 text-white cursor-pointer hover:text-gray-400 border-none text-lg" 
                onClick={() => loadPage('/store/')}>
                  Store
              </button>
            </li>
          </ul>
        </nav>
        {isNotHome && (
          <iframe 
                onLoad={() => setLoadingIframe(false)} 
                className="w-full h-screen" 
                id="content-frame" 
                title="this is test"
                loading="lazy"
                src={renderApp}>
          </iframe>
        )}
        {loadingIframe ? <p>Loading iframe...</p> : null}
      </div>
  );
}

export default App;
