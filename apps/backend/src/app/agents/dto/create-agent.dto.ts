import {IsNotEmpty, IsString} from "class-validator";

export class CreateAgentDTO {
    @IsString()
    @IsNotEmpty()
    name: string;

    @IsString()
    @IsNotEmpty()
    description: string;
}