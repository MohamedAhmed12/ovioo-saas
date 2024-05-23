import { Field, ID, ObjectType } from '@nestjs/graphql';
import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('portfolio')
@ObjectType({ description: 'portfolios' })
export class Portfolio extends BaseEntity {
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

  @Column('varchar', { array: true })
  @Field(() => [String])
  categories: string[];
}
