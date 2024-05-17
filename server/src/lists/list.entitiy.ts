import { BaseEntity, Column, Entity, OneToMany, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { InquiryStatus } from "./list-inquiryStatus.enum";
import { User } from "src/auth/user.entity";
import { ListItem } from "./listItem.entity"; 

@Entity()
export class List extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column() // { nullable: true }
    user_id: number;

    @Column()
    inquiry_status: InquiryStatus;

    @OneToOne((type)=> User, (user)=> user.list) // { eager: false }
    user: User;

    @OneToMany((type)=> ListItem, (listItem)=> listItem.list) // { eager: false }
    listItem: ListItem[];
}
