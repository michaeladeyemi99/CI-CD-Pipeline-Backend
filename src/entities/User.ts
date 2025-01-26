import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from "typeorm";
import { Issue } from "./Issue";

@Entity()
export class User{
    @PrimaryGeneratedColumn()
    id!: number

    @Column()
    name!: string

    @Column()
    organization_name!: string

    @OneToMany ( () => Issue, (issue) => issue.user )
    issues!: Issue[]

}
