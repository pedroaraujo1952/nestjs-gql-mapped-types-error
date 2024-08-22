import { ApolloDriverConfig, ApolloDriver } from '@nestjs/apollo';
import { ConfigService } from '@nestjs/config';
import { BaseRedisCache } from 'apollo-server-cache-redis';
import { Redis } from 'ioredis';
import { join } from 'path';
import responseCachePlugin from '@apollo/server-plugin-response-cache';
import metadata from 'src/metadata';

export default (configService: ConfigService): ApolloDriverConfig => {
  const tls = configService.get<string>('REDIS_TLS')
    ? {
        servername: configService.get<string>('REDIS_HOST'),
        rejectUnauthorized: false,
      }
    : undefined;

  const redis = new Redis({
    host: configService.get<string>('REDIS_HOST', 'localhost'),
    port: +configService.get<string>('REDIS_PORT', '6379'),
    username: configService.get<string>('REDIS_USERNAME', ''),
    password: configService.get<string>('REDIS_PASSWORD', ''),
    tls,
  });

  return {
    driver: ApolloDriver,
    autoSchemaFile: join(process.cwd(), 'schema.gql'),
    playground:
      configService.get<string>('GRAPHQL_PLAYGROUND', 'false') === 'true',

    cache: new BaseRedisCache({
      client: redis,
    }),

    plugins: [responseCachePlugin()],

    formatError: (error: any) => {
      const originalError = error.extensions?.originalError;

      if (!originalError) {
        return {
          error:
            error.extensions?.exception?.code ||
            error.extensions?.code ||
            'SERVER_ERROR',
          message: error.extensions?.exception?.message || error.message,
          statusCode: error.extensions?.exception?.status || 500,
        };
      }

      const graphQLFormattedError = {
        error: originalError?.error || 'SERVER_ERROR',
        message: originalError?.message,
        statusCode: originalError?.statusCode || 500,
      };
      return graphQLFormattedError;
    },

    metadata,
  };
};

export const driver = ApolloDriver;
