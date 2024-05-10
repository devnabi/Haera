import { Module } from '@nestjs/common';
import { ListsController } from './lists.controller';
import { ListsService } from './lists.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { List, ListItem } from './list.entitiy';

@Module({
  imports: [
    TypeOrmModule.forFeature([List, ListItem])
  ],
  controllers: [ListsController],
  providers: [ListsService]
})
export class ListsModule {}
