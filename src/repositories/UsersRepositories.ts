import { EntityRepository, Repository } from "typeorm"
import { User } from "../entities/User"

@EntityRepository(User)
class UsersRepositories extends Repository<User> {
    // herda tudo de repository
}

export { UsersRepositories }