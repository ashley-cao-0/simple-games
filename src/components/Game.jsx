import React, {useState} from "react";

function Game () {
  const speed = 4
  const [x, setX] = useState(0)
  const [y, setY] = useState(0)
  const [cordinates, setCordinates] = useState([])

  const handleKeyDown = (e) =>{
    console.log('test', e.keyCode)

      switch (e.keyCode) {
        //left
        case 37:
          setX(x=>x-speed)
          break;

        //up
        case 38:
          setY(y=>y-speed)
          break;

        //right
        case 39:
          setX(x=>x+speed)
          break;

          //down
        case 40:
          setY(y=>y+speed)
          break;
        case 32:
          setY1(y)
          setCordinates(cordinates=>[...cordinates, {
            top: y+'px', 
            left: x+'px'
          }])

        default:
          break;
      }

  }


  const [y1, setY1] = useState(y)

  return (
    <div onKeyDown={handleKeyDown} tabIndex={-1}>
      {/* <form>
        <input type="text" onKeyDown={handleKeyDown} onKeyUp={handleKeyUp} tabIndex="0"/>
      </form> */}
      <div className=" relative w-64 h-36 bg-white mx-auto overflow-hidden" >
        <div style={{transform:`translate(${x}px, ${y}px)`}} className="w-3 h-3 bg-black"></div>
        {cordinates.map(cordinate=> <div style={cordinate} className="w-3 h-3 bg-black absolute animate-[goleft_5s_linear_forwards]"></div>)}
      </div>
    </div>
  )
}

export default Game 