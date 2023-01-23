import React, {useEffect, useState} from "react";
import { getSudoku } from "../apiClient";

function Sudoku() {
  const [board, setBoard] = useState([])
  const [selectedCell, setSelectedCell] = useState([0,0])

  useEffect(() => {
    const getNewSudoku = async () => {
      const newSudoku = await getSudoku()
      setBoard(newSudoku.value)
    }
    getNewSudoku()
  },[])
  return (
    <div className=" mt-24">
      <div className=" flex justify-center">
      {/* Empty board with border to hold digits */}
        {/* grid for 3 big blocks with heavy border*/}
        <div className=" z-40 absolute grid grid-cols-3 border border-black">
          {Array(9).fill().map((item, i) => {
            return <div key={i} className=" border border-black w-24 h-24">  </div>
          }
          )}
        </div>
        
        {/* cell with light border */}
        <div className=" absolute flex flex-col border">
          {Array(9).fill(Array(9).fill()).map((row, i) => 
            <div key={i} className=" flex">
              {row.map((cell, i) => <div key={i} className=" flex w-8 h-8 border"> </div>)}
            </div>
          
          )}
        </div>

        <div className="  border flex flex-col ">
          {board.map((row, iRow)=>
            <div key={iRow} className="flex">
              {row.map((digit, iCol) =>
                <div key={iCol} onClick = {() => setSelectedCell([iRow, iCol]) }  className=" z-50 w-8 h-8 flex justify-center items-center bg-transparent" >
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