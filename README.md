# Do projeto em si
## Dependencias
```
yarn add express 
yarn add @types/express -D
```
> `Instalar e iniciar TS` (cria um tsconfig.json)
```
yarn add typescript -D
yarn tsc --init
```
* Deixar 
    ```json
     "strict": false,
     "experimentalDecorators": true,
     "emitDecoratorMetadata": true,
     "strictPropertyInitialization": false, 
     
    ```
    * Propriedade JS que coloca algumas checagem dentro do código, como vai fazer pode desabilitar
    * Node por padrão não entende o ts
        * Pra converter pro js
        ```
        yarn tsc
        ```
        * Ou usar `ts-node-dev` (semelhante nodemon)
        ```
        yarn add ts-node-dev -D
        ```

* uuid
    * Gera uuid pelo framework
```
yarn add uuid
yarn add @types/uuid -D
```
```ts
import { v4 as uuid } from "uuid"
```

## Banco Dados
### TYPEORM
#### Instalção
```
yarn add typeorm --save
yarn add reflect-metadata --save
arn add sqlite3
```
> reflect-metadata -> typeorm trabalha com decorators, os @ e ela permite usa-los

```ts
import "reflect-metadata"
```
* Dps escolher um database

* [Escolher uma config](https://typeorm.io/#/using-ormconfig)
    * No video creado um json
    ```
    ormconfig.json
    ```

    * Ex:
    ```json
    {
        "type": "mysql",
        "host": "localhost",
        "port": 3306,
        "username": "test",
        "password": "test",
        "database": "test"
    }
    ```
    * SQLite não precisa passar usuario, senha e porta
        * Para ele database é um arquivo criado na raiz do projeto
        ```json
        database: "src/database/datase.sqlite
        ```
        * Na pasta database, criar um index.ts
        ```ts
            import { createConnection } from "typeorm"

            createConnection()
        ```
	
	* No server
	```
	import "./database"
	```

### MIGRATIONS E CLI
* `MIGRATIONS` Controle de versionamento de tables dentro da aplicação
    * "Github" do banco

* Tem um repositorio que funciona como gerenciador da entedidade no banco de dados
* Tem metodos ja definidos
    * Ex: findOne()
        * SELECT que retorna o primeiro item
    * Ex: save() 
        * funcionar como INSERTED

* `CLI` Ferramenta pra usar no terminal
* No ormconfig
```json
{
    "type": "sqlite",
    "database": "src/database/database.sqlite",
    "cli": {
        "migrationsDir": "src/database/migrations"
    }
}
```

* No package.json
```json
"scripts": {
    "typeorm": "ts-node-dev ./node_modules/typeorm/cli.js"
  },
```


* Executar as migrations
```json
{
    "type": "sqlite",
    "database": "src/database/database.sqlite",
    "migrations": ["src/database/migrations/*.ts"],
    "cli": {
        "migrationsDir": "src/database/migrations"
    }
}
```

```
yarn typeorm migration:run
```
* Remover migration (remove a ultima)
```
yarn typeorm migration:revert
```

* Definir entidades pra ele criar as migrations
    * Oq é uma entidade? Representa a table no código

```json
{
    "type": "sqlite",
    "database": "src/database/database.sqlite",
    "migrations": ["src/database/migrations/*.ts"],
    // usar entities
    "entities": [
        "src/entities/*.ts"
    ],
    "cli": {
        "migrationsDir": "src/database/migrations",
        "entitiesDir": "src/entities"
    }
}
```
* criar migration
```
yarn typeorm migration:create -n NameMigrate

* `Criar entidade`
```
yarn typeorm entity:create -n NameEntity
```
```  


## Repositorio
* Entity (User) <-> ORM <-> BD
    * Quando receber req, simulando fazer uma inserção de user
    * Não consegue diretamente acessar o DB, precisa de uma camada responsável por fazer acesso
    * Os repostórios fazem essa ponte entre entity e db

## Definir uma primary key (FK)
* Precisa ter um campo e saber onde ta vindo
* Precisa que dado na table de origem exista
* Existem duas formas com typeorm
    * Primeira
        ```ts
            name: "compliments",
            columns: [
                {
                    name: "id",
                    type: "uuir",
                    isPrimary: true
                },
                {
                    name: "user_sender",
                    type: "uuid"
                },
            ],
            foreignKeys: [
                {
                    name: "FKUserSenderCompliments",
                    referencedTableName: "users",
                    referencedColumnNames: ["id"],
                    columnNames: ["user_sender"],
                    //quando tiver alguma açãodentro table de origem
                    // ex: usuario mencionado foi removido e oq quer fazer
                    onDelete: "SET NULL",
                    onUpdate: "SET NULL"
                }
        ```
    * Segunda - dps fechar ")" createTable
        ```ts
         await queryRunner.createForeignKey(
            "compliments", // table que ta add foreign key
            new TableForeignKey({
                name: "FKUserSenderCompliments",
                referencedTableName: "users",
                referencedColumnNames: ["id"],
                columnNames: ["user_sender"],
                //quando tiver alguma açãodentro table de origem
                // ex: usuario mencionado foi removido e oq quer fazer
                onDelete: "SET NULL",
                onUpdate: "SET NULL"
            })

        )

        ```
* Diferença entre os dois
    * A primeira não precisa passar campo table e se removesse a table, as foreign keys seriam removidas tb
    * Na 2º no public asyn down, precisaria remover todas foreign keys

* `@ManyToOne(() => Tag)` - Relação muitos para um
    * Ex: Muitos elogios podem ter uma tag em comum, usar many to one -> muitos pra um
    ```ts
    @JoinColumn({ name: "tag_id" })
    @ManyToOne(() => Tag) // muitos elogios pra uma tag
    tag: Tag // tag é a entedida referenciando a table

    ```
## IDEIA TABLES PROJETO
* `USER`
    * (PK) ID (uuid)
    * name (varchar)
    * email (varchar)
    * password (varchar)
    * admin (boolean)
    * created_at (Date)
    * updated_at (Date)

* `TAG`
    * (PK) ID (uuid)
    * name (varchar)
    * created_at (Date)
    * updateed_at (Date)

* `COMPLIMENTS`
    * (PK) ID (uuid)
    * (FK) user_sender (uuid)
    * (FK) user_receiver (uuid)
    * message (varchar)
    * (FK) tag_id (uuid)
    * updateed_at (Date)


## Services 
* Toda regra da aplicação precisa estar em uma camada isolada
* Regras da aplicação

* Cadastro de usuário
    * Não é permitido cadastrar mais de um usuário com o mesmo e-mail
    * Não é permitido cadastrar usuário sem e-mail

* Cadastro de TAG
    * Não é permitido cadastrar mais de uma tag com o mesmo onome
    * Não é permitido cadastrar tag sem nome
    * Não é permitido o cadastro por usuários que não seja admin
    
* Cadastro de elogios
    * Não é permitido um usuário cadastrar um elogio para si
    * Não é permitido cadastrar elogios para usários inválidos
    * Usuário precisa estar autenticado na aplicação

## Controllers
* server -> controller -> service 
* Funciona como req, res 
* Pega informação do server e passa repassa pro service


## Middleware
* Interceptadores dentro de um req
* Interromper ou add alguma informação dentro do middleware
* Algo entre a req e res


## [JWT](https://jwt.io/)
* JSON WEB TOKENS
* Quando faz via token não precisa ficar enviando a todo momento user e password
* Dividido em tres partes
    1. Header
        * typo: jwt
        * algoritimo gerar token
    2. Payload
        * informação passar dentro token
            * Ex: Armazenar id, email, nome, tempo expiração
            * Não passar senha
    3. Verificação assinatura
        * Concatena header + payload + chave secreta (a gente que passa)

```
yarn add jsonwebtoken
yarn add @types/jsonwebtoken
```

* Para gerar token: validar user existe, dados são corretos
    * Nesse caso precisa de email e senha
```ts
import { sign } from "jsonwebtoken"

const token = sign({ // payload
            email: user.email
}, "cd0bc9de3623a46f4c511490d7c8fe4c") //chave secreta
```

## bcryptjs
* Deixar a senha criptografada
```
yarn add bcryptjs
yarn add @types/bcryptjs
```

```ts
import { hash } from "bcryptjs"
const passwordHash = await hash(password, 8) // senha, tamanho

 const user = usersRepositories.create({
            email,
            password: password
        })
```

* Verificar se a senha está correta
```ts
import { compare } from "bcryptjs"

const user = await usersRepositories.findOne({
    email
})
await compare(password, user.password) // primeiro password, segundo o hash
```
## Erros 
### Tratar no código
* Por padrão express não consegue capturar erros async
    ```
    yarn add express-async-errors
    ```
    * no server
    ```ts
    import "express-async-errors"
    ```
* throw new -> lança uma exceção
    * Repassa a exeção p camada acima (no caso o controller)
    * Deixa a camada acima como responsável para tratar a exeção

* Duas formas tratar
    1. Colocar em um try catch
    2. server -> routes -> controller -> service (throw new Error) **Recomendado**
        * Colocar a tratativa no server como sendo um middleware
            * Pega a res que ta vindo das rotas e faz uma tratativa verificando se tem algum erro

        * Colocar dps das rotas
        ```ts
        app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
            // next -> fizer tratativa e quise enviar pra prox nível
            if (err instanceof Error) { // vendo se o erro que ta vindo é do tipo Error
                return res.status(400).json({
                    error: err.message
                })
            }

            return res.status(500).json({
                status: "error",
                message: "Internal Server Error"
            })
        })
        ```
```
throw new
```
* `No terminal`
```
No metadata for "User" was found.
```
* Olhar cominhos das entidades no ormconfig