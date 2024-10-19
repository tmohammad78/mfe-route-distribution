import { useEffect } from "react"


const useListener = (actionOnMessage) => {
    const worker = new SharedWorker('http://localhost:8000/sharedWorker.js');

    useEffect(() => {
        worker.port.start();
      
        worker.port.onmessage = (e) => {
          actionOnMessage(e.data)
        };
      
        return () => {
          worker.port.close();
        };
      }, [worker]);

}
export default useListener;