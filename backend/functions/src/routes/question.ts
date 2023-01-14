import { Router } from 'express'
import { deleteQuestion, getQuestion, postQuestion, putQuestion } from 'controllers/question'
import errorHandler from 'middleware/error-handler'

const questionRouter = Router()

// Init error handling middleware
questionRouter.use(errorHandler)

questionRouter.post('/', postQuestion)
questionRouter.get('/:questionId?', getQuestion)
questionRouter.put('/:questionId', putQuestion)
questionRouter.delete('/:questionId', deleteQuestion)

export default questionRouter
