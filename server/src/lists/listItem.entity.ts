import { BaseEntity, Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { User } from "src/auth/user.entity";
import { List } from "./list.entitiy";

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

    @ManyToOne((type)=> User, (user)=> user.listItem) // { eager: false }
    user: User;

    @ManyToOne((type)=> List, (list)=> list.listItem) // { eager: true }
    list: List;
}
