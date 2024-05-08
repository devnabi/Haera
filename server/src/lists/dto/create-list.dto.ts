import { InquiryStatus } from "../list-inquiryStatus.enum";

export class CreateListDto {
    id: string | bigint;
    user_id?: string | bigint;
    inquiry_status: InquiryStatus;
}
