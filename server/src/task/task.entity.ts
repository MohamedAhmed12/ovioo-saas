import { Field, ID, ObjectType } from '@nestjs/graphql';
import { Project } from 'src/project/project.entity';
import { Team } from 'src/team/team.entity';
import { User } from 'src/user/user.entity';
import {
  BaseEntity,
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { TaskStatusEnum } from './enums/task-status.enum';
import { TaskTypesEnum } from './enums/task-types';
import { TaskType } from './task-type.entity';

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
    type: 'text',
    default: TaskStatusEnum.IN_QUEUE,
  })
  @Field(() => String, { nullable: true })
  status: string;

  @ManyToOne(() => TaskType, (type) => type.tasks)
  @Field(() => TaskType)
  type: TaskType;

  @ManyToOne(() => Project, (project) => project.tasks, { onDelete: 'CASCADE' })
  @Field(() => Project)
  project: Project;

  @ManyToOne(() => Team, (team) => team.tasks, { onDelete: 'CASCADE' })
  @Field(() => Team)
  team: Team;

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
