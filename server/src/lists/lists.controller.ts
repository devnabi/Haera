import { Controller, Get, Post, Put, Patch, Delete, Body, Param, Query, UsePipes, ValidationPipe, ParseArrayPipe, NotFoundException, UseGuards } from '@nestjs/common';
import { ListsService } from './lists.service';
import { CreateListItemDto } from './dto/create-listItem.dto';
import { List } from './list.entitiy';
import { ListItem } from './listItem.entity';
import { DeleteResult, UpdateResult } from 'typeorm';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';

@Controller('lists')
@UseGuards(JwtAuthGuard)
export class ListsController {
    constructor(private listsService : ListsService) {}
    
    @Get()
    getAllList(): Promise<List[]> {
        return this.listsService.getAllList();
    }

    @Get('/item')
    getAllListItem(): Promise<ListItem[]> {
        return this.listsService.getAllListItem();
    }

    @Get('/item/active')
    getActiveListItems(): Promise<ListItem[]> {
        return this.listsService.getActiveListItems();
    }

    @Get('/item/completed')
    getCompletedListItems(): Promise<ListItem[]> {
        return this.listsService.getCompletedListItems();
    }

    @Get('/item/search')
    async getListItemsByKeyword(@Query('keyword') keyword: string): Promise<ListItem[]> {
        const found = await this.listsService.getListItemsByKeyword(keyword);
        if (found.length == 0) {
            throw new NotFoundException(`검색하신 '${keyword}'를 가진 아이템을 찾을 수 없습니다.`);
        }
        return found;
    }

    @Get('/item/:id')
    getListItemById(@Param('id') id: number): Promise<ListItem> {
        return this.listsService.getListItemById(id);
    }

    @Post()
    createList(): Promise<List> {
        return this.listsService.createList();      
    }

    @Post('/item')
    @UsePipes(ValidationPipe)
    createListItem(@Body() createListItemDto: CreateListItemDto): Promise<ListItem> {
        return this.listsService.createListItem(createListItemDto);
    }

    @Patch('/item/:id')
    updateListItem(
        @Param('id') id: number,
        @Body('todo_text') todo_text: string,
        @Body('status') status: boolean
    ): Promise<UpdateResult> {
        return this.listsService.updateListItem(id, todo_text, status);
    }

    @Delete('/item/:id')
    deleteListItem(@Param('id') id: number): Promise<DeleteResult> {
        return this.listsService.deleteListItem(id);
    }

}
