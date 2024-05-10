import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from "typeorm";
import { InquiryStatus } from "./list-inquiryStatus.enum";

@Entity()
export class List extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ nullable: true })
    user_id: number;

    @Column()
    inquiry_status: InquiryStatus;
}

@Entity()
export class ListItem extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    list_id: number;

    @Column()
    todo_text: string;

    @Column()
    status: boolean;
}
