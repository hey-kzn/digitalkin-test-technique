import {Body, Controller, Param, Post} from "@nestjs/common";
import {ConversationService} from "./conversations.service";
import {SendMessageDTO} from "./dto/send-message.dto";
import {CreateConversationDTO} from "./dto/create-conversation.dto";
import {ResponseFormatterHelper} from "../commons/response-formatter.helper";
import {Messages} from "../database/entities/messages.entity";

@Controller('conversations')
export class ConversationController {
    constructor(private readonly service: ConversationService) {}

    /**
     * @description Démarrer une nouvelle conversation avec un agent.
     * @param createConversationDTO
     */
    @Post()
    async startConversation(@Body() createConversationDTO: CreateConversationDTO): Promise<ResponseFormatterHelper<CreateConversationDTO>> {
        try  {
            const resp = await this.service.startConversation(createConversationDTO);

            return ResponseFormatterHelper.succes({
                conversationId: resp.conversationId,
                agentResponse: resp.agentResponse,
            });
        } catch (error) {
            return ResponseFormatterHelper.error('Failed to start conversation', error.message);
        }
    }

    // ===============================================================================================

    /**
     * @description Envoyer un message dans une conversation existante.
     * @param id
     * @param sendMessageDTO
     */
    @Post(':id/messages')
    async sendMessage(
        @Param('id') id: string,
        @Body() sendMessageDTO: SendMessageDTO,
    ): Promise<ResponseFormatterHelper<Messages>> {
        try {
            const resp = await this.service.sendMessage(id, sendMessageDTO);
            return ResponseFormatterHelper.succes(resp)
        } catch(error) {
            console.log(error)
            return ResponseFormatterHelper.error('Failed to send a response', error.messages)
        }
    }
}