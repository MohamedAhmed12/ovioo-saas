import { Field, ID, ObjectType } from '@nestjs/graphql';
import {
  BaseEntity,
  Column,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Task } from './task.entity';

@Entity('task_types')
@ObjectType({ description: 'task-types' })
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

  @Column()
  @Field(() => String, { nullable: true })
  plan: string;

  @OneToMany(() => Task, (task) => task.type)
  tasks: Task[];
}
