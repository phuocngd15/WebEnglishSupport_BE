import express from 'express'
import { json, urlencoded } from 'body-parser'
import morgan from 'morgan'
import cors from 'cors'
import cardRouter from './resources/cards/card.router'
export const app = express()

app.disable('x-powered-by')

app.use(cors())
app.use(json())
app.use(
  urlencoded({
    extended: true
  }) // alow use parameter when req
)
app.use(morgan('dev'))

app.use('/api/card', cardRouter)

export const start = () => {
  app.listen(3001, () => {
    console.log('server is on 3001')
  })
}
