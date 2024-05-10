import { IsNotEmpty } from "class-validator";

export class CreateListItemDto {
    list_id: number;

    @IsNotEmpty()
    todo_text: string;
}
