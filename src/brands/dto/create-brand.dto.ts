import { IsString, MinLength } from "class-validator";

//los dtos es la informacion que espero recibiri mediante POST
export class CreateBrandDto {
    @IsString()
    @MinLength(1)
    name: string;
}
