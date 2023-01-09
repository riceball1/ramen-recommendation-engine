import { Router } from 'express'
import { deleteQuestion, getQuestion, postQuestion, putQuestion } from 'controllers/question'

const questionRouter = Router()

questionRouter.post('/', postQuestion)
questionRouter.get('/:questionId?', getQuestion)
questionRouter.put('/:questionId', putQuestion)
questionRouter.delete('/:questionId', deleteQuestion)

export default questionRouter
