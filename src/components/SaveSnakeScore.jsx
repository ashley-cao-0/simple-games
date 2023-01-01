import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { saveSnakeScore, getTopScores } from '../index'

function SaveSnakeScore({score}) {
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
    await saveSnakeScore(name, score)
    navigate('/leaderboard/snake')
  }

  useEffect(() => {
    const scoreSetup = async () => {
      const topScores = await getTopScores('snake')
      const lowestTopScore = topScores[49]
      const beatLowestTopScore = score > lowestTopScore
      setIsHighScore(Boolean((beatLowestTopScore || topScores.length < 50) && score !== 0))
    }

    scoreSetup()
  }, [])

  return (
    <>
      {isHighScore && 
        <>
          {!clickedSave ? <button onClick={handleClick} className=" bg-slate-300 text-xl px-4 py-2"> Save high score </button>
          :
          <form>
              <label> Your name: </label>
              <input type="text" onChange={handleChange} />
              <button onClick={handleSubmit} className=" bg-slate-200 px-2 py-1 ml-2 hover:bg-slate-300"> Submit </button>
            </form>
          }
        </>
      }
    </>
  )
}

export default SaveSnakeScore