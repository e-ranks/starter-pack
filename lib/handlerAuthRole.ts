import { handlerFn } from "./handlerFn";
import { getServerSession } from "next-auth";
import type { NextApiRequest, NextApiResponse } from "next";
import { authOptions } from "@/pages/api/auth/[...nextauth]";

const handlerAuthRole = (allowedRoles: string[], handler: handlerFn) => {
    return async (req: NextApiRequest, res: NextApiResponse) => {
        const session = await getServerSession(req, res, authOptions)

        if (!session) return res.status(401).json({ message: 'Unauthorized' })
        if (!session.user.role || !allowedRoles.includes(session.user.role)) return res.status(403).json({ message: 'Forbidden' })

        return handler(req, res)
    }
}

export default handlerAuthRole