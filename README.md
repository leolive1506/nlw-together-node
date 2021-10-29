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
    * Oq é uma entidade? Pode ser referenciada como uma tabela que tem como base uma tabela
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
        "entitiesDir": "src/entity"
    }
}
```

```
yarn typeorm migration:create -n User
```


### COMANDOS TYPYORM
* Criar uma entidade
```
yarn typeorm migration:create -n NameMigrate
```
    
## Repositorio
* Entity (User) <-> ORM <-> BD
    * Quando receber req, simulando fazer uma inserção de user
    * Não consegue diretamente acessar o DB, precisa de uma camada responsável por fazer acesso
    * Os repostórios fazem essa ponte entre entity e db


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
