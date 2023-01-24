import React from "react";
import Card from "./Card";

function Home() {
  const contentList = [
    {
      route: '/snake',
      description: 'Snake!',
      img: '/snake.jpg',
    },
    {
      route: '/mathtest',
      description: 'Test your math Speed',
      img: '/math.jpg',
    },
    {
      route: '/hangman',
      description: 'Hangman',
      img: '/hangman.jpg',
    },
    {
      route: '/sudoku',
      description: 'Sudoku',
      img: '/sudoku.jpg',
    },
    {
      route: '/typingtest',
      description: 'Test your typing speed',
      img: '/typing.jpg',
    },
    {
      route: '/memory',
      description: 'Test your working memory',
      img: 'memory.png',
    },
    {
      route: '/stoptheghost',
      description: 'Stop the ghost',
      img: 'stop-the-ghost.png',
    },
  
  ]
  return (
    <>
      <h1 className=' text-6xl mt-24 text-center'>Simple games</h1>
      <div className=" flex justify-center items-center mt-12 mb-16"> 
        <div className=" grid gap-8 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
          {contentList.map(content => <Card content = {content} key={content.route} />)}
        </div>
      </div>
    </>
  )
}

export default Home