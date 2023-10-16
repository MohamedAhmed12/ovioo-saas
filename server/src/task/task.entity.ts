import { Field, ID, ObjectType } from '@nestjs/graphql';
import { Project } from 'src/project/project.entity';
import {
  BaseEntity,
  Column,
  Entity,
  JoinTable,
  ManyToOne,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { TaskStatusEnum } from './enums/task-status.enum';
import { TaskTypesEnum } from './enums/task-types';
import { User } from 'src/user/user.entity';

@Entity('tasks')
@ObjectType({ description: 'tasks' })
export class Task extends BaseEntity {
  @PrimaryGeneratedColumn()
  @Field(() => ID)
  id: number;

  @Column('text')
  @Field(() => String)
  title: string;

  @Column('text', { default: '' })
  @Field(() => String, { nullable: true })
  description: string;

  @Column({
    type: 'enum',
    enum: TaskTypesEnum,
  })
  @Field(() => TaskTypesEnum, { nullable: true })
  type: TaskTypesEnum;

  @Column({
    type: 'enum',
    enum: TaskStatusEnum,
    default: TaskStatusEnum.InQueue,
  })
  @Field(() => TaskStatusEnum, { nullable: true })
  status: TaskStatusEnum;

  @ManyToOne(() => Project, (project) => project.tasks, { onDelete: 'CASCADE' })
  @Field(() => Project)
  project: Project;

  @ManyToOne(() => User, (user) => user.tasks)
  @Field(() => User, { nullable: true })
  designer: User;

  @OneToMany(() => Task, (task) => task.parent, { cascade: true })
  @Field(() => [Task], { nullable: true })
  children: Task[];

  @ManyToOne(() => Task, (task) => task.children)
  @Field(() => Task, { nullable: true })
  parent: Task;
}
