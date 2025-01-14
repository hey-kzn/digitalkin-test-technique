import {IsOptional, IsString} from "class-validator";

export class SendMessageDTO {

    @IsString()
    @IsOptional()
    message: string;

}