import { Field, ID, ObjectType } from '@nestjs/graphql';
import { Asset } from 'src/asset/asset.entity';
import { Project } from 'src/project/project.entity';
import { Team } from 'src/team/team.entity';
import { User } from 'src/user/user.entity';
import {
  BaseEntity,
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { TaskStatusEnum } from './enums/task-status.enum';
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

  @ManyToOne(() => TaskType, (type) => type.tasks, { eager: true })
  @Field(() => TaskType)
  type: TaskType;

  @ManyToOne(() => Project, (project) => project.tasks, {
    onDelete: 'CASCADE',
    lazy: true,
  })
  @Field(() => Project)
  project: Project;

  @ManyToOne(() => Team, (team) => team.tasks, {
    onDelete: 'CASCADE',
    lazy: true,
  })
  @JoinColumn({ name: 'team_id' })
  @Field(() => Team)
  team: Team;

  @ManyToOne(() => User, (user) => user.assignedTasks, { eager: true })
  @Field(() => User, { nullable: true })
  designer: User;

  @OneToMany(() => Asset, (asset) => asset.task, {
    eager: true,
    nullable: true,
  })
  @Field(() => [Asset], { defaultValue: null })
  assets: Asset[];

  @OneToMany(() => Task, (task) => task.parent, { cascade: true })
  @Field(() => [Task], { nullable: true })
  subtasks: Task[];

  @ManyToOne(() => Task, (task) => task.subtasks)
  @Field(() => Task, { nullable: true })
  parent: Task;
}
