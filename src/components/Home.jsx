import React from "react";
import Card from "./Card";

function Home() {
  const contentList = [
    {
      route: '/snake',
      description: 'Let\'s play snake!',
      img: '/snake.png',
    },
    {
      route: '/mathtest',
      description: 'Test your math Speed',
      img: '/numbers.jpg',
    },
    {
      route: '/hangman',
      description: 'Let\'s play hangman',
      img: '/hangman.jpg',
    },
    {
      route: '/typingtest',
      description: 'Test your typing speed',
      img: '/typing.jpeg',
    },
    {
      route: '/memory',
      description: 'Test your working memory',
      img: 'memory.jpg',
    },
    {
      route: '/stoptheghost',
      description: 'Let\'s play stop the ghost',
      img: 'stop-the-ghost.png',
    },
  
  ]
  return (
    <div className=" flex justify-center items-center mt-24"> 
      <div className=" mt-10 grid gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
        {contentList.map(content => <Card content = {content} key={content.route} />)}
      </div>
    </div>
  )
}

export default Home