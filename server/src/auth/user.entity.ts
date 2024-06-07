import { BaseEntity, Column, Entity, JoinColumn, OneToMany, OneToOne, PrimaryGeneratedColumn, Unique } from "typeorm";
import { ListItem } from "src/lists/listItem.entity";
import { List } from "src/lists/list.entitiy";

@Entity()
@Unique(['nickName'])
export class User extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    email: string;

    @Column()
    password: string;

    @Column()
    nickName: string;

    @Column({ default: false })
    isEmailVerified: boolean;

    @Column()
    created_at: Date;

    @Column({ nullable: true })
    deactivated_at: Date;

    @JoinColumn()
    @OneToOne((type) => List, (list) => list.user, { eager: true })
    list: List;

    @OneToMany((type) => ListItem, (listItem) => listItem.user, { eager: true })
    listItem: ListItem[];
}
