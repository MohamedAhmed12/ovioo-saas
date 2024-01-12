import { Field, ID, ObjectType } from '@nestjs/graphql';
import { Asset } from 'src/asset/asset.entity';
import { Message } from 'src/chat/message.entity';
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
  status: TaskStatusEnum;

  @Column('int', { nullable: true })
  @Field(() => Number, { nullable: true })
  designer_fees: number;

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
  @JoinColumn({ name: 'teamId' })
  @Field(() => Team)
  team: Team;

  @ManyToOne(() => User, (user) => user.assignedTasks, { eager: true })
  @Field(() => User, { nullable: true })
  designer: User;

  @OneToMany(() => Asset, (asset) => asset.task, {
    eager: true,
    nullable: true,
  })
  @Field(() => [Asset], { defaultValue: [] })
  assets: Asset[];

  @OneToMany(() => Message, (message) => message.task, {
    cascade: true,
    nullable: true,
  })
  @Field(() => [Message], { defaultValue: [] })
  messages: Message[];

  @Field(() => Number, { nullable: true })
  unreadMessagesCount?: number;

  @OneToMany(() => Task, (task) => task.parent, { nullable: true })
  @JoinColumn({ name: 'parentId' })
  @Field(() => [Task], { defaultValue: [] })
  subtasks: Task[];

  @ManyToOne(() => Task, (task) => task.subtasks, {
    onDelete: 'CASCADE',
    nullable: true,
  })
  @Field(() => Task, { defaultValue: null })
  parent: Task;
}
