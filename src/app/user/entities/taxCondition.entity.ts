import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class TaxCondicion {
    @PrimaryGeneratedColumn()
    id: number

    @Column({ nullable: false, type: 'varchar', length: 50 })
    taxConditionName: string
}