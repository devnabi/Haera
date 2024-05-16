import { Module } from '@nestjs/common';
import { ListsController } from './lists.controller';
import { ListsService } from './lists.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { List, ListItem } from './list.entitiy';
import { AuthModule } from 'src/auth/auth.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([List, ListItem]),
    AuthModule
  ],
  controllers: [ListsController],
  providers: [ListsService]
})
export class ListsModule {}
