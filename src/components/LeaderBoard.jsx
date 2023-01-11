import React, {useState,useEffect} from "react";
import { getTopScores } from "../index"
import {Link, useParams, useSearchParams} from 'react-router-dom'

function LeaderBoard() {
  const itemPerPage = 10
  const activePageStyle = { backgroundColor: "LightPink" }
  const userScoreStyle = { backgroundColor: "#404040", color: "white"}

  const { game } = useParams()
  const [searchParams] = useSearchParams()
  const scoreId = searchParams.get('scoreId')
  
  const [scores, setScores] = useState([])
  const [pageIndex, setPageIndex] = useState(0)

  const getScorePage = () => {
    const startingIndex = itemPerPage*pageIndex
    const page = scores.slice(startingIndex, startingIndex + itemPerPage)
    return page
  }

  const getPageList = () => {
    const pageNum = Math.ceil(scores.length / itemPerPage)
    const result = []
    for (let i = 0; i < pageNum; i++) {
      if (i === pageIndex) {
        result.push(
          {
            pageNumber: i + 1,
            style: activePageStyle
          }
        )
      } else {
        result.push({ pageNumber: i + 1 })
      }
    }
    return result
  }

  
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
  
  useEffect(() => {
    const showScore = async () => {
      let playerIndex = 0
      const data = await getTopScores(game)
      const scoreArr = data.map((score, index) => {
        if (score.id === scoreId) {
          playerIndex = index
          return {...score, rank: index + 1, style: userScoreStyle}
        } else {
          return {...score, rank: index + 1}
        }
      })
      setScores(scoreArr)
      setPageIndex(Math.floor(playerIndex/itemPerPage))
    }
    showScore()
  }, [])

  return (
    <div className=" flex justify-center">
      <div className=" bg-white inline-block mt-24 text-center py-7 px-20 border">
        <h2 className=" text-2xl text-white mb-2 py-1 bg-cyan-900 border rounded-md">
          {game === 'snake' ? <span> Snake </span> : <span> Math Speed </span>}
          Leader Board
        </h2>

        {/****  Table ******/}
        <table className=" mx-auto w-96">
          <tbody>    
          <tr className=" bg-sky-900 text-lg text-white">
            <th>Rank</th>
            <th>Name</th>
            <th>Score</th>
          </tr>
        {/* {scores?.map((score,index) => */}
        {getScorePage().map(score =>
          <tr key={score.id} className=" bg-sky-200 pt-10 " style = {score.style} >
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

        <button className=" mt-5 border border-gray-400 px-1"><Link to={"/" + game }> Back to game </Link></button>
    </div>
  </div>
  )
}

export default LeaderBoard