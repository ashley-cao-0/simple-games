import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { saveSnakeScore } from '../index'

function SaveSnakeScore({score}) {
  const navigate = useNavigate()
  const [name, setName] = useState('')
  
  const handleChange = (e) => {
    setName(e.target.value)
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    e.target.disabled = true
    await saveSnakeScore(name, score)
    navigate('/leaderboard/snake')
  }

  return (
    <form>
      <label> Your name: </label>
      <input type="text" onChange={handleChange}/>
      <button onClick={handleSubmit}> Submit </button>
    </form>
  )
}

export default SaveSnakeScore