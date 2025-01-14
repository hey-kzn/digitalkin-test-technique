import {Column, CreateDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn} from "typeorm";
import {Conversations} from "./conversations.entity";

@Entity()
export class Messages {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @ManyToOne(() => Conversations, (conversation) => conversation.messages)
    conversation: Conversations;

    @Column()
    conversationId: string;

    @Column()
    message: string;

    @CreateDateColumn()
    createdAt: Date;
}
