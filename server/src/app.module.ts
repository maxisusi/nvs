import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { ApolloServerPluginLandingPageLocalDefault } from 'apollo-server-core';
import { CustomersModule } from './customers/customers.module';
import { GraphQLDateTime } from 'graphql-iso-date';
import { ContactPointsModule } from './contact-points/contact-points.module';
import { CompaniesModule } from './companies/companies.module';

@Module({
  imports: [
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      plugins: [ApolloServerPluginLandingPageLocalDefault()],
      playground: false,
      typePaths: ['./**/*.graphql'],
      resolvers: { DateTime: GraphQLDateTime },
    }),
    CustomersModule,
    ContactPointsModule,
    CompaniesModule,
  ],
})
export class AppModule {}
