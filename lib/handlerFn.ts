/* eslint-disable */
import type { NextApiRequest, NextApiResponse } from "next"

export type handlerFn = (req: NextApiRequest, res: NextApiResponse) => Promise<any> | any