import { Router } from "express"
import { AuthenticateUserController } from "./controllers/AuthenticateUserController"
import { CreateComplimentsController } from "./controllers/CreateComplimentsController"
import { CreateTagsController } from "./controllers/CreateTagsController"
import { CreateUserController } from "./controllers/CreateUserController"
import { ensureAdmin } from "./middlewares/ensureAdmin"

const router = Router()

const createUserController = new CreateUserController()
const createTagsControler = new CreateTagsController()
const authenticateUserController = new AuthenticateUserController()
const createComplimentsController = new CreateComplimentsController()

router.post("/new-users", createUserController.handle)


// se usasse router.use(ensureAdmin) todas rotas abaixo passaria obrigatoriamente por autenticação
// em casos assim passar diretamente na tag. OBS: pode passar quantos middlewares quiser
router.post("/new-tags", ensureAdmin, createTagsControler.handle)
router.post("/login", authenticateUserController.handle)
router.post("/compliments", createComplimentsController.handle)

export { router }