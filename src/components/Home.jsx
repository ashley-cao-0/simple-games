import React from "react";
import Card from "./Card";

function Home() {
  const contentList = [
    {
      route: '/mathtest',
      description: 'Test your math Speed',
      img: '/numbers.jpg',
    },
    {
      route: '/typingtest',
      description: 'Test your typing speed',
      img: '/typing.jpeg',
    },
    {
      route: '/snake',
      description: 'Let\'s play snake!',
      img: '/snake.png',
    },
    {
      route: '/memory',
      description: 'Test your working memory',
      img: 'memory.jpg',
    },
    {
      route: '/game',
      description: 'WIP game',
      img: '/blank.jpg',
    },
  ]
  return (
    <div className=" flex justify-center items-center mt-24"> 
      <div className=" mt-10 grid gap-4 grid-cols-2">
        {contentList.map(content => <Card content = {content} key={content.route} />)}
      </div>
    </div>
  )
}

export default Home