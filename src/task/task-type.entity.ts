import { Field, ID, ObjectType } from '@nestjs/graphql';
import { Plan } from 'src/plan/plan.entity';
import {
  BaseEntity,
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Task } from './task.entity';

@Entity('task_types')
@ObjectType('task_types')
export class TaskType extends BaseEntity {
  @PrimaryGeneratedColumn()
  @Field(() => ID)
  id: number;

  @Column()
  @Field(() => String, { nullable: true })
  title: string;

  @Column({ type: 'jsonb', nullable: true })
  @Field(() => [String], { nullable: true })
  info: string[];

  @Column({ type: 'text', nullable: true })
  @Field(() => String, { nullable: true })
  extraInfo: string;

  @Column('int')
  planId: number;

  @ManyToOne(() => Plan, (plan) => plan.taskTypes, { cascade: true })
  @Field(() => Plan)
  plan: Plan;

  @OneToMany(() => Task, (task) => task.type)
  tasks: Task[];
}
