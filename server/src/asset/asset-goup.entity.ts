import { Field, ID, ObjectType } from '@nestjs/graphql';
import { Project } from 'src/project/project.entity';
import {
  BaseEntity,
  Column,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity('asset_group')
@ObjectType({ description: 'asset group' })
export class AssetGroup extends BaseEntity {
  @PrimaryGeneratedColumn()
  @Field(() => ID)
  id: number;

  @Column('text')
  @Field(() => String)
  title: string;

  @Column('json', { nullable: true })
  @Field(() => [String])
  types: string[];

  @ManyToOne(() => Project, (project) => project.assetGroups, { cascade: true })
  @Field(() => Project, { nullable: true })
  project: Project;
}
