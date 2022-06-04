import { PrimaryGeneratedColumn } from 'typeorm';

export abstract class AutoIdEntity {
  @PrimaryGeneratedColumn()
  id!: number;
}