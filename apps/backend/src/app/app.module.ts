import { Module } from '@nestjs/common';
import {ConfigModule} from "@nestjs/config";
import {DatabaseModule} from "./database/database.module";
import {AgentModule} from "./agents/agent.module";
import {ConversationModule} from "./conversations/conversations.module";

@Module({
  imports: [
      ConfigModule.forRoot({ isGlobal: true }),
      DatabaseModule,
      AgentModule,
      ConversationModule
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
