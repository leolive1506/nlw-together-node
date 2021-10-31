import { Request, Response, NextFunction } from "express";

export function ensureAdmin(req: Request, res: Response, next: NextFunction) {
    // verificar se user admin
    const admin = true

    if (admin) {
        return next()
    }

    // se não for admin
    return res.status(401).json({
        error: "Unauthorized"
    })
}