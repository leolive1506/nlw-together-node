import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryColumn } from "typeorm";
import { v4 as uuid } from "uuid"
import { Tag } from "./Tag";
import { User } from "./User";

@Entity("compliments")
class Compliment {

    @PrimaryColumn()
    readonly id: string;

    @Column()
    user_sender: string;

    @JoinColumn({ name: "user_sender" })
    userSender: User

    @Column()
    user_receiver: string;

    @JoinColumn({ name: "user_receiver" })
    @ManyToOne(() => User)
    userReceiver: User
    @Column()
    tag_id: string;

    // fazendo isso retorna tudo que tem dentro table tag
    // mas muitos elogios podem ter uma tag em comum, usar many to one -> muitos pra um
    @JoinColumn({ name: "tag_id" })
    @ManyToOne(() => Tag) // muitos elogios pra uma tag
    tag: Tag

    @Column()
    message: string;

    @CreateDateColumn()
    created_at: Date;


    constructor() {
        if (!this.id) {
            this.id = uuid()
        }
    }
}

export { Compliment }