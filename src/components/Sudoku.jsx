import React, {useEffect, useState, useRef} from "react";
import { getSudoku } from "../apiClient";

function Sudoku() {
  const ref = useRef(null)
  const [board, setBoard] = useState([])
  const [initialBoard, setInitialBoard] = useState([])
  const [selectedCell, setSelectedCell] = useState([0, 0])
  const [difficulty, setDifficulty] = useState('Medium')
  
  // highLight selected cell
  const getSelectedCellStyle = (iRow, iCol) => {
    if (selectedCell[0] === iRow && selectedCell[1] === iCol) {
      return 'bg-sky-200'
    } else {
      return ''
    }
  }

  const isGivenDigit = (iRow, iCol) => {
    if (initialBoard.length !== 0) {
      return initialBoard[iRow][iCol] !== 0
    } else {
      return false
    }
  }
  
  const getCellTextStyle = (iRow, iCol) => {
    let result = ''

    if (!isGivenDigit(iRow, iCol)) {
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
    if (isGivenDigit(iRow, iCol) && isDuplicate(iRow, iCol)) {
      return ' bg-red-100'
    } else {
      return ''
    }
  }

  const isDuplicate = (iRow, iCol) => {
    const currentDigit = board[iRow][iCol]
    // const isGivenDigit = initialBoard[iRow][iCol] === 0
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
    if (!isGivenDigit(iRow, iCol)) {
      setSelectedCell([iRow, iCol])
    } 
  }

  const handleKeyDown = (e) => {
    const row = selectedCell[0]
    const col = selectedCell[1]
    if ('123456789'.includes(e.key) && initialBoard[row][col] === 0) {
      const inputDigit = Number(e.key)
      const newBoard = [...board]
      newBoard[row][col] = inputDigit
      setBoard(newBoard)
    }
  }

  // fetch new sudoku board
  const getNewSudoku = async () => {
    const newSudoku = await getSudoku(difficulty)
    setInitialBoard(newSudoku.value)
    //create a copy of the matrix
    const newSudokuValue2 = newSudoku.value.map(row => row.map(digit => digit))
    setBoard(newSudokuValue2)
  }

  useEffect(() => {
    ref.current.focus()
    getNewSudoku()
  }, [difficulty])
  
  //move the first selected cell if it's on given digits
  useEffect(() => {
        for (let i = 0; i < 9 ; i++) {
          if (!isGivenDigit(0, i)) {
            setSelectedCell([0, i])
            break
          }
        }
    }, [initialBoard])

  return (
    <div ref={ref} onKeyDown={handleKeyDown} tabIndex={-1} className=" min-h-full w-full absolute top-0">
      {/* content wraper */}
      <div className=" flex justify-center mt-24">
        <div className=" relative flex justify-center w-72 h-72">
        {/* Whole sudoku board */}
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
        </div>
        
        <div className=" ml-10">
          <h1> Difficulty: {difficulty} </h1>
          
          <div className=" flex flex-col justify-center">
            <div className=" flex">
              <button onClick={() => setDifficulty('Medium')} className=" px-4 py-2 my-2 rounded-sm bg-rose-300"> Medium </button>
              <button onClick={() => setDifficulty('Hard')} className=" px-4 py-2  my-2 ml-4 rounded-sm bg-rose-300"> Hard </button>
            </div>

            <button onClick={getNewSudoku} className=" px-4 py-2 mt-7 rounded-sm bg-blue-300"> New game </button>
          </div>

        </div>
      </div>

      
      </div>
  )
}

export default Sudoku