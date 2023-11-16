import { Field, ID, Int, ObjectType } from '@nestjs/graphql';
import { hash } from 'bcrypt';
import { Message } from 'src/chat/message.entity';
import { Notification } from 'src/notification/notification.entity';
import { Profile } from 'src/profile/profile.entity';
import { Task } from 'src/task/task.entity';
import { Team } from 'src/team/team.entity';
import {
  BaseEntity,
  BeforeInsert,
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { AuthProviderEnum } from './enums/auth-provider.enum';
import { UserRoleEnum } from './enums/user-role.enum';

@Entity('users')
@ObjectType({ description: 'users' })
export class User extends BaseEntity {
  @PrimaryGeneratedColumn()
  @Field(() => ID)
  id: number;

  @Column('text')
  @Field(() => String)
  fullname: string;

  @Column('text', { unique: true })
  @Field(() => String)
  email: string;

  @Column('text', { nullable: true })
  password: string;

  @Column('text', { nullable: true })
  @Field(() => String, { nullable: true })
  avatar: string;

  @Column('text', { nullable: true })
  @Field(() => String, { nullable: true })
  company: string;

  @Column('text', { nullable: true })
  @Field(() => Int, { nullable: true })
  phone: number;

  @Column('boolean', { default: false })
  @Field(() => Boolean, { defaultValue: false })
  isActive: boolean;

  @Column('text')
  @Field(() => String)
  provider: string;

  @CreateDateColumn()
  @Field()
  created_at: Date;

  @CreateDateColumn()
  @Field()
  updated_at: Date;

  @OneToOne(() => Profile, (profile) => profile.user, {
    eager: true,
    cascade: true,
  })
  @Field(() => Profile)
  profile: Profile;

  @Column('text', { default: UserRoleEnum.User })
  @Field(() => String, { nullable: true })
  role: UserRoleEnum;

  @ManyToOne(() => Team, (team) => team.members, { cascade: true, eager: true })
  @Field(() => Team)
  team: Team;

  @OneToMany(() => Message, (message) => message.sender)
  @Field(() => [Message])
  messages: Message[];

  @OneToMany(() => Notification, (notification) => notification.user)
  @Field(() => [Notification])
  notifications: Notification[];

  // as a designer not an owner
  @OneToMany(() => Task, (task) => task.designer)
  @Field(() => [Task])
  assignedTasks: Task[];

  @BeforeInsert()
  async hashPass() {
    if (this.provider === AuthProviderEnum.Credentials) {
      this.password = await hash(this.password, 12);
    }
  }
}
