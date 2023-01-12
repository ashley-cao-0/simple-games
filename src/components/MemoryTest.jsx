import React, {useEffect, useState} from "react";

const MemoryTest = () => {
  const rowNum = 5
  const colNum = 8
  const hiddenCell = {backgroundColor: 'white'}
  // const activeButton = {backgroundColor: 'rgb(107 114 128)', color: 'white'}
  const cell ={
    digit: null,
    style: {}
  }

  // //****** Level selection button******/
  // const [digitButtons, setDigitButton] = useState([])
  // const unstyleButtons = []
  // for (let i = 3; i < 10; i++) {
  //   unstyleButtons.push({
  //     digit: i
  //   })  
  // }


  const emptyGrid = Array(rowNum).fill().map(()=>Array(colNum).fill({...cell}))
  
  const allCoordinates = []
  const coordinateIndexes = []
  for (let row = 0; row < rowNum; row++) {
    for (let col = 0; col < colNum; col++) {
      allCoordinates.push([row, col])
      coordinateIndexes.push(row*colNum + col)
    }
  }
  const randomNum = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min
  
  const [digitNum, setDigitNum] = useState(9)
  
  const getSeries = (digitNumber) => {
    console.log(digitNumber);
    const newSeries = []
    const indexes = [...coordinateIndexes]
    for (let i = 0; i < digitNumber; i++) {
      const randomMetaIndex = randomNum(0, indexes.length-1)
      const randomIndex = indexes[randomMetaIndex]
      newSeries.push(allCoordinates[randomIndex])
      indexes.splice(randomMetaIndex, 1) 
    }
    return newSeries
  }

  const [series, setSeries] = useState([])
  const [grid, setGrid] = useState([...emptyGrid])
  const [numHidden, setNumHidden] = useState(false)
  const [currentDigit, setCurrentDigit] = useState(1)
  const [done, setDone] = useState(false)
  const [numCorrect, setNumCorrect] = useState(0)
  const [trials, setTrials] = useState(0)
  const [time, setTime] = useState(0)
  const [waitTime, setWaitTime] = useState(0)

  const accuracyVsChimp = (numCorrect, trials) => {
    const accuracy = numCorrect/(trials*9)
    const chimpAccuracy = 0.9
    return Math.round((chimpAccuracy/accuracy)*1000)/1000
  }

  const speedVsChimp = (waitTime, trials) => {
    const chimpWaitTime = 500*trials
    return Math.round((waitTime/chimpWaitTime)*1000)/1000
  }

  const makeGrid = () => {
    const newGrid = [...emptyGrid]
    series.forEach((item, i) => {
      const row = item[0]
      const col = item[1]
      newGrid[row][col] = {...cell}
      newGrid[row][col].digit = i + 1
      
    })
    return newGrid
  }

  const hideDigits = () => {
    setNumHidden(true)
    series.forEach(item => {
      const row = item[0]
      const col = item[1]
      grid[row][col].style = {...hiddenCell}
    })
    setWaitTime(waitTime => waitTime + (Date.now() - time))
  }

  const endGame = () => {
    setDone(true)
    setGrid([...emptyGrid])
    setTrials( num => num + 1)
  }

  const restart = () => {
    setCurrentDigit(1)
    setSeries(getSeries(9))
    setDone(false)
    setNumHidden(false)
    setTime(Date.now())
  }
  
  const startTimer = () => {
    setTime(Date.now())
    setSeries(getSeries(9))
  }

  const handleClick = (digit, row, col) => {
    if (done) {
      return
    }

    if (!numHidden) {
      hideDigits()
    }
    
    if (digit === currentDigit) {
      setCurrentDigit (digit => digit + 1)
      setNumCorrect(num => num + 1)
      grid[row][col].style = {opacity: 0}
      if (digit === digitNum) {
        console.log('finished');
        endGame()
      }
    } else {
      console.log('game over');
      endGame()
    }
    
  }
  
  // const changeLevel = (digitNumber) => {
  //   setSeries(getSeries(digitNumber))
  //   setDigitNum(digitNumber)
  //   const index = digitNumber - 3
  //   const newButtons = [...unstyleButtons]
  //   newButtons[index].style = {...activeButton}
  //   setDigitButton(newButtons)
  // }

  // useEffect(() => {
    // buttonInit()
    // setDigitButton(unstyleButtons)
  // },[])

  useEffect(() => {
    setGrid(makeGrid())
  }, [series])

  return ( 
    <>
    <div className=" mt-20 flex flex-col items-center py-5">
      {/* <h2 className=" text-xl mb-2"> Level {digitNum - 2} - {digitNum} digits </h2> */}
      {/* <div className=" text-lg mb-5">
        Number of digits:
        {
          digitButtons.map(button => <button key={button.digit} onClick={() => {changeLevel(button.digit)}} style= {button.style} className= " bg-slate-200 text-gray-700 px-3 py-1 mx-1 text-xl hover:bg-gray-500 hover:text-white"> {button.digit} </button>)
        }
      </div> */}
      <p className=" mb-5"> Click on the numbers in order from 1 to 9 </p>
      <div className=" bg-zinc-700 p-1 mb-6">
        {grid.map((row, iRow) =>
          <div key={iRow} className="flex">
            {row.map((cell, iCol) => {
              return <div key={iCol} onClick = {() => {handleClick(cell.digit, iRow, iCol)}} className=" w-10 h-10 m-1 text-white text-2xl flex items-center justify-center cursor-pointer" style={cell.style} > <span> {cell.digit} </span> </div>}
              )}
          </div>)
        }
      </div>

        {trials > 0  && done &&
          <div className=" w-96 border border-zinc-700 p-2 pl-6">
            <h2 className=" font-bold text-center"> Result </h2>
            <ul className=" list-disc ">
              <li> Trials: { trials } </li>
              <li> Average time taken to start: {Math.round(waitTime/trials/1000)}s </li>
              <li> Average accuracy: {Math.round(numCorrect/(trials*9)*100)}% </li>
              <li className=" font-semibold mb-4"> You are currently {accuracyVsChimp(numCorrect, trials)} times less accurate, and {speedVsChimp(waitTime, trials)} times slower than a chimpazee</li>
              <a href="https://www.youtube.com/watch?v=zsXP8qeFF6A" className=" underline"> Watch how chimpazees do </a>
            </ul>
          </div>
        }

        { (time === 0) &&<button onClick={startTimer} className= " border border-gray-400 py-2 px-4 mt-5 bg-zinc-200 hover:bg-zinc-400"> Start </button>}
        {done && <button onClick={restart} className= " border border-gray-400 py-2 px-4 mt-5 bg-zinc-200 hover:bg-zinc-400"> Try again </button>}
    </div>
    </>
   )
}
 
export default MemoryTest;