import { Field, ID, ObjectType } from '@nestjs/graphql';
import { Plan } from 'src/plan/plan.entity';
import { Team } from 'src/team/team.entity';
import {
  BaseEntity,
  BeforeInsert,
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { SubscriptionStatusEnum } from './enums/subscription-status.enum';

@Entity('ovioo_subscriptions')
@ObjectType({ description: 'ovioo-subscriptions' })
export class OviooSubscription extends BaseEntity {
  @PrimaryGeneratedColumn()
  @Field(() => ID)
  id: number;

  @Column('int')
  @Field(() => Number)
  total_credit_hours: number;

  @Column('int')
  @Field(() => Number)
  remaining_credit_hours: number;

  @Column('int', { default: 0 })
  @Field(() => Number, { nullable: true })
  extra_bundle_hours?: number;

  @Column('int', { nullable: true })
  @Field(() => Number, { nullable: true })
  daily_deducted_hours: number;

  @Column({
    type: 'text',
    default: SubscriptionStatusEnum.ACTIVE,
  })
  @Field(() => String, { nullable: true })
  status: SubscriptionStatusEnum;

  @CreateDateColumn()
  @Field()
  start_at: Date;

  @CreateDateColumn()
  @Field()
  expire_at: Date;

  @ManyToOne(() => Team, (team) => team.subscriptions, { onDelete: 'CASCADE' })
  @Field(() => Team)
  team: Team;

  @ManyToOne(() => Plan, (plan) => plan.subscriptions)
  @Field(() => Plan)
  plan: Plan;

  @BeforeInsert()
  async autoSetExpireDate() {
    if (this.start_at && !this.expire_at) {
      this.expire_at = new Date(this.start_at);
      this.expire_at.setDate(this.start_at.getDate() + 30);
    }
  }
}
