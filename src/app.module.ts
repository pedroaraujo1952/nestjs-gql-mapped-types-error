import { Module } from '@nestjs/common';
import { GraphQLModule } from './graphql.module';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [ConfigModule.forRoot({ isGlobal: true }), GraphQLModule],
})
export class AppModule {}
