import { Controller, Get, Put, Body, Param } from '@nestjs/common';
import { ListsService } from './lists.service';
import { list, listItem } from './lists.model';

@Controller('lists')
export class ListsController {
    constructor(private listsService : ListsService){}
    
    @Get()
    getAllList(): list[] {
        return this.listsService.getAllList();
    }

    @Get('/item')
    getAllListItem() {
        return this.listsService.getAllListItem();
    }

    @Put()
    createList() {
        return this.listsService.createList();      
    }

    @Put('/item')
    createListItem(
        @Body('todo_text') todo_text: string,
        @Body('list_id') list_id: string
    ) : listItem {
        return this.listsService.createListItem(todo_text, list_id);
    }

}
