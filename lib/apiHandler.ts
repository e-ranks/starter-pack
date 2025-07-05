/* eslint-disable */
import type { NextApiRequest, NextApiResponse } from "next"

type Method = 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH'
type Handler = (req: NextApiRequest, res: NextApiResponse) => any

const apiHandler = () => {
    const routes: Partial<Record<Method, Handler>> = {}

    const handler = async (req: NextApiRequest, res: NextApiResponse) => {
        const method = req.method as Method
        const fn = routes[method]

        if (!fn) return res.status(405).json({ message: `Method ${method} Not Allowed` })
        return fn(req, res)
    }

    handler.get = (fn: Handler) => {
        routes.GET = fn
        return handler
    }

    handler.put = (fn: Handler) => {
        routes.PUT = fn
        return handler
    }

    handler.post = (fn: Handler) => {
        routes.POST = fn
        return handler
    }

    handler.patch = (fn: Handler) => {
        routes.PATCH = fn
        return handler
    }

    handler.delete = (fn: Handler) => {
        routes.DELETE = fn
        return handler
    }

    return handler
}

export default apiHandler