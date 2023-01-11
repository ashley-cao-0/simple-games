import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { saveHighScore, getTopScores } from '../index'

function SaveScore({game, score}) {
  const navigate = useNavigate()
  const [name, setName] = useState('')
  const [clickedSave, setClickedSave] = useState(false)
  const [isHighScore, setIsHighScore] = useState(false)
  
  const handleChange = (e) => {
    setName(e.target.value)
  }

  const handleClick = () => {
    setClickedSave(true)
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    e.target.disabled = true
    const scoreId = await saveHighScore(game, name, score)
    navigate(`/leaderboard/${game}?scoreId=${scoreId}`)
  }

  useEffect(() => {
    const scoreSetup = async () => {
      const topScores = await getTopScores(game)
      const lowestTopScore = topScores[49]
      const beatLowestTopScore = score > lowestTopScore
      setIsHighScore(Boolean((beatLowestTopScore || topScores.length < 50) && score !== 0))
    }

    scoreSetup()
  }, [])

  return (
    <>
      {isHighScore && 
        <div className=" mt-10">
          {!clickedSave ? <button onClick={handleClick} className="  text-xl px-4 py-2 border border-gray-500 bg-red-200"> Save high score </button>
          :
          <form>
              <label> Your name: </label>
              <input type="text" onChange={handleChange} className= " border border-slate-600"/>
              <button onClick={handleSubmit} className=" bg-slate-200 px-2 py-1 ml-2 hover:bg-slate-300 border border-slate-400"> Submit </button>
            </form>
          }
        </div>
      }
    </>
  )
}

export default SaveScore