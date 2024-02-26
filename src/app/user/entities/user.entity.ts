import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Job } from './job.entity';
import { TaxCondicion } from './taxCondition.entity';
import { Auth } from './auth.entity';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: true, type: 'varchar', length: 255 })
  profileImage: any;

  @Column({ nullable: false, type: 'varchar', length: 50 })
  userName: string;

  @Column({ nullable: false, type: 'varchar' })
  userLastName: string;

  @ManyToOne(() => Job, { eager: true })
  @JoinColumn({ name: 'idJob' })
  idJob: number;

  @Column({ nullable: false, type: 'varchar' })
  country: string;

  @Column({ nullable: false, type: 'varchar' })
  province: string; 

  @Column({ nullable: false, type: 'varchar' })
  city: string;

  @Column({ nullable: false, type: 'varchar' })
  email: string;

  @Column({ nullable: false, type: 'varchar', length: 50 })
  password: string;

  @Column({ nullable: false, type: 'varchar' })
  dniCuit: string;

  @ManyToOne(() => TaxCondicion, { eager: true })
  @JoinColumn({ name: 'idTaxCondition' })
  idTaxCondition: number;

  @Column({ nullable: false, type: 'int' })
  serviceCost: number;

  @Column({ nullable: true, type: 'varchar' })
  businessName: string;

  @ManyToOne(() => Auth, { eager: true })
  @JoinColumn({ name: 'idAuth' })
  idAuth: number;

  // agregar fecha de creacion
}
