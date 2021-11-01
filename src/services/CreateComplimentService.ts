import { getCustomRepository } from "typeorm"
import { ComplimentsRepositories } from "../repositories/ComplimentsRepositories"
import { UsersRepositories } from "../repositories/UsersRepositories"

interface IComplimentRequest {
    tag_id: string;
    user_sender: string;
    user_receiver: string;
    message: string
}

// aqui ja vai ta autenticado e validado se é um user valido (atraves middleware)
class CreateComplimentService {
    async execute({ tag_id, user_sender, user_receiver, message }: IComplimentRequest) {
        const complimentsRepositories = getCustomRepository(ComplimentsRepositories)
        const usersRepositories = getCustomRepository(UsersRepositories)

        if (user_sender === user_receiver) {
            throw new Error("Incorrect User Receiver");
        }

        const userReceiverExists = await usersRepositories.findOne({
            id: user_receiver
        })

        if (!userReceiverExists) {
            throw new Error("User Receiver does not exists!");
        }

        const compliments = complimentsRepositories.create({
            tag_id,
            user_sender,
            user_receiver,
            message
        })

        await complimentsRepositories.save(compliments)

        return compliments

    }
}

export { CreateComplimentService }