import { ApolloServerPluginLandingPageLocalDefault } from '@apollo/server/plugin/landingPage/default';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { Module, OnModuleInit } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppResolver } from './app.resolver';
import { AppService } from './app.service';
import { AssetGroup } from './asset/asset-goup.entity';
import { AssetModule } from './asset/asset.module';
import { AssetGroupSeeder } from './asset/seeders/asset-group.seed';
import { ProfileModule } from './profile/profile.module';
import { ProjectModule } from './project/project.module';
import { TaskType } from './task/task-type.entity';
import { TaskTypeSeeder } from './task/task-type.seed';
import { TaskModule } from './task/task.module';
import { TeamModule } from './team/team.module';
import { UserModule } from './user/user.module';

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
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: 'schema.gql',
      installSubscriptionHandlers: true,
      playground: false,
      plugins: [ApolloServerPluginLandingPageLocalDefault()],
    }),
    TypeOrmModule.forRoot(ormConfig[0]),
    TypeOrmModule.forFeature([TaskType, AssetGroup]),
  ],
  providers: [AppResolver, AppService, TaskTypeSeeder, AssetGroupSeeder],
})
export class AppModule implements OnModuleInit {
  constructor(
    private readonly taskTypeSeeder: TaskTypeSeeder,
    private readonly assetGroupSeeder: AssetGroupSeeder,
  ) {}

  async onModuleInit() {
    this.taskTypeSeeder.seed();
    this.assetGroupSeeder.seed();
  }
}
