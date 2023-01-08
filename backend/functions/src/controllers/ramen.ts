import { Response } from 'express'
import { DateTime } from 'luxon'
import { v4 } from 'uuid'
import { Ramen } from 'models/ramen'
import { db } from 'utils/firebase'

type Request = {
    body: Ramen
    params: {
        ramenId: string
    }
}

const getRamen = async ({ params }: Request, res: Response) => {
    const { ramenId } = params

    try {
        if (ramenId) {
            const entry = await db.collection('ramen').doc(ramenId).get()

            const ramen = entry.data()
            if (!ramen) {
                throw new Error()
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
        return res
            .status(500)
            .json((error as any).message)
    }
}

const postRamen = async ({ body }: Request, res: Response) => {
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
        return res
            .status(500)
            .json((error as any).message)
    }
}



const putRamen = async ({ body, params }: Request, res: Response) => {
    const { ramenId } = params

    try {
        const entry = db.collection('ramen').doc(ramenId)
        if (!entry) {
            throw new Error()
        }

        Object.assign(body, {
            updated: DateTime.utc().toISO(),
        })

        const ramen = await entry
            .set(body)
            .catch(error => (
                res.status(400).json({
                    status: 'error',
                    message: error.message,
                })
            ))

        return res
            .status(200)
            .json(ramen)

    } catch(error: unknown) {
        return res
            .status(500)
            .json((error as any).message)
    }
}

const deleteRamen = async ({ params }: Request, res: Response) => {
    const { ramenId } = params

    try {
        const entry = db.collection('ramen').doc(ramenId)

        const ramen = (await entry.get()).data()
        if (!ramen) {
            throw new Error()
        }

        await entry
            .delete()
            .catch(error => (
                res.status(400).json({
                    status: 'error',
                    message: error.message
                })
            ))

        return res
            .status(200)
            .json(`${ramen.name} deleted successfully`)

    } catch(error: unknown) {
        return res
            .status(500)
            .json((error as any).message)
    }
}

export {
    getRamen,
    postRamen,
    putRamen,
    deleteRamen,
}
