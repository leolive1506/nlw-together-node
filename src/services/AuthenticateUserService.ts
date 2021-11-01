import { getCustomRepository } from "typeorm"

import { compare } from "bcryptjs"
import { sign } from "jsonwebtoken"
import { UsersRepositories } from "../repositories/UsersRepositories"

interface IAuthenticateRequest {
    email: string;
    password: string
}

class AuthenticateUserService {
    async execute({ email, password }: IAuthenticateRequest) {
        // recuperar repositorio user
        const usersRepositories = getCustomRepository(UsersRepositories)
        const messageError = "Email/Password incorrect"

        const user = await usersRepositories.findOne({
            email
        })
        // verificar se email existe
        if (!user) {
            // se tiver alguem querendo rackear acesso, informações. Colocando Email / password fica na dúvida se email ou senha está incorreto
            throw new Error(messageError)
        }

        // verificar se senha está correta
        const passwordMatch = await compare(password, user.password) // primeiro password, segundo o hash
        if (!passwordMatch) {
            throw new Error(messageError)
        }

        // gerar token
        const token = sign({ // payload
            email: user.email
        }, "cd0bc9de3623a46f4c511490d7c8fe4c", {
            subject: user.id,
            // normalmente usa refresh token
            // token de expiração menor e refresh token
            // quando token expira, em vez precisar inserir senha e email de novo, cada X tempo gera um novo token baseado no refresh token
            expiresIn: "1d"
        })

        return token
    }
}

export { AuthenticateUserService }