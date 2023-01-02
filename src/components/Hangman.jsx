import React, { useEffect, useState } from "react";
import { getRandomWord } from "../apiClient";

function Hangman() {
  const [word, setWord] = useState()

  useEffect(() => {
    const getWord = async () => {
      const randomWord = await getRandomWord()
      setWord(randomWord)
    }
    getWord()
  }, [])

  return (
    <div className=" mt-24 text-center ">
      <h1 className="text-5xl mb-10"> Hangman </h1>
      <p> { word } </p>
    </div>
  )
}

export default Hangman