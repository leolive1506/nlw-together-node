import { getCustomRepository } from "typeorm"
import { TagsRepositories } from "../repositories/TagsRepositories"

class CreateTagsService {
    async execute(name: string) {
        const tagsRepositories = getCustomRepository(TagsRepositories)
        if (!name) {
            throw new Error("Incorrect name")
        }

        // SELECT * FROM TAGS WHERER NAME = "name"
        const tagAlreadyExists = await tagsRepositories.findOne({
            name
        })

        if (tagAlreadyExists) {
            throw new Error("Tag already exists")
        }

        const newTag = tagsRepositories.create({
            name
        })

        await tagsRepositories.save(newTag)

        return newTag

    }
}

export { CreateTagsService }