// eslint-disable-next-line no-unused-vars
import { async } from '@firebase/util'
import request from 'superagent'
// eslint-disable-next-line no-unused-vars

export async function getRandomParagraphs(){
  const response = await request.get('http://metaphorpsum.com/paragraphs/3')
  const text = response.text
  return text
}

export async function getRandomWord() {
  const response = await request.get('https://api.api-ninjas.com/v1/randomword').set('X-Api-Key', 'wWYBp+wEvygQbwasYSVhTg==ABoCohj4Tv8UiGOj')
  const word = response.body.word
  return word
}

//This api give random sudoku boards with random difficulty. 'Easy' is really rare
export async function getSudoku(difficulty) {
  let newDifficulty = ''
  let sudoku = []
  while (newDifficulty !== difficulty) {
    const response = await request.get('https://sudoku-api.vercel.app/api/dosuku')
    sudoku = response.body.newboard.grids[0]
    newDifficulty = sudoku.difficulty
  }
  return sudoku
}