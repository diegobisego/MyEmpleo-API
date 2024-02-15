import {
    Column,
    Entity,
    PrimaryGeneratedColumn,
  } from 'typeorm';

  
  @Entity()
  export class Auth {
    @PrimaryGeneratedColumn()
    id: number;   
  
    @Column({ nullable: false, type: 'varchar' })
    user: string;
  
    @Column({ nullable: false, type: 'varchar', length: 50 })
    password: string;

  }
  