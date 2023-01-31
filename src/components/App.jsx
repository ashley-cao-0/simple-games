import React from 'react'
import { Routes, Route, Link } from 'react-router-dom'
import '../index.css'
import MathTest from './MathTest'
import Home from './Home'
import LeaderBoard from './LeaderBoard'
import TypingTest from './TypingTest'
import Game from './Game'
import Snake from './Snake'
import MemoryTest from './MemoryTest'
import Hangman from './Hangman'
import StopTheGhost from './StopTheGhost'
import Sudoku from './Sudoku'
import NotFound from './NotFound'

function App() {
  return (
    <div className='bg-slate-50 absolute min-h-full w-full font-mono'>
      <Link to="/" className='absolute z-50 py-3 px-5 m-4 text-2xl bg-slate-300 hover:bg-slate-400 duration-150'>Home</Link>
      <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path='/mathtest' element={<MathTest/>}/>
        <Route path='/leaderboard/:game' element={<LeaderBoard />}/>
        <Route path='/typingtest' element={<TypingTest />}/>
        <Route path='/game' element={<Game />}/>
        <Route path='/snake' element={<Snake />}/>
        <Route path='/memory' element={<MemoryTest />}/>
        <Route path='/hangman' element={<Hangman />}/>
        <Route path='/stoptheghost' element={<StopTheGhost />}/>
        <Route path='/sudoku' element={<Sudoku />}/>
        <Route path='*' element={<NotFound />}/>
      </Routes>
    </div>
  )
}

export default App
