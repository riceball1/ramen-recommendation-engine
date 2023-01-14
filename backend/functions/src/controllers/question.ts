import { NextFunction, Request as ExpressRequest, Response } from 'express'
import { DateTime } from 'luxon'
import { v4 } from 'uuid'
import { Question } from 'models/question'
import AppError, { StatusCode } from 'utils/error'
import { db } from 'utils/firebase'

type Request = {
    body: Question
    params: {
        questionId: string
    }
} & Omit<ExpressRequest, 'body' | 'params'>

const getQuestion = async ({ params }: Request, res: Response, next: NextFunction) => {
    const { questionId } = params

    try {
        if (questionId) {
            const entry = await db.collection('question').doc(questionId).get()

            const question = entry.data()
            if (!question) {
                throw new AppError(`Question cannot be found with id: ${questionId}.`, StatusCode.NOT_FOUND)
            }

            return res
                .status(200)
                .send(question)

        } else {
            const question: Question[] = []
            const querySnapshot = await db.collection('question').get()
            querySnapshot.forEach((doc: any) => question.push(doc.data()))

            return res
                .status(200)
                .json(question)
        }

    } catch(error: unknown) {
        return next(error)
    }
}

const postQuestion = async ({ body }: Request, res: Response, next: NextFunction) => {
    try {
        const entry = db.collection('question').doc()

        Object.assign(body, {
            id: v4(),
            created: DateTime.utc().toISO(),
            updated: '',
        })

        const question = await entry.set(body)

        return res
            .status(200)
            .send(question)

    } catch(error: unknown) {
        return next(error)
    }
}



const putQuestion = async ({ body, params }: Request, res: Response, next: NextFunction) => {
    const { questionId } = params

    try {
        const entry = db.collection('question').doc(questionId)
        if (!entry) {
            throw new AppError(`Question cannot be found with id: ${questionId}.`, StatusCode.NOT_FOUND)
        }

        Object.assign(body, {
            updated: DateTime.utc().toISO(),
        })

        const question = await entry.set(body)

        return res
            .status(200)
            .json(question)

    } catch(error: unknown) {
        return next(error)
    }
}

const deleteQuestion = async ({ params }: Request, res: Response, next: NextFunction) => {
    const { questionId } = params

    try {
        const entry = db.collection('question').doc(questionId)

        const question = (await entry.get()).data()
        if (!question) {
            throw new AppError(`Question cannot be found with id: ${questionId}.`, StatusCode.NOT_FOUND)
        }

        await entry.delete()

        return res
            .status(200)
            .json(`${question.name} deleted successfully`)

    } catch(error: unknown) {
        return next(error)
    }
}

export {
    getQuestion,
    postQuestion,
    putQuestion,
    deleteQuestion,
}
