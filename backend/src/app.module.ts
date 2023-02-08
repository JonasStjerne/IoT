import { Module, CacheModule, CacheInterceptor } from '@nestjs/common';
import { AppController } from './app.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { mysqlConfigService } from './config/mysql/configuration';
import { AuthModule } from './auth/auth.module';
import { ThrottlerGuard, ThrottlerModule } from '@nestjs/throttler';
import { APP_GUARD, APP_INTERCEPTOR } from '@nestjs/core';
import { HubModule } from './hub/hub.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      ignoreEnvFile: true,
      isGlobal: true,
    }),

    //Setup TypeORM and connect to MySQL
    TypeOrmModule.forRootAsync({
      useClass: mysqlConfigService,
      inject: [mysqlConfigService],
    }),

    //Setup Ratelimiting
    ThrottlerModule.forRoot({
      ttl: parseInt(process.env.RATE_LIMIT_TTL),
      limit: parseInt(process.env.RATE_LIMIT_MAX_REQUESTS),
    }),

    //Components
    AuthModule,

    HubModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,

    //Use ratelimting guard on all routes
    {
      provide: APP_GUARD,
      useClass: ThrottlerGuard,
    },
  ],
})
export class AppModule {}
