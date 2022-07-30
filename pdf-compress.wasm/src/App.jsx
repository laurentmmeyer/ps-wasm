import {useEffect, useState} from 'react'
import reactLogo from './assets/react.svg'
import './App.css'
import {_GSPS2PDF} from "./lib/background.js";

function App() {
  const [count, setCount] = useState(0)

    useEffect(() => {
        const pdf = "https://jobninja.com/agb.pdf"
        const dataObject = {psDataURL: pdf}
        _GSPS2PDF(dataObject, (element)=> console.log(JSON.stringify(element)), (element)=> console.log(JSON.stringify(element)), (element)=> console.log(JSON.stringify(element)) )
    }, [])

  return (
    <div className="App">
      <div>
        <a href="https://vitejs.dev" target="_blank">
          <img src="/vite.svg" className="logo" alt="Vite logo" />
        </a>
        <a href="https://reactjs.org" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>Vite + React</h1>
      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
        <p>
          Edit <code>src/App.jsx</code> and save to test HMR
        </p>
      </div>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>
    </div>
  )
}

export default App
