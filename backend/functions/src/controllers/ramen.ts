import { Response } from 'express'
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

            return res
                .status(200)
                .send({
                    status: 'success',
                    message: 'Ramen added successfully',
                    data: entry,
                })

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

        await entry.set(body)

        return res
            .status(200)
            .send({
                status: 'success',
                message: 'Ramen added successfully',
                data: body,
            })

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

        await entry
            .set(body)
            .catch(error => (
                res.status(400).json({
                    status: 'error',
                    message: error.message,
                })
            ))

        return res
            .status(200)
            .json({
                status: 'success',
                message: 'Ramen updated successfully',
                data: body,
            })
    }
    catch(error: unknown) {
        return res
            .status(500)
            .json((error as any).message)
    }
}

const deleteRamen = async ({ params }: Request, res: Response) => {
    const { ramenId } = params

    try {
        const entry = db.collection('ramen').doc(ramenId)

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
            .json({
                status: 'success',
                message: 'Ramen deleted successfully',
            })

    }
    catch(error: unknown) {
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