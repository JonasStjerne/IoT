import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { APP_GUARD } from '@nestjs/core';
import { ThrottlerGuard, ThrottlerModule } from '@nestjs/throttler';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ActionModule } from './action/action.module';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { mysqlConfigService } from './config/mysql/configuration';
import { EventModule } from './event/event.module';
import { HubModule } from './hub/hub.module';
import { WorkerModule } from './worker/worker.module';

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
      ttl: parseInt(process.env.RATE_LIMIT_TTL!),
      limit: parseInt(process.env.RATE_LIMIT_MAX_REQUESTS!),
    }),

    //Components
    AuthModule,

    HubModule,

    WorkerModule,

    ActionModule,

    EventModule,
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
