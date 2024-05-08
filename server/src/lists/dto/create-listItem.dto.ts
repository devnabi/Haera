export class CreateListItemDto {
    id: string | bigint;
    list_id: string | bigint;
    todo_text: string;
    status: boolean;
}
