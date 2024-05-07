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

export enum InquiryStatus {
    All = 0,
    Active = 1,
    Completed = 2
}
