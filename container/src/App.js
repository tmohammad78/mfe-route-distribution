import React, { useCallback, useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"

function App() {
  const [loadingIframe,setLoadingIframe] = useState(false)
  const [renderApp,setRenderApp] = useState(null)
  const navigate = useNavigate()
  const [isNotHome,setIsHome] = useState(false)
  const [numberProducts,setNumberProducts] = useState(0)

  function loadPage(page) {
    if(page === '/') {
      setIsHome(true)
    }
    navigate(page)
    setRenderApp(page)
  }

  // const handleUpdateCart = useCallback((event) => {
  //   console.log(event,' this is event')
  //   setNumberProducts((currentCount) => currentCount);
  // }, [])

  window.addEventListener('add_to_cart', (event) => {
    console.log(event,' this is event')
    setNumberProducts((currentCount) => currentCount);
  });


  // useEffect(() => {  
  //   console.log("Scdscdsc")

  //   return () => {
  //     window.removeEventListener('add_to_cart', handleUpdateCart)
  //   }
  // }, [handleUpdateCart]);



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
        {numberProducts > 0 && (
          <div> 
              This is total of product:
              {numberProducts}
          </div>
        )}
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
