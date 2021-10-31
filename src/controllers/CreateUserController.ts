import { Request, Response } from "express"
import { CreateUserService } from "../services/CreateUserService"


class CreateUserController {
    async handle(req: Request, res: Response) {
        // recuperar nameUser, email, admin de dento da req
        const { name, email, admin } = req.body
        const createUsersService = new CreateUserService()

        const user = await createUsersService.execute({ name, email, admin })


        return res.json(user)
    }
}

export { CreateUserController }