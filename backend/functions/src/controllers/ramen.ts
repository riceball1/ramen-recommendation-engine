import { NextFunction, Request as ExpressRequest, Response } from 'express'
import { DateTime } from 'luxon'
import { v4 } from 'uuid'
import { Ramen } from 'models/ramen'
import AppError, { StatusCode } from 'utils/error'
import { db } from 'utils/firebase'

type Request = {
    body: Ramen
    params: {
        ramenId: string
    }
} & Omit<ExpressRequest, 'body' | 'params'>

const getRamen = async ({ params }: Request, res: Response, next: NextFunction) => {
    const { ramenId } = params

    try {
        if (ramenId) {
            const entry = await db.collection('ramen').doc(ramenId).get()

            const ramen = entry.data()
            if (!ramen) {
                throw new AppError(`Ramen cannot be found with id: ${ramenId}.`, StatusCode.NOT_FOUND)
            }

            return res
                .status(200)
                .send(ramen)

        } else {
            const ramen: Ramen[] = []
            const querySnapshot = await db.collection('ramen').get()
            querySnapshot.forEach((doc: any) => ramen.push(doc.data()))

            return res
                .status(200)
                .json(ramen)
        }

    } catch(error: unknown) {
        return next(error)
    }
}

const postRamen = async ({ body }: Request, res: Response, next: NextFunction) => {
    try {
        const entry = db.collection('ramen').doc()

        Object.assign(body, {
            id: v4(),
            created: DateTime.utc().toISO(),
            updated: '',
        })

        const ramen = await entry.set(body)

        return res
            .status(200)
            .send(ramen)

    } catch(error: unknown) {
        return next(error)
    }
}



const putRamen = async ({ body, params }: Request, res: Response, next: NextFunction) => {
    const { ramenId } = params

    try {
        const entry = db.collection('ramen').doc(ramenId)
        if (!entry) {
            throw new AppError(`Ramen cannot be found with id: ${ramenId}.`, StatusCode.NOT_FOUND)
        }

        Object.assign(body, {
            updated: DateTime.utc().toISO(),
        })

        const ramen = await entry.set(body)

        return res
            .status(200)
            .json(ramen)

    } catch(error: unknown) {
        return next(error)
    }
}

const deleteRamen = async ({ params }: Request, res: Response, next: NextFunction) => {
    const { ramenId } = params

    try {
        const entry = db.collection('ramen').doc(ramenId)

        const ramen = (await entry.get()).data()
        if (!ramen) {
            throw new AppError(`Ramen cannot be found with id: ${ramenId}.`, StatusCode.NOT_FOUND)
        }

        await entry.delete()

        return res
            .status(200)
            .json(`${ramen.name} deleted successfully`)

    } catch(error: unknown) {
        return next(error)
    }
}

export {
    getRamen,
    postRamen,
    putRamen,
    deleteRamen,
}
