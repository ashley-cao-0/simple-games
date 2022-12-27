import React, {useState,useEffect} from "react";
import { getTopScores } from "../index"
import {Link} from 'react-router-dom'

function LeaderBoard() {
  const [scores, setScores] = useState([])
  useEffect(() => {
    const showScore = async () => {
      const data = await getTopScores()
      setScores(data)
    }
    showScore()
  },[])
  return (
    <div className=" bg-white w-4/6 mx-auto mt-24 text-center p-5">
      <h2>Leader Board</h2>
      <table className=" bg-purple-100 mx-auto w-full">
        <tbody>    
        <tr className=" bg-purple-800">
          <th>Rank</th>
          <th>Name</th>
          <th>Score</th>
        </tr>
      {scores?.map((score,index) =>
        <tr key={score.id} className=" bg-purple-400 pt-10">
          <td>{index+1}</td>
          <td>{score.name}</td>
          <td>{score.score}</td>
        </tr>
        )} 
        </tbody>
      </table>
      <button className=" mt-5 border"><Link to="/mathtest">Play again</Link></button>
    </div>
  )
}

export default LeaderBoard