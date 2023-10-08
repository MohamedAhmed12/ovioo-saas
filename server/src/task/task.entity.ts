import { Field, ID, ObjectType } from '@nestjs/graphql';
import { Project } from 'src/project/project.entity';
import { BaseEntity, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity('tasks')
@ObjectType({ description: 'tasks' })
export class Task extends BaseEntity {
  @PrimaryGeneratedColumn()
  @Field(() => ID)
  id: number;

  @ManyToOne(() => Project, (project) => project.tasks, { cascade: true })
  @Field(() => Project)
  project: Project;
}
