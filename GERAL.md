# Apresentação projeto
## `NLW VALORIZA`

* Cadastro de usuário
* Cadastro de tags(elogios possíveis) <br />
    * Somente para adms
* Cadastro de elogios
    * ID user que vai receber elogio <br />
    * ID do user qeu está enviando elogio <br />
    * ID tag <br />
    * Data criação

* Autenticação do user
    * Gerar token JWT
    * Validar usuário logado nas rotas

* Listagem de usuários
* Listagem de tags
* Listagem de elogios por usuários

# Oq é node
* Faz req de forma assincrona, sem bloqueio
* Event Loop -> quem recebe as req
    * Tem um single thread
        * Faz processamento das req    
    * Disponível 4 threads por padrão
    * Non-blocking IO
        * Não espera termina a req pra processar as prox
        * Muito mais vel
    * Vem com alguns pacotes / modulos por padrão

# Oq é API
* Não é
    * algo p instalar
    *  programa pra config / utlizar pela web
    * Não é uma dependência

* É com conceito sobre criação de um projeto
    * Padrões dentro projeto para qeu seja entendido como API


* `Antes` tinha um único projeto que era responsável por executar tudo
    * Deixava mais lento
    * Se fosse criar moblie, precisava duplicar tudo

* `Agora com API`
    * Cliente(html, css, js) e servidor
    * Cliente faz uma solicitação servidor (req / rotas)
    * Servidor retorna resposta para o client
    * **Oq define ser uma API**
        * Tem um server com recursos dentro da API
            * Rotas que client vai solicitar pra API

        * Backend com recurso sendo chamado(fazendo req)

# Por que usar TS
* É uma ferramenta que possibilita dar uma "identidade"
* Só usa em ambiente de desenvolvimento
    * Quando colocar em produção é preciso converter pra js
* Produtividade maior, maior clareza do que passar
* Força as variaveis pra ser de algum tipo
    * nomeVariavel: tipoDela
        * ex: 
        ```ts
        function sendEmail(name: string, email: string, tel: number) {}
        ```

    * Evita erros em produção

    * Pode definir por meio de uma interface tb
    ```ts
    interface Usuario {
        nome: string,
        email: string,
        tel: string
    }

    function sendEmail(user: Usuario ) {}
    ```

    * `Para usar os params`

    ```ts
    user.nome
    ```
    * `Ou usar destructuring` na hora atribuir função

    ```ts
    function sendEmail({nome, email, tel}: Usuario ) {}
    ```
    * Para usar, como `espera so um parametro` (type Usuario)
        ```ts
            sendEmail({
                nome: "LEO",
                email: leo@gmail.com,
                tel: "13421235"
            })
        ```
    * Deixar algum parametro opcional
    ```ts
    interface Usuario {
        nome: string,
        email: string,
        tel?: string
    }
    ```


## Metodos
* GET     ->    Buscar informação (ex: listar user, produtos)
* POST    ->    Inserir(criar) informação na API
* PUT     ->    Alterar uma informação
* DELET   ->    Remover dado
* PATCH   ->    Alterar uma informaçao especifica (somente senha, somente avatar)


## Banco Dados
### Formas de utilizar na aplicação
1. Próprio driver banco de dados
    * Pega oq é nativo do banco
    * Ex: mongo, postgree

2. Query builders
    * Permite escrever de forma menos rustica
    * Ex: KNEX.JS

3. ORM
    * Frameworks que ajudam no mapeamento entre entidade e obj
    * Pegam código e transforma para forma que o db consiga entender
    * Ex: sequelize, typeorm (`USADO NO VÍDEO`), prisma


## Tipos parametros
* Routes params
    * Fazem parte da rota
    * ex: https:localhost:4000/produtos/12345
    * Definir params dentro express
    ```ts
    appo.get("/test/{id}", (req, res) => {
        // Recuperar dentro da rota
        const id = req.params.id
    })
    ```

* Query params
    * fazem parte de uma Query
    * Ex: fazer um filtro 
    * Pra começar "?", nome=valor%nome=valor
    * Ex: 
    ```
       https:localhost:4000/produtos?name=teclado&description=tecladobom 
    ```
    * Diferença entre routes params e query params
        * query params são parametros não obrigatórios
        * Não usar p GET
* Body params
    * Usa p method POST, PUT, PATCH
    * Vem no corpo da requisição
    ```json
        {
            "name": "teclado",
            "description": "tecladobom"
        }
    ```

