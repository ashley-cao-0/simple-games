import React, {useState, useRef} from "react";
import getRandomText from "../getRandomText";

function TypingTest() {
  const inputRef = useRef(null)
  const [textToType, setTextToType] = useState(getRandomText(120))
  const [typedText, setTypedText] = useState('')
  const [time, setTime] = useState(0)
  const [myInterval, setmyInterval] = useState(0)
  const [started, setStarted] = useState(false)

  const handleChange = (e) =>{
    if (!started) {start()}
    const inputValue = e.target.value 
    const char = inputValue.charAt(inputValue.length-1)
    if (char===textToType.charAt(0)){
      setTextToType(text=>text.substring(1))
      setTypedText(typedText+char)
    }
  }

  const handleClick = () =>{
    inputRef.current.focus()
  }

  const start = () => {
    setStarted(true)
    const interval = setInterval(()=>{
      setTime(time=>time+1)
    },1000)
    setmyInterval(interval)
  }

  const stop = () =>{
    clearInterval(myInterval)
  }

  const timerRender = (seconds) =>{
    const minute = Math.floor(seconds/60)
    const remainSeconds = seconds%60
    const minuteString = minute.toString().padStart(2,'0')
    const secondString = remainSeconds.toString().padStart(2,'0')
    return minuteString+':'+secondString
  }
  
  const typingSpeed = (text, time) =>{
    const minute = time/60
    const spaces = text.match(/([\s]+)/g)  //get all spaces
    if (spaces) {
      const wordNum = spaces.length +1
      return Math.floor(wordNum/minute)
    } else {return 0}
  }

  return (
    <div className=" text-center mt-28">
      <h2 className=" text-2xl">Typing speed test</h2>

      <h2 className=" text-center text-xl my-6">Time: {timerRender(time)}</h2>
      <h2 className=" text-center text-xl">Your typing speed: {typingSpeed(typedText, time)} WPS </h2>
      <div className=" w-1/2 mx-auto mt-5 bg-white p-4 rounded-md" onClick={handleClick}>
        <p className=" text-left"> 
          <span className=" text-green-700 font-semibold">{typedText}</span>
          <span className=" bg-blue-300">{textToType.charAt(0)}</span>
          {textToType.substring(1)}
        </p>
      </div>

      <button onClick={stop} className=" border bg-red-400 hover:bg-red-500 duration-100 mt-5 py-2 px-4">Stop</button>

      <form className=" opacity-0">
        <input type="text" autoFocus ref={inputRef} onChange={handleChange} className=" "/>
      </form>
    </div>
  )
}

export default TypingTest