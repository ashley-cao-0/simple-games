import React, { useEffect, useState } from "react";
import { getRandomWord } from "../apiClient";

function Hangman() {
  const clickedStyle = { backgroundColor: "grey" }
  
  const [alphabet, setAlphabet] = useState([])
  const [givenLetters, setLetters] = useState([])
  const [progress, setProgress] = useState([])
  const [wrongGuesses, setWrongGuesses] = useState(0)
  
  const won = () => {
    if (progress.length === 0) {
      return false
    }
    return progress.every(char => char !== '_')
  }
  
  const lost = () => {
    return (wrongGuesses === 10 && !won())
  }

  const getStrokes = () => {
    const result = []
    for (let i = 0; i < wrongGuesses; i++) {
      result.push(i+1)
    }
    return result
  }

  const handleClick = (e, guess, index) => {
    e.target.disabled = true

    //gray out clicked button
    const newAlphabet = [...alphabet]
    newAlphabet[index].style = clickedStyle
    setAlphabet(newAlphabet)

    //check guess
    let rightGuess = false
    const newProgress = [...progress]
    givenLetters.forEach((givenLetter, index) => {
      if (givenLetter === guess) {
        newProgress[index] = guess
        rightGuess = true
      }
    })
    if (!rightGuess) {
      setWrongGuesses(wrongGuesses + 1)
    }

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

      <div className=" flex">
        <div className=" w-96 relative">
          {getStrokes().map(strokeNum =>
            <img src={`/hangman/${ strokeNum }.png`} alt={"stroke " + strokeNum} className=" absolute" />
          )}
        </div>

        <div>
          <p> Wrong guesses: { wrongGuesses } </p>
          <p className=" h-5"> {givenLetters} </p>
          <p> {progress} </p>
          {won() && <p> You win </p>}
          {lost() && <p> You lose </p>}
          
          <div className=" flex justify-center mt-5">
            <div className="inline-block max-w-5xl">
              {alphabet.map((item, index) =>
                <button className=" bg-orange-100 w-14 m-1" onClick={(e) => {handleClick(e, item.char, index)}} style= {item.style} key={item.char} > {item.char} </button>
                )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Hangman