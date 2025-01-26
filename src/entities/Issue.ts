import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, ManyToOne, OneToMany } from "typeorm";
import { User } from "./User";
import { Image_File_Paths } from "./Image_file_paths";

@Entity()
export class Issue{
    @PrimaryGeneratedColumn()
    id!: number

    @Column()
    issue_category!: string

    @Column( "varchar", { length: 250 } )
    issue_description!: string

    @Column( "varchar", { length: 150, nullable: true } )
    additional_comments!: string

    @CreateDateColumn({ type: "datetime" })
    createdAt!: Date

    @Column( { nullable: true } )
    resolution_time!: string

    @Column( { nullable: true } )
    impact_scale!: string

    @Column()
    country!: string

    @Column( "int", { default: 0 } )
    rewards!: number

    @Column({default: "Open"})
    progress_status!: string

    @ManyToOne( () => User, (user) => user.issues, { nullable: false } )
    user!: User

    @OneToMany ( () => Image_File_Paths, (image_file) => image_file.issue, {cascade: ["remove"] })
    image_file_paths!: Image_File_Paths[]
}

