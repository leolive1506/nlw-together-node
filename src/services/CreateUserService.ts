import { getCustomRepository } from "typeorm"
import { UsersRepositories } from "../repositories/UsersRepositories"

interface IUserRequest {
    name: string,
    email: string,
    admin?: boolean
}

// tudo que for relacionado a criação de user
class CreateUserService {
    async execute({ name, email, admin }: IUserRequest) {

        // ver se o usuário está cadastrado
        // como ta usando repositorio customizado, não pode dar um new UsersRepositories()
        // precisa falar que quer usar um repositorio customizado
        const usersRepositories = getCustomRepository(UsersRepositories)

        // enviar sem email
        if (!email) {
            throw new Error("Email incorrect");
        }

        const userAlreadyExists = await usersRepositories.findOne({
            // qual atributo que quer pesquisar
            email
        })

        // se tiver o email no banco
        if (userAlreadyExists) {
            throw new Error("User already exists")
        }

        // p salvar fazer dois processos
        // 1. criar instancia do obj
        const user = usersRepositories.create({
            name,
            email,
            admin
        })

        // 2. salvar
        await usersRepositories.save(user)

        return user
    }
}

export { CreateUserService }