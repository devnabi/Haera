import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from "typeorm";

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
