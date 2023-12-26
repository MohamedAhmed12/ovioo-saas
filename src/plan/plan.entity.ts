import { Field, ID, ObjectType } from '@nestjs/graphql';
import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity('plans')
@ObjectType({ description: 'plans' })
export class Plan extends BaseEntity {
  @PrimaryGeneratedColumn()
  @Field(() => ID)
  id: number;

  @Column('text')
  @Field(() => String)
  title: string;

  @Column('text')
  @Field(() => String)
  description: string;

  @Column('varchar', { array: true })
  @Field(() => [String])
  services: string[];

  @Column('text', { nullable: true })
  @Field(() => String, { nullable: true })
  background_color?: string;

  @Column('int', { nullable: true })
  @Field(() => Number, { nullable: true })
  daily_fees: number;

  @Column('int', { nullable: true })
  @Field(() => Number, { nullable: true })
  monthly_fees: number;

  @Column('boolean', { default: false })
  @Field(() => Boolean, { nullable: true })
  is_full_time: boolean;

  @Column('boolean', { default: false, nullable: true })
  @Field(() => Boolean, { nullable: true })
  is_most_popular: boolean;
}
