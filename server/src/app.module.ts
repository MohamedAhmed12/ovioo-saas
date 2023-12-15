import { ApolloServerPluginLandingPageLocalDefault } from '@apollo/server/plugin/landingPage/default';
import { MailerModule } from '@nestjs-modules/mailer';
import { EjsAdapter } from '@nestjs-modules/mailer/dist/adapters/ejs.adapter';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { Module, OnModuleInit } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppResolver } from './app.resolver';
import { AppService } from './app.service';
import { AssetModule } from './asset/asset.module';
import { ChatModule } from './chat/chat.module';
import { NotificationModule } from './notification/notification.module';
import { PlanSeeder } from './plan/plan-type.seed';
import { Plan } from './plan/plan.entity';
import { PlanModule } from './plan/plan.module';
import { ProfileModule } from './profile/profile.module';
import { ProjectModule } from './project/project.module';
import { TaskType } from './task/task-type.entity';
import { TaskTypeSeeder } from './task/task-type.seed';
import { TaskModule } from './task/task.module';
import { TeamModule } from './team/team.module';
import { UserModule } from './user/user.module';

@Module({
  imports: [
    UserModule,
    ProfileModule,
    TeamModule,
    TaskModule,
    AssetModule,
    ProjectModule,
    ChatModule,
    NotificationModule,
    PlanModule,
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: 'schema.gql',
      installSubscriptionHandlers: true,
      subscriptions: {
        'graphql-ws': true,
      },
      playground: false,
      plugins: [ApolloServerPluginLandingPageLocalDefault()],
    }),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.DATABASE_HOST,
      port: parseInt(process.env.DATABASE_PORT, 10),
      username: process.env.DATABASE_USER,
      password: process.env.DATABASE_PASSWORD,
      database: process.env.DATABASE_NAME,
      synchronize: process.env.NODE_ENV !== 'production',
      entities: ['dist/**/*.entity.js'],
    }),
    TypeOrmModule.forFeature([TaskType, Plan]),
    MailerModule.forRoot({
      transport: {
        host: process.env.MAILER_HOST,
        port: process.env.MAILER_PORT,
        auth: {
          user: process.env.MAILER_USER,
          pass: process.env.MAILER_PASSWORD,
        },
      },
      defaults: {
        from: '<support@ovioo.com>',
      },
      template: {
        dir: process.cwd() + '/src/emails',
        adapter: new EjsAdapter(),
        options: {
          strict: false,
        },
      },
    }),
  ],
  providers: [AppResolver, AppService, TaskTypeSeeder, PlanSeeder],
})
export class AppModule implements OnModuleInit {
  constructor(
    private readonly taskTypeSeeder: TaskTypeSeeder,
    private readonly planSeeder: PlanSeeder,
  ) {}

  async onModuleInit() {
    this.taskTypeSeeder.seed();
    this.planSeeder.seed();
  }
}
