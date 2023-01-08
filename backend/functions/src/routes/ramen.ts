import { Router } from 'express'
import { deleteRamen, getRamen, postRamen, putRamen } from 'controllers/ramen'

const ramenRouter = Router()

ramenRouter.post('/', postRamen)
ramenRouter.get('/:ramenId?', getRamen)
ramenRouter.put('/:ramenId', putRamen)
ramenRouter.delete('/:ramenId', deleteRamen)

export default ramenRouter
