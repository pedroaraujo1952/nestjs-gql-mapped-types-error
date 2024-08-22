import { Module } from '@nestjs/common';
import { GraphQLModule as GQL } from '@nestjs/graphql';
import graphqlConfig, { driver } from './config/graphql.config';
import { ConfigService } from '@nestjs/config';
import { ResolverModule } from './resolver.module';

@Module({
  imports: [
    GQL.forRootAsync({
      driver,
      useFactory: graphqlConfig,
      inject: [ConfigService],
    }),
    ResolverModule,
  ],
})
export class GraphQLModule {}
