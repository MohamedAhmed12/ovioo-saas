import { Field, ObjectType } from '@nestjs/graphql';
import { TaskStatusEnum } from 'src/task/enums/task-status.enum';
import { User } from 'src/user/user.entity';
import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
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

  @Column('int')
  @Field(() => Number)
  designerId: number;

  @ManyToOne(() => User, (designer) => designer.designer_transactions, {
    onDelete: 'CASCADE',
  })
  @Field(() => User)
  designer: User;
}
