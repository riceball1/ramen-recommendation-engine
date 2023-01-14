import { Router } from 'express'
import { deleteRamen, getRamen, postRamen, putRamen } from 'controllers/ramen'
import errorHandler from 'middleware/error-handler'

const ramenRouter = Router()

// Init error handling middleware
ramenRouter.use(errorHandler)

ramenRouter.post('/', postRamen)
ramenRouter.get('/:ramenId?', getRamen)
ramenRouter.put('/:ramenId', putRamen)
ramenRouter.delete('/:ramenId', deleteRamen)

export default ramenRouter
