import React, { useEffect, useState } from "react";
import { getRandomWord } from "../apiClient";

function Hangman() {
  const clickedStyle = { backgroundColor: "grey" }
  
  const [alphabet, setAlphabet] = useState([])
  const [givenLetters, setLetters] = useState([])
  const [progress, setProgress] = useState([])
  const [guessNum, setGuessNum] = useState(0)
  
  const finished = (progressArr) => {
    return progressArr.every(char => char !== '_')
  } 

  const handleClick = (e, guess, index) => {
    e.target.disabled = true
    setGuessNum(guessNum + 1)

    //gray out clicked button
    const newAlphabet = [...alphabet]
    newAlphabet[index].style = clickedStyle
    setAlphabet(newAlphabet)

    const newProgress = [...progress]
    givenLetters.forEach((givenLetter, index) => {
      if (givenLetter === guess) {
        newProgress[index] = guess
      }
    })
    setProgress(newProgress)
  }


  useEffect(() => {
    // make array for the alphabet buttons
    const alphabetChars = [...'abcdefghijklmnopqrstuvwxyz']
    const alphabetObjs = alphabetChars.map(char => {
      return {char}
    })
    setAlphabet(alphabetObjs)

    //get random word
    const getWord = async () => {
      const randomWord = await getRandomWord()
      const letterArr = randomWord.split('')
      setLetters(letterArr)
      setProgress(Array(letterArr.length).fill('_'))
    }
    getWord()
  }, [])

  return (
    <div className=" mt-24 text-center">
      <h1 className="text-5xl mb-10"> Hangman </h1>
      <p> Guesses: { guessNum } </p>
      <p className=" h-5"> {givenLetters} </p>
      <p> {progress} </p>
      {finished(progress) && <p> You win </p>}
      
      <div className=" flex justify-center mt-5">
        <div className="inline-block max-w-5xl">
          {alphabet.map((item, index) =>
            <button className=" bg-orange-100 w-14 m-1" onClick={(e) => {handleClick(e, item.char, index)}} style= {item.style} key={item.char} > {item.char} </button>
            )}
        </div>
      </div>
    </div>
  )
}

export default Hangman