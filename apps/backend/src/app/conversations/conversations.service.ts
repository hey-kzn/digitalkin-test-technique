import {Injectable} from "@nestjs/common";
import {InjectRepository} from "@nestjs/typeorm";
import {Conversations} from "../database/entities/conversations.entity";
import {Messages} from "../database/entities/messages.entity";
import {Agents} from "../database/entities/agents.entity";
import { Repository } from "typeorm";
import {CreateConversationDTO} from "./dto/create-conversation.dto";
import {SendMessageDTO} from "./dto/send-message.dto";
import {ConversationResponseDTO} from "./dto/conversation-response.dto";

@Injectable()
export class ConversationService {

    constructor(
        @InjectRepository(Conversations)
        private conversationRepository: Repository<Conversations>,
        @InjectRepository(Messages)
        private messageRepository: Repository<Messages>,
        @InjectRepository(Agents)
        private agentRepository: Repository<Agents>,
    ) {}

    async startConversation(dto: CreateConversationDTO): Promise<ConversationResponseDTO> {

        const agent = await this.agentRepository.findOne({ where: { id: dto.agentId } });
        if (!agent) {
            throw new Error('Agent not found');
        }

        const conversation = this.conversationRepository.create({
            agent,
            agentId: dto.agentId,
            initialMessage: dto.initialMessage,
        });

        const savedConversation = await this.conversationRepository.save(conversation);

        const initialMessage = this.messageRepository.create({
            conversationId: savedConversation.id,
            message: dto.initialMessage,
            createdAt: new Date(),
        });

        await this.messageRepository.save(initialMessage);

        const agentResponse = this.generateAgentResponse(dto.initialMessage);
        const agentMessage = this.messageRepository.create({
            conversationId: savedConversation.id,
            message: agentResponse,
            createdAt: new Date(),
        });

        await this.messageRepository.save(agentMessage);

        return {
            conversationId: savedConversation.id,
            agentResponse: agentResponse,
        };
    }

    async sendMessage(id: string, dto: SendMessageDTO): Promise<Messages> {
        const conversation = await this.conversationRepository.findOne({
            where: { id },
            relations: ['agent'],
        });

        if (!conversation) {
            throw new Error('Conversation not found');
        }

        const userMessage = this.messageRepository.create({
            conversationId: id,
            message: dto.message,
            createdAt: new Date(),
        });

        await this.messageRepository.save(userMessage);

        const agentResponse = this.generateAgentResponse(dto.message);
        const agentMessage = this.messageRepository.create({
            conversationId: id,
            message: agentResponse,
            createdAt: new Date(),
        });

        await this.messageRepository.save(agentMessage);

        return agentMessage;
    }

    private generateAgentResponse(userMessage: string): string {

        const predefinedResponses = {
            "commande": "Je vois que vous avez une question sur votre commande. Comment puis-je vous aider ?",
            "problème": "Désolé d'entendre que vous avez un problème. Pouvez-vous préciser de quoi il s'agit ?",
            "merci": "De rien, n'hésitez pas à revenir si vous avez d'autres questions !",
            "bonjour": "Bonjour! Comment puis-je vous aider ?",
            "au revoir": "Au revoir! À bientôt, n'hésitez pas à revenir si vous avez d'autres questions.",
            "prix": "Je comprends que vous ayez des questions concernant les prix. Quel produit ou service vous intéresse ?",
            "produit": "Vous voulez en savoir plus sur un produit ? Veuillez préciser lequel.",
            "retour": "Si vous souhaitez effectuer un retour, veuillez me donner plus de détails sur votre achat.",
            "assistance": "Je suis là pour vous aider. Pouvez-vous préciser le type d'assistance que vous recherchez ?",
            "service": "Si vous avez une question concernant nos services, n'hésitez pas à préciser.",
            "délai": "Les délais peuvent varier. Pouvez-vous me donner plus d'informations sur ce que vous attendez ?",
            "reclamation": "Je suis désolé pour la situation. Pouvez-vous détailler votre réclamation pour que je puisse mieux vous aider ?",
            "rendez-vous": "Voulez-vous prendre rendez-vous avec un agent ? Veuillez préciser la date et l'heure qui vous conviennent.",
        };

        for (const keyword in predefinedResponses) {
            if (userMessage.toLowerCase().includes(keyword)) {
                return predefinedResponses[keyword];
            }
        }

        return `Je réponds à votre message: ${userMessage}`;
    }

}