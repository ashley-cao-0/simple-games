
import React, { useEffect, useState, useRef } from "react";
import { Link } from "react-router-dom";
import SaveScore from "./SaveScore";

function Snake() {
  const rowNum = 20
  const colNum = 30
  const startingSpeed = 7
  const backgroundColor = 'rgb(226 232 240)'
  const snakeColor = 'rgb(51 65 85)'
  // const foodColor = 'rgb(100 116 139)'
  const foodColor = 'rgb(220 38 38)'
  const cell = {
    backgroundColor: backgroundColor
  }
  //create a matrix
  const gridData = Array(rowNum).fill().map(()=>Array(colNum).fill({...cell}))
  
  const randomNum = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min
  const allCordinates = []
  for (let row = 0; row < rowNum; row++) {
    for (let col = 0; col < colNum; col++) {
      allCordinates.push([row, col])
    } 
  }
  
  const [speed, setSpeed] = useState(startingSpeed)  //cell per second => milisecond per cell = 1/10*1000
  const [grid, setGrid] = useState(gridData)
  const [snake, setSnake] = useState(null)
  const [food, setFood] = useState(null)
  const [direction, setDirection] = useState(0)
  const [myInterval, setMyInterval] = useState(0)
  const [running, setRunning] = useState(false)
  const [gameOver, setGameOver] = useState(false)

  const ref = useRef(null)

  const makeGrid = () => {
    const newGrid = [...gridData]
    snake.forEach(snakePart => {
      const row = snakePart[0]
      const col = snakePart[1]
      newGrid[row][col] = {backgroundColor: snakeColor}
    })
    const row = food[0]
    const col = food[1]
    newGrid[row][col] = {backgroundColor: foodColor}

    return newGrid
  }

  const selfBite = (head, snake) => {
    //check if the new head coordinates indentical with with any body part, except the tail
    const newSnake = [...snake]
    newSnake.pop()
    let result = false
    newSnake.forEach(snakePart => {
      if (snakePart[0] === head[0] && snakePart[1] === head[1]) {
        result = true
      }
    })

    return result
  }

  //function to move snake after a fixed interval, return true if sucessful, false if not
  const moveSnake = (direction) => {
    const head = [...snake[0]]
    let overEdge = false

    switch (direction) {
      //Up
      case -1:
        head[0]--
        if (head[0] < 0) {overEdge = true}
        break;
      
       //Down
      case 1:
        head[0]++
        if (head[0] > rowNum -1) {overEdge = true}
        break;
      
      //Left
      case -2:
        head[1]--
        if (head[1] < 0) {overEdge = true}
        break;

      //Right
      case 2:
        head[1]++
        if (head[1] > colNum -1) {overEdge = true}
        break;

      default:
        break;
      }
    
    //check if move is valid
    if (overEdge || selfBite(head, snake)) {
      return false
    } 
    else {
      snake.unshift(head)
      const hitFood = head.every((Coordinate, index)=> Coordinate === food[index])
      if (hitFood) {
        setFood(makeFood())
        setSpeed(speed => speed + 0.5)
      } else {
        snake.pop()
      }
      setSnake([...snake])
      return true
    }
  }

  function makeFood () {  
    let validCoordinates = [...allCordinates]
    if (snake) {
      snake.forEach(snakePart => {
        validCoordinates = validCoordinates.filter(cell => !cell.every((coordinate, index) => coordinate === snakePart[index]) 
        )
      })
    }

    //TO DO: refine this logic
    if (validCoordinates.length === 0){
      endGame()
    } 
    else {
      const randomIndex = randomNum(0, validCoordinates.length-1)
      return validCoordinates[randomIndex]
    }
  }

  const getDirection = (keyCode) => {
    switch (keyCode) {
      case 37:
        return -2
      case 38:
          return -1
      case 39:
        return 2
      case 40:
        return 1 
      default:
        return 0;
    }
  }

  const handleKeyDown = (e) =>{
    if (gameOver) {
      if (e.keyCode === 13) {
        restart()
      }
      return
    }

    //spacebar to pause game
    if (e.keyCode === 32) {
      pauseGame()
      return
    }

    const newDirection = getDirection(e.keyCode)
    
    //not allow switching to the opposite direction
    if (newDirection === 0 || newDirection + direction === 0) {return}

    setDirection(newDirection)
    
    //if the game is in progress, interval need to be clear
    if ( running ) {
      clearInterval(myInterval)
    } else {
      setRunning(true)
    }

    moveSnake(newDirection)
    const interval = setInterval(() => {
      const snakeMoved = moveSnake(newDirection)
      if (!snakeMoved) {
        clearInterval(interval)
        endGame()
      }
    }, 1/speed*1000);
    setMyInterval(interval)
  }
  

  const pauseGame = () => {
    clearInterval(myInterval)
    setRunning(false)
  }

  const endGame = () => {
    clearInterval(myInterval)
    setGameOver(true)
    setGrid(gridData)
  }

  const restart = () => {
    setGameOver(false)
    setRunning(false)
    setSnake([[rowNum/2, colNum/2]])
    setFood(makeFood())
    setDirection(0)
    setSpeed(startingSpeed)
  }

  useEffect(() => {
    ref.current.focus()
    setSnake([[rowNum/2, colNum/2]])
    setFood(makeFood())
  },[])

  useEffect(() => {
    if (snake){
      setGrid(makeGrid())
    }
  }, [snake])
  
  return (
    <>
      <Link to="/leaderboard/snake" className='absolute z-50 py-3 px-5 m-4 ml-32 text-2xl bg-slate-300 hover:bg-slate-400 duration-150'> Leader board </Link>
      
      <div ref={ref} onKeyDown={handleKeyDown} tabIndex={-1} className=" min-h-full w-full absolute bg-slate-50 top-0 text-slate-800 pb-10">
        <div className=" mt-24 text-center ">
          <h1 className=" text-5xl mb-10"> SNAKE! </h1>
          <h2 className=" mb-3 mx-3 text-2xl inline-block">Score: {snake?.length - 1}</h2>
          
          <div className=" flex flex-col items-center relative ">

          {gameOver && 
            <div className=" absolute h-full z-10 flex items-center">
              <div className="">
                <h1 className=" text-4xl">GAME OVER!</h1>
                <h2 className=" text-lg mt-2"> Press Enter to restart </h2>
              </div>
            </div>
          }

          {/********  Game play area ********/}
            <div className="  border-8 border-slate-700 flex flex-col ">
              {grid.map((row,i)=>
                <div key={i} className="flex">
                  {row.map((item, i)=>{
                    return <div key={i} className=" w-4 h-4 border-0" style={item}></div>}
                    )}
                </div>)
              }
            </div>
          </div>

          {/********  Game instruction ********/}
          <div className=" mt-5 text-xl">
            {!gameOver && 
              <>
                {running  ?
                  <p> Press spacebar to pause </p>
                  :
                  <p> Press any arrow key to start </p>
                } 
              </>
            }
          </div>

          {/********  Save score form ********/}  
          {gameOver && <SaveScore game='snake' score={snake?.length - 1}/>}
        </div>

      </div>
    </>
  )
}

export default Snake