// eslint-disable-next-line no-unused-vars
import request from 'superagent'
// eslint-disable-next-line no-unused-vars

export async function getRandomParagraphs(){
  const response = await request.get('http://metaphorpsum.com/paragraphs/3')
  const text = response.text
  return text
}

export async function getRandomWord() {
  const response = await request.get('https://random-word-api.herokuapp.com/word')
  const word = response.body[0]
  return word
}