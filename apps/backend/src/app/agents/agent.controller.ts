import {Body, Controller, Delete, Get, Param, Post, Put} from "@nestjs/common";
import {AgentService} from "./agent.service";
import {ResponseFormatterHelper} from "../commons/response-formatter.helper";
import {CreateAgentDTO} from "./dto/create-agent.dto";
import {UpdateAgentDTO} from "./dto/update-agent.dto";
import {Agents} from "../database/entities/agents.entity";

@Controller('/agents')
export class AgentController {

    constructor(private readonly service: AgentService) {}

    /**
     * @description Récupère tous les agents
     */
    @Get()
    async findAll(): Promise<ResponseFormatterHelper<Agents[]>> {

        try {
            const agents = await this.service.findAll();
            return ResponseFormatterHelper.succes(agents);
        } catch (error) {
            return ResponseFormatterHelper.error('Failed to retrieve agents', error.message);
        }

    }

    // ===============================================================================================

    /**
     * @description Récupère les détails d'un agent spécifique
     */
    @Get(':id')
    async findOne(@Param('id') id: string): Promise<ResponseFormatterHelper<Agents>> {

        try {
            const agent = await this.service.findOne(id);
            return ResponseFormatterHelper.succes(agent)
        } catch (error) {
            return ResponseFormatterHelper.error('Failed to retrieve agent', error.message);
        }

    }

    // ===============================================================================================

    /**
     * @description Créer un nouvel agent
     */
    @Post()
    async create(@Body() dto: CreateAgentDTO): Promise<ResponseFormatterHelper<CreateAgentDTO>> {

        try {
            const agent = await this.service.create(dto);
            return ResponseFormatterHelper.succes(agent)
        } catch (error) {
            return ResponseFormatterHelper.error('Failed to create agent', error.message);
        }

    }

    // ===============================================================================================

    /**
     * @description Met à jour les informations d'un agent
     */
    @Put(':id')
    async update(@Param('id') id: string, @Body() dto: UpdateAgentDTO): Promise<ResponseFormatterHelper<UpdateAgentDTO>> {

        try {
            const oldAgentData = await this.findOne(id)
            const updatedAgent = await this.service.update(id, dto);
            return ResponseFormatterHelper.update(oldAgentData, updatedAgent)
        } catch (error) {
            return ResponseFormatterHelper.error('Failed to update agent', error.message);
        }

    }

    // ===============================================================================================

    /**
     * @description Supprime un agent
     */
    @Delete(':id')
    async delete(@Param('id') id: string): Promise<ResponseFormatterHelper<Agents>> {
        try {
            const agent = await this.service.remove(id)
            return ResponseFormatterHelper.succes(agent)
        } catch (error) {
            return ResponseFormatterHelper.error('Failed to delete agent', error.message);
        }
    }

}