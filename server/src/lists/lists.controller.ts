import { Controller, Get, Post, Put, Patch, Delete, Body, Param } from '@nestjs/common';
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

    @Get('/:id')
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

    @Patch('/:id/item')
    updateListItem(
        @Param('id') id: string,
        @Body('todo_text') todo_text: string,
        @Body('status') status: boolean
    ) : listItem {
        return this.listsService.updateListItem(id, todo_text, status);
    }

    @Delete('/:id')
    deleteListItem(@Param('id') id: string) : void {
        this.listsService.deleteListItem(id);
    }

}
