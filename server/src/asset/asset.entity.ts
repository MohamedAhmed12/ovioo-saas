import { Field, ID, ObjectType } from '@nestjs/graphql';
import { Project } from 'src/project/project.entity';
import { Task } from 'src/task/task.entity';
import {
  BaseEntity,
  Column,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity('asset')
@ObjectType({ description: 'asset' })
export class Asset extends BaseEntity {
  @PrimaryGeneratedColumn()
  @Field(() => ID)
  id: number;

  @Column('text')
  @Field(() => String)
  src: string;

  @Column('text', { nullable: true })
  @Field(() => String)
  alt: string;

  @Column('text')
  @Field(() => String)
  type: string;

  @Column('text')
  @Field(() => String)
  version_id: string;

  @ManyToOne(() => Project, (project) => project.assets, { cascade: true })
  @Field(() => Project)
  project: Project;

  @ManyToOne(() => Task, (task) => task.assets, { cascade: true })
  @Field(() => Task)
  task: Task;
}
