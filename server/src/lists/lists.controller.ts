import { Controller, Get, Put, Body, Param } from '@nestjs/common';
import { ListsService } from './lists.service';
import { list, listItem } from './list.model';
import { CreateListItemDto } from './dto/create-listItem.dto';

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
        @Body() createListItemDto: CreateListItemDto) : listItem {
        return this.listsService.createListItem(createListItemDto);
    }

}
