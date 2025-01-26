import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity()
export class AI_Insight{
    @PrimaryGeneratedColumn()
    id!: number

    @Column({ type: "text"})
    general_summary!: string

    @Column()
    solution_request!: string

    @Column()
    ideas!: string

    @Column()
    pain_point!: string

    @CreateDateColumn()
    createdAt!: Date

    @UpdateDateColumn()
    updatedAt!: Date
}
