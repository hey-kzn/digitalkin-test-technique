import {IsNotEmpty, IsString} from "class-validator";

export class CreateConversationDTO {

    @IsString()
    @IsNotEmpty()
    readonly agentId: string;

    @IsString()
    @IsNotEmpty()
    readonly initialMessage: string;

}