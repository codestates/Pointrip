import { Column } from 'typeorm';
import { AutoIdEntity } from './auto-id';

export abstract class BaseTimeEntity extends AutoIdEntity {
  @Column({ type: 'timestamp', default: () => "current_timestamp" })
  createdAt!: Date;

  @Column({ type: 'timestamp', default: () => "current_timestamp" })
  updatedAt!: Date;
}