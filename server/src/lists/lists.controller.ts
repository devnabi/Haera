import { Controller, Get, Post, Put, Patch, Delete, Body, Param, Query, UsePipes, ValidationPipe, NotFoundException, UseGuards, Request } from '@nestjs/common';
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
    getAllList(@Request() req): Promise<List[]> {
        const user = req.user;
        return this.listsService.getAllList(user);
    }

    @Get('/item')
    getAllListItem(@Request() req): Promise<ListItem[]> {
        const user = req.user;
        return this.listsService.getAllListItem(user);
    }

    @Get('/item/active')
    getActiveListItems(@Request() req): Promise<ListItem[]> {
        const user = req.user;
        return this.listsService.getActiveListItems(user);
    }

    @Get('/item/completed')
    getCompletedListItems(@Request() req): Promise<ListItem[]> {
        const user = req.user;
        return this.listsService.getCompletedListItems(user);
    }

    @Get('/item/search')
    getListItemsByKeyword(
        @Query('keyword') keyword: string,
        @Request() req
    ): Promise<ListItem[]> {
        const user = req.user;
        return this.listsService.getListItemsByKeyword(keyword, user);
    }

    @Get('/item/:id')
    getListItemById(
        @Param('id') id: number,
        @Request() req
    ): Promise<ListItem> {
        const user = req.user;
        return this.listsService.getListItemById(id, user);
    }

    @Post()
    createList(@Request() req): Promise<List> {
        const user = req.user;
        return this.listsService.createList(user);
    }

    @Post('/item')
    @UsePipes(ValidationPipe)
    createListItem(
        @Body() createListItemDto: CreateListItemDto,
        @Request() req
    ): Promise<ListItem> {
        const user = req.user;
        return this.listsService.createListItem(createListItemDto, user);
    }

    @Patch('/item/:id')
    updateListItem(
        @Param('id') id: number,
        @Body('todo_text') todo_text: string,
        @Body('status') status: boolean,
        @Request() req
    ): Promise<UpdateResult> {
        const user = req.user;
        return this.listsService.updateListItem(id, todo_text, status, user);
    }

    @Delete('/item/:id')
    deleteListItem(
        @Param('id') id: number,
        @Request() req
    ): Promise<DeleteResult> {
        const user = req.user;
        return this.listsService.deleteListItem(id, user);
    }
}
