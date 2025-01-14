import {Module} from "@nestjs/common";
import {TypeOrmModule} from "@nestjs/typeorm";
import {Agents} from "../database/entities/agents.entity";
import {AgentController} from "./agent.controller";
import {AgentService} from "./agent.service";

@Module({
    imports: [TypeOrmModule.forFeature([Agents])],
    controllers: [AgentController],
    providers: [AgentService],
    exports: [AgentService]
})
export class AgentModule {}