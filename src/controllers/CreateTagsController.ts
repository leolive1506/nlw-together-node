import { Request, Response } from "express"
import { CreateTagsService } from "../services/CreateTagsService"

class CreateTagsController {
    async handle(req: Request, res: Response) {
        const { name } = req.body

        const createTagsService = new CreateTagsService()

        const tag = await createTagsService.execute(name)
        return res.json(tag)
    }
}


export { CreateTagsController }