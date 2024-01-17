import { Field, ID, ObjectType } from '@nestjs/graphql';
import {
  BaseEntity,
  Column,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Plan } from './plan.entity';

@Entity('plan_extra_bundles')
@ObjectType({ description: 'plan-extra-bundles' })
export class PlanExtraBundle extends BaseEntity {
  @PrimaryGeneratedColumn()
  @Field(() => ID)
  id: number;

  @Column('int')
  @Field(() => Number)
  hours: number;

  @Column('int')
  @Field(() => Number)
  fees: number;

  @ManyToOne(() => Plan, (plan) => plan.bundles, { onDelete: 'CASCADE' })
  @Field(() => Plan)
  plan: Plan;
}
