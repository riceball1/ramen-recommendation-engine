import * as bodyParser from 'body-parser'
import * as functions from 'firebase-functions'
import * as express from 'express'
import { cors } from 'middleware'
import { ramenRouter, questionRouter } from 'routes'
import { ramenRouter } from 'routes'

const app = express()

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(cors)

app.get('/', (req, res) => res.status(200).send('Need ramen?'))

app.use('/ramen', ramenRouter)
app.use('/question', questionRouter)

exports.app = functions.https.onRequest(app)
