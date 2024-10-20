
import React, { useCallback, useEffect, useRef, useState } from "react"
import { useNavigate } from "react-router-dom"

function App() {
  const [totalItemCart,setTotalItemCart] = useState(0)
  const [whereWeAre,setWhereWeAre] = useState()
  const [app,setApp] = useState({})

  const navigate = useNavigate()
  const iframeRef = useRef();

  function loadPage(page) {
    setApp({
      loading: true,
      page
    })
    navigate(page);
  }



  // const worker = new Worker('http://localhost:8000/sharedWorker.js'); // Ensure the correct URL

  // useEffect(() => {
  //   worker.port.start();
  
  //   worker.port.onmessage = (e) => {
  //     const { product, event, data } = e.data;
  
  //     if (event === 'cartUpdated') {
  //       console.log('Cart updated in container:', data);
  //       setTotalItemCart(data.count)
  //     }
  //   };
  
  //   return () => {
  //     worker.port.close();
  //   };
  // }, [worker]);

  const handleIframeLoad = useCallback((index) => {
    setApp(prev => ({
      ...prev,
      loading: false
    }))
  }, []);


  return (
    <>
      <div className="">
      <div className="header flex items-center justify-between py-3 px-2 bg-zinc-700">
          <nav className="p-4">
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
                    Posts
                </button>
              </li>
              <li>
                <button className="bg-zinc-700 text-white cursor-pointer hover:text-gray-400 border-none text-lg" 
                  onClick={() => loadPage('/blog/')}>
                    Blog
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
          <div className="bg-white py-3 px-2 h-10 rounded-lg flex flex-row justify-center items-center gap-3">
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-cart" viewBox="0 0 16 16">
                <path d="M0 1.5A.5.5 0 0 1 .5 1H2a.5.5 0 0 1 .485.379L2.89 3H14.5a.5.5 0 0 1 .491.592l-1.5 8A.5.5 0 0 1 13 12H4a.5.5 0 0 1-.491-.408L2.01 3.607 1.61 2H.5a.5.5 0 0 1-.5-.5M3.102 4l1.313 7h8.17l1.313-7zM5 12a2 2 0 1 0 0 4 2 2 0 0 0 0-4m7 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4m-7 1a1 1 0 1 1 0 2 1 1 0 0 1 0-2m7 0a1 1 0 1 1 0 2 1 1 0 0 1 0-2"/>
              </svg>
              <span>{totalItemCart}</span>
            </div>
        </div>
        {app.loading && (
          <p>Loading iframe...</p>
        )}
        <iframe
              key={app.page}
              ref={iframeRef}
              onLoad={handleIframeLoad}
              className="w-full h-screen"
              id={`content-frame-${app.page}`}
              title={`iframe-${app.page}`}
              loading="lazy"
              src={app.page}
        />
      </div>
      {/* <footer className="absolute py-4 px-3 bottom-0 w-full bg-orange-600">
        <span className="text-white text-sm">We are here: <span className="font-bold">{whereWeAre}</span></span>
        <div className="text-xs text-white font-bold">P.S: I really like orange color ;)</div>
      </footer> */}
    </>
  );
}

export default App;
