import React, {useState,useEffect} from "react";
import { getTopScores } from "../index"
import {Link, useParams} from 'react-router-dom'

function LeaderBoard() {
  const itemNumPerPage = 5
  const activePageStyle = {backgroundColor: "gray"}

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
      if (i === pageIndex) {
        result.push(
          {
            pageNumber: i + 1,
            style: {backgroundColor: "pink"}
          }
        )
      } else {
        result.push({ pageNumber: i + 1 })
      }
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
  }, [])
  
  const toPreviousPage = () => {
    if (pageIndex > 0) {
      setPageIndex(pageIndex - 1)
    }
  }

  const toNextPage = () => {
    if (pageIndex < getPageList().length - 1 ) {
      setPageIndex(pageIndex + 1)
    }
  }

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
      
      {/* Page numbers */}
      <p className=" mt-4">
        {/* previous page button*/}
        <button onClick={ toPreviousPage } className = " mr-2 px-1 rounded bg-slate-200"> {'<'} </button>

        {/* page list */}
        {getPageList().map(page =>
          <button onClick={() => {setPageIndex(page.pageNumber - 1)}} style = {page.style} className = " px-1 mx-1" key={page.pageNumber}> {page.pageNumber} </button>
        )}

        {/* next page button */}
        <button onClick={ toNextPage } className = " ml-2 px-1 rounded bg-slate-200"> {'>'} </button>
      </p>

      <button className=" mt-5 border"><Link to={"/" + game }>Play again</Link></button>
    </div>
  )
}

export default LeaderBoard