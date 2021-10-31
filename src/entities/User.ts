import { Column, CreateDateColumn, Entity, PrimaryColumn, UpdateDateColumn } from "typeorm";
import { v4 as uuid } from "uuid"
// v1 -> id gerado a partir de um tempo
// v3 e v5 -> hash
// v4 -> numeros aleatórios

@Entity("users") // referenciando table users
class User {
    @PrimaryColumn() //chave primária
    readonly id: string; //uuid 
    // readonly -> leitura, alteração não pode ser feita por outra classe

    @Column() //se não tiver igual na table, referenciar qual o campo
    name: string;

    @Column()
    email: string;

    @Column()
    admin: boolean;

    @CreateDateColumn()
    created_at: Date;
    @UpdateDateColumn()
    updated_at: Date

    constructor() {
        // se id não tiver preechido é a criação de um novo user, se vier é uma alteração, remoção, busca
        if (!this.id) {
            // !this.id ao fazer isso ta falando se vier como null, undefined, false
            this.id = uuid()
        }
    }
}
export { User }