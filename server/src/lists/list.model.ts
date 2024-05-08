import { InquiryStatus } from "./list-inquiryStatus.enum";

export interface list {
    id: string | bigint;
    user_id?: string | bigint;
    inquiry_status: InquiryStatus;
}

export interface listItem {
    id: string | bigint;
    list_id: string | bigint;
    todo_text: string;
    status: boolean;
}
