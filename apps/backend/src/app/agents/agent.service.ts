import {Injectable} from "@nestjs/common";
import {InjectRepository} from "@nestjs/typeorm";
import {Agents} from "../database/entities/agents.entity";
import {DeleteResult, Repository} from "typeorm";
import {CreateAgentDTO} from "./dto/create-agent.dto";
import {UpdateAgentDTO} from "./dto/update-agent.dto";

@Injectable()
export class AgentService {
    constructor(
        @InjectRepository(Agents)
        private readonly repository: Repository<Agents>
    ) {}

    async findAll(): Promise<Agents[]> {
        return await this.repository.find();
    }

    async findOne(id: string): Promise<Agents | null> {
        return await this.repository.findOneBy({ id });
    }

    async create(dto: CreateAgentDTO): Promise<Agents> {
        const newAgent = this.repository.create(dto);
        return await this.repository.save(newAgent);
    }

    async update(id: string, dto: UpdateAgentDTO): Promise<Agents | null> {
        await this.repository.update(id, dto);
        return this.repository.findOne({ where: { id } });
    }

    async remove(id: string): Promise<DeleteResult> {
        return await this.repository.delete(id);
    }
}