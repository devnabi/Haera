import { Controller, Get, Post, Put, Patch, Delete, Body, Param, Query, UsePipes, ValidationPipe, ParseArrayPipe, NotFoundException } from '@nestjs/common';
import { ListsService } from './lists.service';
import { CreateListItemDto } from './dto/create-listItem.dto';

@Controller('lists')
export class ListsController {
    constructor(private listsService : ListsService) {}
    
    @Get()
    getAllList() {
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

    @Get('/item/search')
    getListItemByKeyword(@Query('keyword', ParseArrayPipe) keyword: string) {
        const found = this.listsService.getListItemByKeyword(keyword);
        if (found.length == 0) {
            throw new NotFoundException(`검색하신 '${keyword}'를 가진 아이템을 찾을 수 없습니다.`);
        }
        return found;
    }

    @Get('/item/:id')
    getListItemById(@Param('id') id: string) {
        return this.listsService.getListItemById(id);
    }

    @Post()
    createList() {
        return this.listsService.createList();      
    }

    @Post('/item')
    @UsePipes(ValidationPipe)
    createListItem(@Body() createListItemDto: CreateListItemDto) {
        return this.listsService.createListItem(createListItemDto);
    }

    @Patch('/item/:id')
    updateListItem(
        @Param('id') id: string,
        @Body('todo_text') todo_text: string,
        @Body('status') status: boolean
    ) {
        return this.listsService.updateListItem(id, todo_text, status);
    }

    @Delete('/item/:id')
    deleteListItem(@Param('id') id: string) : void {
        this.listsService.deleteListItem(id);
    }

}
