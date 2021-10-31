import { Router } from "express"
import { CreateTagsController } from "./controllers/CreateTagsController"
import { CreateUserController } from "./controllers/CreateUserController"
import { ensureAdmin } from "./middlewares/ensureAdmin"

const router = Router()

const createUserController = new CreateUserController()

const createTagsControler = new CreateTagsController()


router.post("/new-users", createUserController.handle)


// se usasse router.use(ensureAdmin)
// todas rotas abaixo passaria obrigatoriamente por autenticação
// em casos assim passar diretamente na tag
// pode passar quantos middlewares quiser
router.post("/new-tags", ensureAdmin, createTagsControler.handle)

export { router }