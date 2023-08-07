import { IsEnum, MinLength } from "class-validator";

export class CreateUserDto {
    id:number;

    @MinLength(5)
    name: string;

    @IsEnum(['admin','user'],{message : 'use correct type'})
    type:'admin' | 'user';
}