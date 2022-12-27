import React, {useState, useEffect} from "react";
import { saveAnonymousScore, saveScore, getTopScores } from "../index"
import { useNavigate } from "react-router-dom";

function FinishScreen({score, game}) {
  const navigate = useNavigate()
  const [scoreId, setScoreId] = useState(0)
  const [showSaveForm, setShowSaveForm] = useState(false)
  const [isHighScore, setIsHighScore] = useState(false)

  const yesClick = () =>{
    setShowSaveForm(true)
  }

  const noClick = () =>{
    navigate(0)
  }
  const handleNameSubmit = async (e)=>{
    e.preventDefault()
    const name = e.target.name.value
    if (name) {
      await saveScore(name, scoreId)
      navigate('/'+game+'/leaderboard')
    }
  }

  useEffect(()=>{
    const scoreSetup = async() => {
      const id = await saveAnonymousScore(score, game)
      setScoreId(id)
      const topScores = await getTopScores()
      // const findScoreResult = topScores.find(topScore => topScore.score < score)
      const lowestTopScore = topScores[19]
      const beatLowestTopScore = score > lowestTopScore
      setIsHighScore(Boolean(beatLowestTopScore || topScores.length < 20))
    }
    scoreSetup()
  },[])

  return (
    <div className=" text-center">
      <div className=" bg-slate-200 w-1/2 mx-auto mt-24 h-60 flex justify-center flex-col items-center">
        <h2>Your score: {score}</h2>
        {isHighScore && 
          <>
            {showSaveForm ? 
              <form onSubmit={handleNameSubmit} >
                <label htmlFor="name"> Your name: </label>
                <input type="text" name="name" className=" border"/>
                <button className=" px-2 py-1 border border-gray-800 bg-slate-100 ml-3"> Submit </button>
              </form>
            :

          
            <div>
              <p>You got high score! Would you like to save it?</p>
              <div className="flex justify-around mt-5">
                <button onClick={yesClick} className=" px-2 py-1 border border-gray-800 bg-slate-100"> Yes </button>
                <button onClick={noClick} className=" px-2 py-1 border border-gray-800 bg-slate-100" >No </button>
              </div>
            </div>}
          </>
        }
      </div>
      {!isHighScore && <button className=" mt-5 border" onClick={noClick}>Play again</button>}
    </div>
  )
}

export default FinishScreen