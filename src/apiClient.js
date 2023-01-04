// eslint-disable-next-line no-unused-vars
import request from 'superagent'
// eslint-disable-next-line no-unused-vars
const scoreUrl = '/api/v1/scores/'

export async function saveScore(name, scoreId){
  await request.patch(scoreUrl+scoreId).send({name})
}

export async function saveAnonymousScore(score){
  const response = await request.post('/api/v1/scores').send({name:'anonymous', score})
    const id = await response.body.id[0]
  return id
}

export async function getTopScore(scoreNum){
  const response = await request.get('/api/v1/scores/top/'+scoreNum)
  const data = await response.body
  console.log(data);
  return data
}

export async function getRandomParagraphs(){
  const response = await request.get('http://metaphorpsum.com/paragraphs/3')
  const text = response.text
  console.log(response)
  return text
}

export async function getRandomWord() {
  const response = await request.get('https://random-word-api.herokuapp.com/word')
  const word = response.body[0]
  return word
}