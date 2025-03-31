import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import BasicInjection from './BasicInjection'
import SecondOrderInjection from './SecondOrderInjection'
import ErrorBaseInjection from './ErrorBaseInjection'
import BlindInjection from './BlindInjection'
import UnionInjection from './UnionInjection'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <BasicInjection/>
      <hr/>
      <SecondOrderInjection/>
      <hr/>
      <ErrorBaseInjection/>
      <hr/>
      <BlindInjection/>
      <hr/>
      <UnionInjection/>
    </>
  )
}

export default App
