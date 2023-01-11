import React, { useState, useRef, useEffect } from "react";
import { Link } from 'react-router-dom'
import SaveScore from "./SaveScore";

function MathTest() {
  const randomNum = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min
  const time = 30

  const [num1, setNum1] = useState(randomNum(10,99))
  const [num2, setNum2] = useState(randomNum(10,99))
  const [count, setCount] =useState(0)
  const [input, setInput] = useState('')
  const [started, setStarted] = useState(false)
  const [timesUp, setTimesUp] = useState(false)
  const [timerAnimation, setTimerAnimation] = useState('')
  const [inputAnimation, setInputAnimation] = useState('')
  
  const ref = useRef()

  const resetGame = () => {
    refreshQuestion()
    setCount(0)
    setInput('')
    setStarted(false)
    setTimesUp(false)
    setTimerAnimation('')
  }

  const refreshQuestion = () => {
    setNum1(randomNum(10,99))
    setNum2(randomNum(10,99))
  }

  const startGame = () =>{
    setStarted(true)
    setTimerAnimation('animate-[shrink_30s_linear_forwards]')
    setTimeout(()=>{
      setTimesUp(true)
    }, time*1000)
    
  }

  const handleSubmit = (e) =>{
    e.preventDefault()
    if (!started) {
      startGame()
    }

    if (Number(input)===num1+num2){
      setCount(count+1)
    } else {
      setInputAnimation('focus:border-2 focus:border-red-600 animate-[wobble_0.2s_ease-in-out]')
    }
    refreshQuestion()
    setInput('')
  }

  const handleChange = (e) =>{
    setInput(e.target.value)
  }

  const resetInputAnimation = (e) => {
    setInputAnimation('')
  }

  useEffect(()=>{
    ref.current.focus()
  }, [])

  return (
    <>
      <Link to="/leaderboard/mathtest" className='absolute z-50 py-3 px-5 m-4 ml-32 text-2xl bg-slate-300 hover:bg-slate-400 duration-150'> Leader board </Link>

      <div className=" text-center">
        <h2 className="mt-24 text-xl">Score: {count}</h2>
        <div className=" w-96 mx-auto mt-5">
          <div className={'bg-red-500 h-1 w-full ' + timerAnimation}></div>
          <div className=" bg-white p-4 rounded-md h-36 flex items-center justify-center">
          {!timesUp ?
            <h2 className=" text-4xl">{num1} + {num2}</h2>
            :
            <h2 className=" text-4xl">Time's up!</h2>
          }
          </div>
        </div>
        
        <form onSubmit={handleSubmit} className={`w-96 mx-auto mt-5 border`}>
        <input type="text" name="answer" value={input} ref={ref} onChange={handleChange} autoComplete="off" className={`w-full focus:outline-0 border border-gray-400 ${ inputAnimation }`}
          onAnimationEnd={resetInputAnimation} disabled={timesUp} />
        </form>
        
        {!started &&
          <p className="w-96 mx-auto mt-5"> You have 30 seconds. The timer will start after your first answer. </p>
        }
        
        {timesUp &&
          <div className=" flex justify-center">
          <SaveScore game='mathtest' score={count} />
          <button className=" mt-10 mx-2 text-xl py-2 px-4 border border-slate-500 bg-slate-300" onClick={resetGame}>Play again</button>
          </div>
        }
      </div>       
    </>  
    
  )
}

export default MathTest