import React, {useState,useEffect} from "react";
import { getTopScores } from "../index"
import {Link, useParams} from 'react-router-dom'

function LeaderBoard() {
  const itemNumPerPage = 5
  // const activePageStyle = {backgroundColor: "gray"}

  const { game } = useParams()
  const [scores, setScores] = useState([])
  const [pageIndex, setPageIndex] = useState(0)

  const getScorePage = () => {
    const startingIndex = itemNumPerPage*pageIndex
    const page = scores.slice(startingIndex, startingIndex + itemNumPerPage)
    return page
  }

  const getPageList = () => {
    const pageNum = Math.round(scores.length / itemNumPerPage)
    const result = []
    for (let i = 0; i < pageNum; i++) {
      result.push(i+1)
    }
    return result
  }

  useEffect(() => {
    const showScore = async () => {
      const data = await getTopScores(game)
      const scoreArr = data.map((score, index) => {
        return {...score, rank: index + 1}
      })
      setScores(scoreArr)
    }
    showScore()
  },[])
  return (
    <div className=" bg-white w-4/6 mx-auto mt-24 text-center p-5">
      <h2>Leader Board</h2>

      {/****  Table ******/}
      <table className=" bg-purple-100 mx-auto w-full">
        <tbody>    
        <tr className=" bg-purple-800">
          <th>Rank</th>
          <th>Name</th>
          <th>Score</th>
        </tr>
      {/* {scores?.map((score,index) => */}
      {getScorePage().map((score,index) =>
        <tr key={score.id} className=" bg-purple-400 pt-10">
          <td>{score.rank}</td>
          <td>{score.name}</td>
          <td>{score.score}</td>
        </tr>
        )} 
        </tbody>
      </table>
      
      {/* Page number */}
      <p> 
        {getPageList().map(page =>
          <button onClick={() => { setPageIndex(page - 1) }} key={page} className=" mx-2"> {page} </button>
        )}
      </p>

      <button className=" mt-5 border"><Link to={"/" + game }>Play again</Link></button>
    </div>
  )
}

export default LeaderBoard