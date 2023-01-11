import React, {useState, useEffect, useRef} from "react";

function StopTheGhost() {
  const tailwindAnimation = "animate-[shrinkflex_0.5s_ease-in_forwards]"

  const ref = useRef(null)

  const [showInstruction, setShowInstruction ] = useState(false)
  const [buttonName, setButtonName ] = useState('Show instruction')
  const [running, setRunning] = useState(false)
  const [animation, setAnimation] = useState(null)
  const [startTime, setStartTime] = useState(0)
  const [time, setTime] = useState(0)
  const [lost, setLost] = useState(false)
  const [won, setWon] = useState(false)
  const [timeOutID, setTimeOutId] = useState()

  const toggleInstruction = () => {
    if (showInstruction) {
      setButtonName('Show instruction')
    } else {
      setButtonName('Hide instruction')
    }
    setShowInstruction(!showInstruction)
  }

  const getAnimationPlayState = () => {
    if (running) {
      return 'running'
    } else {
      return 'paused'
    }
  }

  const getGhostImgSrc = () => {
    if (lost) {
      return '/stop-the-ghost/ghostSmile.png'
    } else {
      return '/stop-the-ghost/ghost.png'
    }
  }

  const getHumanImgSrc = () => {
    if (lost) {
      return '/stop-the-ghost/humanDead.png'
    } else {
      return '/stop-the-ghost/human.png'
    }
  }

  const getScore = () => {
    if (time >= 490) {
      return 99999
    } else {
      return Math.trunc(100000*Math.pow(time/500,2))
    }
  }

  const startGame = () => {
    setAnimation(tailwindAnimation)
    setStartTime(Date.now())
    const myTimeOut = setTimeout(loseGame, 500);
    setTimeOutId(myTimeOut)
    setRunning(true)
  }

  const loseGame = () => {
    setRunning(false)
    setLost(true)
  }

  const winGame = () => {
    setRunning(false)
    setTime(Date.now() - startTime)
    clearTimeout(timeOutID)
    setWon(true)
  }

  const restart = () => {
    setAnimation(null)
    setWon(false)
    setLost(false)
  }

  const handleKeyDown = (e) => {
    if (e.keyCode === 32) {
      if (running & !lost) {
        winGame()
      } else if (!won && !lost) {
        startGame()
      }
    }
  }

  useEffect(() => {
    ref.current.focus()
  })

  return (
    <div ref={ref} onKeyDown={handleKeyDown} tabIndex={-1} className="  h-full w-full absolute top-0 border-0">
      {/* contend wrapper */}
      <div className=" bg-white w-11/12 mt-20 md:w-3/5 max-w-3xl mx-auto rounded-3xl border border-slate-200 overflow-hidden">   
        
        {/*  game area */}
        <div className=" text-center">  
          <div className=" h-8 mt-5 flex justify-center">
            {won && <p> Score: {getScore()} </p>}
          </div>
          
          {/* characters   */}
          <div className=" flex justify-end px-20 py-12 ">
            <img src= {getGhostImgSrc()} alt="ghost" className=" h-14 sm:h-20 md:h-28 w-auto object-scale-down"/>
            {/* gap between ghost and human */}
            <div className= {" flex-1 " + animation}
              style={{ animationPlayState: getAnimationPlayState() }}>
            </div>
            <img src= {getHumanImgSrc()} alt="human" className=" h-14 sm:h-20 md:h-28 w-auto object-scale-down"/>
          </div>
        </div>

        <div className=" h-8 flex justify-center">
          {(lost || won) && 
            <button onClick={restart} className=" bg-rose-200 px-2"> Try again </button>
          }
        </div>

        <div className="">
          <button className=" mt-5 ml-1 p-1 border-2 bg-slate-100 border-gray-400 rounded-full" onClick={toggleInstruction}>{buttonName}</button>
          { showInstruction && <p className="p-6 pt-2">
            Press the spacebar to start. Press the spacebar again to use your flashlight to stop the ghost from getting you. The closer you let it, the higher score you'll get.
          </p>}
        </div>
      </div>
    </div>
  )
}

export default StopTheGhost