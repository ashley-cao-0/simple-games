import paragraphs from '../public/random-text.json'
import { randomNum } from './utils';

function getRandomText(minWordNum) {
  let result = ''
  const indexList = []

  const wordCount = (text) => {
    let count = 0
    for (let i = 0; i < text.length; i++) {
      if (text[i] === ' ') {
        count++
      }
    }
    return count + 1  
  }

  const getNewRandomIndex = (indexList) => {
    let result = randomNum(0, paragraphs.length - 1)
    while (indexList.includes(result)) {
      result = randomNum(0, paragraphs.length - 1)
    }
    return result
  }

  // generate text
  while (wordCount(result) < minWordNum) {
    const randomIndex = getNewRandomIndex(indexList)
    indexList.push(randomIndex)
    result = result.concat(paragraphs[randomIndex], ' ')
  }
  
  return result

}

export default getRandomText