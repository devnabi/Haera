import { InquiryStatus } from "../list-inquiryStatus.enum";

export class CreateListDto {
    user_id?: number;
    inquiry_status: InquiryStatus;
}
