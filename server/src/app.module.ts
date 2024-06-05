import { Module } from '@nestjs/common';
import { ListsModule } from './lists/lists.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { typeORMConfig } from './configs/typeorm.config';
import { AuthModule } from './auth/auth.module';
import { ConfigModule } from '@nestjs/config';
import { ScheduleModule } from '@nestjs/schedule';

@Module({
  imports: [
    TypeOrmModule.forRoot(typeORMConfig),
    ConfigModule.forRoot({
      envFilePath: ".env.configuration",
      isGlobal: true,
    }),
    ScheduleModule.forRoot(),
    ListsModule,
    AuthModule
  ],
})
export class AppModule {}
