import {Module} from "@nestjs/common";
import {TypeOrmModule} from "@nestjs/typeorm";
import {Conversations} from "../database/entities/conversations.entity";
import {Messages} from "../database/entities/messages.entity";
import {ConversationService} from "./conversations.service";
import {ConversationController} from "./conversations.controller";
import {Agents} from "../database/entities/agents.entity";

@Module({
    imports: [TypeOrmModule.forFeature([Conversations, Messages, Agents])],
    controllers: [ConversationController],
    providers: [ConversationService]
})
export class ConversationModule {}