import { Field, ID, ObjectType } from '@nestjs/graphql';
import { IsNotEmpty } from 'class-validator';
import { Asset } from 'src/asset/asset.entity';
import { Task } from 'src/task/task.entity';
import { Team } from 'src/team/team.entity';
import {
  BaseEntity,
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity('project')
@ObjectType({ description: 'project' })
export class Project extends BaseEntity {
  @PrimaryGeneratedColumn()
  @Field(() => ID)
  id: number;

  @Column('text')
  @IsNotEmpty()
  @Field(() => String)
  title: string;

  @Column('text')
  @IsNotEmpty()
  @Field(() => String)
  description: string;

  @ManyToOne(() => Team, (team) => team.projects, { onDelete: 'CASCADE' })
  @Field(() => Team)
  team: Team;

  @OneToMany(() => Task, (task) => task.project, { cascade: true })
  @Field(() => [Task], { defaultValue: [] })
  tasks: Task[];

  @OneToMany(() => Asset, (asset) => asset.project)
  @Field(() => [Asset], { defaultValue: [] })
  assets: Asset[];
}
