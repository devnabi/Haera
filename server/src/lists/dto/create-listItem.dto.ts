import { IsNotEmpty } from "class-validator";

export class CreateListItemDto {
    id: string | bigint;
    
    list_id: string | bigint;

    @IsNotEmpty()
    todo_text: string;

    status: boolean;
}
