import React, { useRef, useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import useListener from "./hooks/useListener";

function App() {

  const [loadingIframe,setLoadingIframe] = useState(false)
  const iframeRef = useRef(null);
  const [renderApp,setRenderApp] = useState(null)
  const navigate = useNavigate()
  const [isNotHome,setIsHome] = useState(false)
  const [totalItems, setTotalItems] = useState(0);

  const worker = new SharedWorker('http://localhost:8000/sharedWorker.js');

  useEffect(() => {
      worker.port.start();
    
      function actionOnMessage (eventData) {
        console.log(eventData,'eventData iii')
        const { type, event, data } = eventData;
        if (type === 'subscribe' && event === 'cartUpdated') {
          console.log('Cart updated in container:', data);
          setTotalItems(data.count)
        }
      }

      worker.port.onmessage = (e) => {
        console.log(e,'dd this is e from container')
        // actionOnMessage(e.data)
      };
    
      return () => {
        worker.port.close();
      };
    }, [worker]);




  function loadPage(page) {
    if(page === '/') {
      setIsHome(true)
    }
    navigate(page)
    setRenderApp(page)
  }

  return (
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
          <div className="bg-white py-3 px-2 min-w-12 h-10 rounded-lg flex flex-row justify-center items-center gap-3">
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-cart" viewBox="0 0 16 16">
                <path d="M0 1.5A.5.5 0 0 1 .5 1H2a.5.5 0 0 1 .485.379L2.89 3H14.5a.5.5 0 0 1 .491.592l-1.5 8A.5.5 0 0 1 13 12H4a.5.5 0 0 1-.491-.408L2.01 3.607 1.61 2H.5a.5.5 0 0 1-.5-.5M3.102 4l1.313 7h8.17l1.313-7zM5 12a2 2 0 1 0 0 4 2 2 0 0 0 0-4m7 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4m-7 1a1 1 0 1 1 0 2 1 1 0 0 1 0-2m7 0a1 1 0 1 1 0 2 1 1 0 0 1 0-2"/>
              </svg>
              <span>{totalItems}</span>
            </div>
        </div>
        {isNotHome && (
          <iframe 
                ref={iframeRef}
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
