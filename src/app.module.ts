import { ApolloServerPluginLandingPageLocalDefault } from '@apollo/server/plugin/landingPage/default';
import { MailerModule } from '@nestjs-modules/mailer';
import { EjsAdapter } from '@nestjs-modules/mailer/dist/adapters/ejs.adapter';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { Module, OnModuleInit } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { ScheduleModule } from '@nestjs/schedule';
import { TypeOrmModule } from '@nestjs/typeorm';
import { adminJSConfig } from './admin_options';
import { AppResolver } from './app.resolver';
import { AppService } from './app.service';
import { AssetModule } from './asset/asset.module';
import { ChatModule } from './chat/chat.module';
import { NotificationModule } from './notification/notification.module';
import { ormConfig } from './ormconfig.js';
import { PlanExtraBundle } from './plan/plan-extra-bundle.entity';
import { Plan } from './plan/plan.entity';
import { PlanModule } from './plan/plan.module';
import { PlanSeeder } from './plan/plan.seed';
import { ProfileModule } from './profile/profile.module';
import { ProjectModule } from './project/project.module';
import { SubscriptionModule } from './subscription/subscription.module';
import { TaskType } from './task/task-type.entity';
import { TaskTypeSeeder } from './task/task-type.seed';
import { TaskModule } from './task/task.module';
import { TeamModule } from './team/team.module';
import { UserModule } from './user/user.module';
import { PortfolioModule } from './portfolio/portfolio.module';

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
    SubscriptionModule,
    PortfolioModule,
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
    TypeOrmModule.forRoot(ormConfig()),
    TypeOrmModule.forFeature([TaskType, Plan, PlanExtraBundle]),
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
        from: '<info@ovioo.ai>',
      },
      template: {
        dir: process.cwd() + '/src/emails',
        adapter: new EjsAdapter(),
        options: {
          strict: false,
        },
      },
    }),
    ScheduleModule.forRoot(),
    import('@adminjs/nestjs').then(({ AdminModule }) =>
      AdminModule.createAdminAsync({
        useFactory: async () => {
          await import('adminjs').then(async ({ AdminJS }) => {
            const AdminJSTypeorm = await import('@adminjs/typeorm');
            AdminJS.registerAdapter({
              Resource: AdminJSTypeorm.Resource,
              Database: AdminJSTypeorm.Database,
            });
          });

          return adminJSConfig;
        },
      }),
    ),
  ],
  providers: [AppResolver, AppService, TaskTypeSeeder, PlanSeeder],
})
export class AppModule implements OnModuleInit {
  constructor(
    private readonly taskTypeSeeder: TaskTypeSeeder,
    private readonly planSeeder: PlanSeeder,
  ) {}

  async onModuleInit() {
    this.planSeeder.seed();
    this.taskTypeSeeder.seed();
  }
}
