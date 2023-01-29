import React, {useEffect, useState, useRef} from "react";
import { getSudoku } from "../apiClient";

function Sudoku() {
  const ref = useRef(null)
  const [board, setBoard] = useState([])
  const [givenDigits, setGivenDigits] = useState([])
  const [solution , setSolution] = useState([])
  const [selectedCell, setSelectedCell] = useState([0, 0])
  const [difficulty, setDifficulty] = useState('Medium')
  const [mistakes, setMistakes] = useState(0)
  const [won, setWon] = useState(false)
  const [showGif, setShowGif] = useState(false)
  
  // highLight selected cell
  const getSelectedCellStyle = (iRow, iCol) => {
    if (selectedCell[0] === iRow && selectedCell[1] === iCol) {
      return 'bg-sky-200'
    } else {
      return ''
    }
  }

  
  const getCellTextStyle = (iRow, iCol) => {
    let result = ''

    if (!givenDigits[iRow][iCol]) {
      result = result.concat(' font-semibold')
      if (isDuplicate(iRow, iCol)) {
        result = result.concat(' text-red-500')
      } else {
        result = result.concat(' text-sky-600')
      }
    }
    return result
  }

  const duplicateBgColor = (iRow, iCol) => {
    if (givenDigits.length === 0) {
      return
    }
    else if (givenDigits[iRow][iCol] && isDuplicate(iRow, iCol)) {
      return ' bg-red-100'
    } else {
      return ''
    }
  }

  const isDuplicate = (iRow, iCol) => {
    const currentDigit = board[iRow][iCol]
    // const isGivenDigit = givenDigits[iRow][iCol] === 0
    let result = false

    for (let i = 0; i < 9; i++) {
      // check row duplicate
      if (i !== iCol && board[iRow][i] === currentDigit) {
        result = true
        break
      // check column duplicate
      } else if (i !== iRow && board[i][iCol] === currentDigit) {
        result = true
        break
      }
    }

    //check block duplicate
    if (result === false) {
      const blockRow = Math.floor(iRow/3)
      const blockCol = Math.floor(iCol/3)
      //function to get row and column index base on block index
      const getIndex = (blockIndex) => {
        switch (blockIndex) {
          case 0:
            return [0, 1, 2]
          case 1:
            return [3, 4, 5]
          case 2:
            return [6, 7, 8]
        }
      }
      const iRowArr = getIndex(blockRow)
      const iColArr = getIndex(blockCol)
      //loop through digits in block
      for (const jRow of iRowArr) {
        for (const jCol of iColArr) {
          if (jRow !== iRow && jCol !== iCol && board[jRow][jCol] === currentDigit) {
            result = true
          }
        }
      }
    }

    return result

  }

  const changeSelectedCell = (iRow, iCol) => {
    if (!givenDigits[iRow][iCol]) {
      setSelectedCell([iRow, iCol])
    } 
  }

  const changeDigit = (digit, iRow, iCol) => {
    const inputDigit = Number(digit)
      const newBoard = [...board]
      newBoard[iRow][iCol] = inputDigit
      setBoard(newBoard)
  }

  const moveSelectedCell_keyBoard = (keyCode, iRow, iCol) => {
    switch (keyCode) {
      case 37:
        // move 1 space
        iCol = iCol - 1
        // check if all spaces along the way were checked
        while (iCol !== -1) {
          // if meet a valid space then stop loop
          if (!givenDigits[iRow][iCol]) {
            break
          }
          iCol = iCol - 1
        }
        // set the new selected cell if any qualifies
        if (iCol !== -1 && !givenDigits[iRow][iCol]) {
          setSelectedCell([iRow, iCol])
        }
        break
      case 38:
        iRow = iRow - 1
        while (iRow !== -1) {
          if (!givenDigits[iRow][iCol]) {
            break
          }
          iRow = iRow - 1
        }
        if (iRow !== -1 && !givenDigits[iRow][iCol]) {
          setSelectedCell([iRow, iCol])
        }
        break
      case 39:
        iCol = iCol + 1
        while (iCol !== 9) {
          if (!givenDigits[iRow][iCol]) {
            break
          }
          iCol = iCol + 1
        }
        if (iCol !== 9 && !givenDigits[iRow][iCol]) {
          setSelectedCell([iRow, iCol])
        }
        break
      case 40:
        iRow = iRow + 1
        while (iRow !== 9) {
          if (!givenDigits[iRow][iCol]) {
            break
          }
          iRow = iRow + 1
        }
        if (iRow !== 9 && !givenDigits[iRow][iCol]) {
          setSelectedCell([iRow, iCol])
        }
        break
    }
  }

  const handleKeyDown = (e) => {
    let iRow = selectedCell[0]
    let iCol = selectedCell[1]
    if ('0123456789'.includes(e.key) && !givenDigits[iRow][iCol]) {
      changeDigit(e.key, iRow, iCol)
    }
    //if user is trying to move the selected cell with arrow keys
    else if ([37, 38, 39, 40].includes(e.keyCode)) {
      moveSelectedCell_keyBoard(e.keyCode, iRow, iCol)
    }
  }

  // fetch new sudoku board
  const getNewSudoku = async () => {
    const newSudoku = await getSudoku(difficulty)
    setBoard(newSudoku.value)
    //create a copy of the matrix
    const isGivenArr = newSudoku.value.map(row => row.map(digit => digit !== 0))
    setGivenDigits(isGivenArr)
    setSolution(newSudoku.solution)
  }

  const restart = () => {
    getNewSudoku()
    setMistakes(0)
  }

  //renew board when change difficulty
  useEffect(() => {
    ref.current.focus()
    setMistakes(0)
    getNewSudoku()
  }, [difficulty])
  
  //move the first selected cell if it's on given digits
  useEffect(() => {
    if (givenDigits.length === 0) {
      return
    }
    for (let i = 0; i < 9 ; i++) {
      if (!givenDigits[0][i]) {
        setSelectedCell([0, i])
        break
      }
    }
  }, [givenDigits])
  
  //when user input new digit
  useEffect(() => {
    if (board.length === 0) {
      return
    }
    // get indexes of the modified cell
    const iRow = selectedCell[0]
    const iCol = selectedCell[1]

    //track mistake
    if (board[iRow][iCol] !== 0 && isDuplicate(iRow, iCol)) {
      setMistakes(mistakes + 1)
    }

    //check if user has won
    let wonGame = true
    for (let iRow = 0; iRow < 9; iRow++) {
      for (let iCol = 0; iCol < 9; iCol++) {
        if (board[iRow, iCol] === 0 || isDuplicate(iRow, iCol)) {
          wonGame = false 
          break
        }        
      }
    }
    setWon(wonGame)
    setShowGif(wonGame)
  }, [board])

  //show gif once when user win
  useEffect(() => {
    if (!won) {
      return
    }
    setTimeout(() => {
      setShowGif(false)
    }, 4000);
  }, [won])


  //*** testing code */ 
  // const solve = () => {
  //   setBoard(solution)
  // }
  //*** testing code */ 



  return (
    <div ref={ref} onKeyDown={handleKeyDown} tabIndex={-1} className=" min-h-full w-full absolute top-0">
      {/* content wraper */}
      <div className=" flex justify-center mt-24">
        <div className=" flex flex-col items-center">
          <div className=" h-7">
            {won && <h1> Completed! </h1>}
          </div>
        
          {/* Whole sudoku board */}
          <div className=" relative flex w-72 h-72 bg-white">
            {/* Empty board with border to hold digits */}
              {/* grid for 3 big blocks with heavy border*/}
              <div className=" z-30 absolute grid grid-cols-3 border border-black min-w-max">
                {Array(9).fill().map((item, i) => {
                  return <div key={i} className=" border border-black w-24 h-24">  </div>
                }
                )}
              </div>
              
              {/* cell with light border */}
              <div className=" absolute flex flex-col">
                {Array(9).fill(Array(9).fill()).map((row, iRow) => 
                  <div key={iRow} className=" flex">
                    {row.map((cell, iCol) => <div key={iCol} className={" flex w-8 h-8 border border-slate-300 " + getSelectedCellStyle(iRow, iCol) + duplicateBgColor(iRow, iCol)}> </div>)}
                  </div>
                
                )}
              </div>
              
            {/* Digits */}
              <div className="  border flex flex-col ">
                {board.map((row, iRow)=>
                  <div key={iRow} className="flex">
                    {row.map((digit, iCol) =>
                      <div key={iCol} onClick = {() => changeSelectedCell(iRow, iCol) }  className={"z-40 w-8 h-8 flex justify-center items-center bg-transparent cursor-default "  } >
                        {digit !==0 && <p className={ getCellTextStyle(iRow, iCol)}> {digit} </p>}
                      </div>
                    
                      )}
                  </div>)
                }
              </div>
          
          {/* fireworks gif for winning */}
          {showGif && <div className=" absolute">
            <img src="/sudoku/fireworks.gif" alt="" />
          </div>}
          </div>
          </div>
        
        {/* Game info and features  */}
        <div className=" ml-14">
          <h1 className=" mt-6 mb-6"> Mistakes: { mistakes } </h1>
          <h1> Difficulty: {difficulty} </h1>
          
          <div className=" flex flex-col justify-center">
            <div className=" flex">
              <button onClick={() => setDifficulty('Medium')} className=" px-4 py-2 my-2 rounded-sm bg-rose-300"> Medium </button>
              <button onClick={() => setDifficulty('Hard')} className=" px-4 py-2  my-2 ml-4 rounded-sm bg-rose-300"> Hard </button>
            </div>

            <button onClick={restart} className=" px-4 py-2 mt-7 rounded-sm bg-blue-300"> New game </button>
          </div>
        </div>
      </div>

      {/* testing code */}
      {/* <button onClick={solve}> Solve </button> */}
      {/* testing code */}
    </div>
  )
}

export default Sudoku