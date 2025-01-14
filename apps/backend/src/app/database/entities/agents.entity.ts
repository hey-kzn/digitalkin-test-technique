import {Column, Entity, OneToMany, PrimaryGeneratedColumn} from "typeorm";
import {Conversations} from "./conversations.entity";

@Entity()
export class Agents {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    name: string;

    @Column()
    description: string;

    @OneToMany(() => Conversations, conversation => conversation.agent)
    conversations: Conversations[];
}