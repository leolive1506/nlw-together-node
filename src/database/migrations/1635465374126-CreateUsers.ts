import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class CreateUsers1635465374126 implements MigrationInterface {

    // fazer table
    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
                name: "users", // nome tabela
                columns: [
                    {
                        name: "id",
                        type: "uuid", //uuid id unico universal
                        isPrimary: true
                    },
                    {
                        name: "name",
                        type: "varchar"
                    },
                    {
                        name: "email",
                        type: "varchar"
                    },
                    {
                        name: "admin",
                        type: "boolean",
                        default: false // se não inserir alguma informação pra ela, é salvo como false
                    },
                    {
                        name: "created_at",
                        type: "timestamp",
                        default: "now()"
                    },

                    {
                        name: "updated_at",
                        type: "timestamp",
                        default: "now()"
                    }
                ]
            })
        )
    }

    // desfazer
    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable("users")
    }

}
