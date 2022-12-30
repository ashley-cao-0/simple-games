import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { saveSnakeScore } from '../index'

function SaveSnakeScore({score}) {
  const navigate = useNavigate()
  const [name, setName] = useState('')
  const [wantToSave, setWantToSave] = useState(false)
  
  const handleChange = (e) => {
    setName(e.target.value)
  }

  const handleClick = () => {
    setWantToSave(true)
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    e.target.disabled = true
    await saveSnakeScore(name, score)
    navigate('/leaderboard/snake')
  }

  return (
    <>
      {!wantToSave ? <button onClick={handleClick} className=" bg-slate-300 text-xl px-4 py-2"> Save score </button>
        :
        <form>
          <label> Your name: </label>
          <input type="text" onChange={handleChange} />
          <button onClick={handleSubmit} className=" bg-slate-200 px-2 py-1 ml-2 hover:bg-slate-300"> Submit </button>
        </form>
      }
    </>
  )
}

export default SaveSnakeScore