import { Response } from 'express'
import { DateTime } from 'luxon'
import { v4 } from 'uuid'
import { Question } from 'models/question'
import { db } from 'utils/firebase'

type Request = {
    body: Question
    params: {
        questionId: string
    }
}

const getQuestion = async ({ params }: Request, res: Response) => {
    const { questionId } = params

    try {
        if (questionId) {
            const entry = await db.collection('question').doc(questionId).get()

            const question = entry.data()
            if (!question) {
                throw new Error()
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
        return res
            .status(500)
            .json((error as any).message)
    }
}

const postQuestion = async ({ body }: Request, res: Response) => {
    try {
        const entry = db.collection('question').doc()

        Object.assign(body, {
            id: v4(),
            created: DateTime.utc().toISO(),
            updated: '',
        })

        const question = await entry
            .set(body)
            .then((value) => value)

        return res
            .status(200)
            .send(question)

    } catch(error: unknown) {
        return res
            .status(500)
            .json((error as any).message)
    }
}



const putQuestion = async ({ body, params }: Request, res: Response) => {
    const { questionId } = params

    try {
        const entry = db.collection('question').doc(questionId)
        if (!entry) {
            throw new Error()
        }

        Object.assign(body, {
            updated: DateTime.utc().toISO(),
        })

        const question = await entry
            .set(body)
            .then((value) => value)
            .catch(error => (
                res
                    .status(400)
                    .json({
                        status: 'error',
                        message: error.message,
                    })
            ))

        return res
            .status(200)
            .json(question)

    } catch(error: unknown) {
        return res
            .status(500)
            .json((error as any).message)
    }
}

const deleteQuestion = async ({ params }: Request, res: Response) => {
    const { questionId } = params

    try {
        const entry = db.collection('question').doc(questionId)

        const question = (await entry.get()).data()
        if (!question) {
            throw new Error()
        }

        await entry
            .delete()
            .catch(error => (
                res
                    .status(400)
                    .json({
                        status: 'error',
                        message: error.message
                    })
            ))

        return res
            .status(200)
            .json(`${question.name} deleted successfully`)

    } catch(error: unknown) {
        return res
            .status(500)
            .json((error as any).message)
    }
}

export {
    getQuestion,
    postQuestion,
    putQuestion,
    deleteQuestion,
}
