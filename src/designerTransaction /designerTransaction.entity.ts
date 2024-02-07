import { Field, ID, ObjectType } from '@nestjs/graphql';
import { TaskStatusEnum } from 'src/task/enums/task-status.enum';
import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity('designer_transactions')
@ObjectType({ description: 'designer_transactions' })
export class DesignerTransaction extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column('int')
  amount: number;

  @Column('text', { default: 'EGP' })
  currency: string;

  @CreateDateColumn({ type: 'timestamp' })
  transaction_date: Date;

  @Column('text', { default: 'completed' })
  status: TaskStatusEnum;
}
