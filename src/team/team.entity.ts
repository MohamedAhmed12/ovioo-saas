import { Field, ID, ObjectType } from '@nestjs/graphql';
import { Project } from 'src/project/project.entity';
import { OviooSubscription } from 'src/subscription/subscription.entity';
import { Task } from 'src/task/task.entity';
import { User } from 'src/user/user.entity';
import {
  BaseEntity,
  Column,
  Entity,
  ManyToMany,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity('teams')
@ObjectType({ description: 'teams' })
export class Team extends BaseEntity {
  @PrimaryGeneratedColumn()
  @Field(() => ID)
  id: number;

  @Column('text', { default: '' })
  @Field(() => String, { nullable: true })
  name: string;

  @Column('int')
  @Field(() => Number)
  owner_id: number;

  @ManyToMany(() => User, (user) => user.teams, { cascade: ['update'] })
  @Field(() => [User], { defaultValue: [] })
  members: User[];

  @OneToMany(() => Project, (project) => project.team)
  @Field(() => [Project], { defaultValue: [] })
  projects: Project[];

  @OneToMany(() => Task, (task) => task.team, { cascade: true, lazy: true })
  @Field(() => [Task], { defaultValue: [] })
  tasks: Task[];

  @OneToMany(() => OviooSubscription, (subscription) => subscription.team, {
    onDelete: 'CASCADE',
  })
  @Field(() => [OviooSubscription], { defaultValue: [] })
  subscriptions: OviooSubscription[];
}
