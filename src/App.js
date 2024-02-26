
import React from 'react'
import { Routes, Route } from 'react-router-dom'
import EntryComponent from './components/EntryComponent'
import SuccessScreenComponent from './components/SuccessScreenComponent'
import BoardComponent from './components/BoardComponent'

const App = () => {
  return (
    <Routes>
      <Route path='/' element={<EntryComponent/>} />
      <Route path='/user/bordgame' element={<BoardComponent/>}/>
      <Route path='/user/success'element={<SuccessScreenComponent/>} />
      <Route path='*' element={<EntryComponent/>}/>
    </Routes>
  )
}

export default App