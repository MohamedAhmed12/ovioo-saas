import { Field, ID, ObjectType } from '@nestjs/graphql';
import { Project } from 'src/project/project.entity';
import { BaseEntity, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity('asset')
@ObjectType({ description: 'asset' })
export class Asset extends BaseEntity {
  @PrimaryGeneratedColumn()
  @Field(() => ID)
  id: number;

  @ManyToOne(() => Project, (project) => project.assets, { cascade: true })
  @Field(() => Project)
  project: Project;
}
