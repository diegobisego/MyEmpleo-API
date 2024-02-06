import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Job {
    @PrimaryGeneratedColumn()
    id: number

    @Column({ nullable: false, type: 'varchar', length: 50 })
    jobName: string
}