import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from "typeorm";
import { Issue } from "./Issue";


@Entity()
export class Image_File_Paths{
    @PrimaryGeneratedColumn()
    id!: number

    @Column( {nullable: true} )
    path!: string

    @Column( { nullable: true } )
    file_type!: string

    @ManyToOne( () => Issue, (issue) => issue.image_file_paths, { nullable: false } )
    issue!: Issue
}
