import {Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn} from "typeorm";
import {Agents} from "./agents.entity";
import {Messages} from "./messages.entity";

@Entity()
export class Conversations {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @ManyToOne(() => Agents)
    @JoinColumn({ name: 'agentId' })
    agent: Agents;

    @Column()
    agentId: string;

    @Column()
    initialMessage: string;

    @OneToMany(() => Messages, (message) => message.conversation)
    messages: Messages[];

    @CreateDateColumn()
    createdAt: Date;
}
