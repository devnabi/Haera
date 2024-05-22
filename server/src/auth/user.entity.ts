import { BaseEntity, Column, Entity, JoinColumn, OneToMany, OneToOne, PrimaryGeneratedColumn, Unique } from "typeorm";
import { ListItem } from "src/lists/listItem.entity";
import { List } from "src/lists/list.entitiy";

@Entity()
@Unique(['nickname'])
export class User extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    email: string;

    @Column()
    password: string;

    @Column()
    nickname: string;

    @Column({ default: false })
    isEmailVerified: boolean;

    @JoinColumn()
    @OneToOne((type) => List, (list) => list.user, { eager: true })
    list: List;

    @OneToMany((type) => ListItem, (listItem) => listItem.user, { eager: true })
    listItem: ListItem[];
}
