import React, {useEffect, useState, useRef} from "react";
import { getSudoku } from "../apiClient";

function Sudoku() {
  const ref = useRef(null)
  const [board, setBoard] = useState([])
  const [selectedCell, setSelectedCell] = useState([0, 0])
  
  const getCellStyle = (iRow, iCol) => {
    if (selectedCell[0] === iRow && selectedCell[1] === iCol) {
      return 'bg-sky-200'
    } else {
      return ''
    }
  }

  const handleKeyDown = (e) => {
    console.log(e.keyCode);
  }

  useEffect(() => {
    ref.current.focus()
    const getNewSudoku = async () => {
      const newSudoku = await getSudoku()
      setBoard(newSudoku.value)
    }
    getNewSudoku()
  },[])
  return (
    <div ref={ref} onKeyDown={handleKeyDown} tabIndex={-1} className=" min-h-full w-full absolute top-0">
      <div className=" flex justify-center mt-24">
      {/* Empty board with border to hold digits */}
        {/* grid for 3 big blocks with heavy border*/}
        <div className=" z-30 absolute grid grid-cols-3 border border-black">
          {Array(9).fill().map((item, i) => {
            return <div key={i} className=" border border-black w-24 h-24">  </div>
          }
          )}
        </div>
        
        {/* cell with light border */}
        <div className=" absolute flex flex-col">
          {Array(9).fill(Array(9).fill()).map((row, iRow) => 
            <div key={iRow} className=" flex">
              {row.map((cell, iCol) => <div key={iCol} className={" flex w-8 h-8 border border-slate-300 " + getCellStyle(iRow, iCol)}> </div>)}
            </div>
          
          )}
        </div>

        <div className="  border flex flex-col ">
          {board.map((row, iRow)=>
            <div key={iRow} className="flex">
              {row.map((digit, iCol) =>
                <div key={iCol} onClick = {() => setSelectedCell([iRow, iCol]) }  className="z-40 w-8 h-8 flex justify-center items-center bg-transparent cursor-default" >
                  {digit !==0 && <p> {digit} </p>}
                </div>
              
                )}
            </div>)
          }
        </div>
      </div>
      </div>
  )
}

export default Sudoku