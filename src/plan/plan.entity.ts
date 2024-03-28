import { Field, ID, ObjectType } from '@nestjs/graphql';
import { OviooSubscription } from 'src/subscription/subscription.entity';
import { TaskType } from 'src/task/task-type.entity';
import {
  BaseEntity,
  Column,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { PlanExtraBundle } from './plan-extra-bundle.entity';

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

  @Column('int', { nullable: true })
  @Field(() => Number, { nullable: true })
  quarterly_fees: number;

  @Column('int', { nullable: true })
  @Field(() => Number, { nullable: true })
  annual_fees: number;

  @Column('int', { nullable: true })
  @Field(() => Number, { nullable: true })
  monthly_credit_hours: number;

  @Column('int', { nullable: true })
  @Field(() => Number, { nullable: true })
  daily_deducted_hours: number;

  @Column('boolean', { default: false })
  @Field(() => Boolean, { nullable: true })
  is_full_time: boolean;

  @Column('boolean', { default: false, nullable: true })
  @Field(() => Boolean, { nullable: true })
  is_most_popular: boolean;

  @Column('text', { nullable: true })
  stripe_id: string;

  @OneToMany(() => TaskType, (taskTypes) => taskTypes.plan, { nullable: true })
  taskTypes: TaskType[];

  @OneToMany(() => OviooSubscription, (subscription) => subscription.plan)
  @Field(() => [OviooSubscription], { defaultValue: [] })
  subscriptions: OviooSubscription[];

  @OneToMany(() => PlanExtraBundle, (bundle) => bundle.plan)
  @Field(() => [PlanExtraBundle], { defaultValue: [] })
  bundles: PlanExtraBundle[];
}
