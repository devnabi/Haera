import { Controller, Get, Post, Put, Patch, Delete, Body, Param, Query } from '@nestjs/common';
import { ListsService } from './lists.service';
import { list, listItem } from './list.model';
import { CreateListItemDto } from './dto/create-listItem.dto';

@Controller('lists')
export class ListsController {
    constructor(private listsService : ListsService) {}
    
    @Get()
    getAllList(): list[] {
        return this.listsService.getAllList();
    }

    @Get('/item')
    getAllListItem() {
        return this.listsService.getAllListItem();
    }

    @Get('/item/active')
    getActiveListItem() {
        return this.listsService.getActiveListItem();
    }

    @Get('/item/completed')
    getCompletedListItem() {
        return this.listsService.getCompletedListItem();
    }

    @Get('/item/keword')
    getListItemByKeyword(@Query('keyword') keyword: string) {
        return this.listsService.getListItemByKeyword(keyword);
    }

    @Get('/item/:id')
    getListItemById(@Param('id') id: string ) {
        return this.listsService.getListItemById(id);
    }

    @Post()
    createList() {
        return this.listsService.createList();      
    }

    @Post('/item')
    createListItem(@Body() createListItemDto: CreateListItemDto) : listItem {
        return this.listsService.createListItem(createListItemDto);
    }

    @Patch('/item/:id')
    updateListItem(
        @Param('id') id: string,
        @Body('todo_text') todo_text: string,
        @Body('status') status: boolean
    ) : listItem {
        return this.listsService.updateListItem(id, todo_text, status);
    }

    @Delete('/item/:id')
    deleteListItem(@Param('id') id: string) : void {
        this.listsService.deleteListItem(id);
    }

}
