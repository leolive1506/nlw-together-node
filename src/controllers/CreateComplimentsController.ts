import { Request, Response } from "express";
import { CreateComplimentService } from "../services/CreateComplimentService";

class CreateComplimentsController {
    async handle(req: Request, res: Response) {
        const { tag_id, user_sender, user_receiver, message } = req.body

        const createComplimentService = new CreateComplimentService()


        const compliments = await createComplimentService.execute({ tag_id, user_sender, user_receiver, message })

        return res.json(compliments)
    }
}

export { CreateComplimentsController }