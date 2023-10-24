import { ApolloServerPluginLandingPageLocalDefault } from '@apollo/server/plugin/landingPage/default';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { Module, OnModuleInit } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppResolver } from './app.resolver';
import { AppService } from './app.service';
import { AssetModule } from './asset/asset.module';
import { ProfileModule } from './profile/profile.module';
import { ProjectModule } from './project/project.module';
import { TaskModule } from './task/task.module';
import { TeamModule } from './team/team.module';
import { UserModule } from './user/user.module';
import { TaskTypeSeeder } from './task/task-type.seed';
import { TaskType } from './task/task-type.entity';
import { ChatModule } from './chat/chat.module';

// eslint-disable-next-line @typescript-eslint/no-var-requires
const ormConfig = require('../ormconfig.json');

@Module({
  imports: [
    UserModule,
    ProfileModule,
    TeamModule,
    TaskModule,
    AssetModule,
    ProjectModule,
    ChatModule,
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: 'schema.gql',
      installSubscriptionHandlers: true,
      playground: false,
      plugins: [ApolloServerPluginLandingPageLocalDefault()],
    }),
    TypeOrmModule.forRoot(ormConfig[0]),
    TypeOrmModule.forFeature([TaskType]),
  ],
  providers: [AppResolver, AppService, TaskTypeSeeder],
})
export class AppModule implements OnModuleInit {
  constructor(private readonly taskTypeSeeder: TaskTypeSeeder) {}

  async onModuleInit() {
    this.taskTypeSeeder.seed();
  }
}
