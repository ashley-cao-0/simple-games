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

export async function getSudoku() {
  const response = await request.get('https://sudoku-api.vercel.app/api/dosuku')
  const sudoku = response.body.newboard.grids[0]
  return sudoku
}