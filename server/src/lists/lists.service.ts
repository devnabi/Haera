import { Injectable } from '@nestjs/common';
import { InquiryStatus } from "./list-inquiryStatus.enum";
import { CreateListItemDto } from './dto/create-listItem.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { List, ListItem } from './list.entitiy';
import { DeleteResult, Like, Repository, UpdateResult } from 'typeorm';

@Injectable()
export class ListsService {
    constructor(
        @InjectRepository(List)
        private listRepository : Repository<List>,
        @InjectRepository(ListItem)
        private listItemRepository : Repository<ListItem>
    ) {}

    async getAllList(): Promise<List[]> {
        const lists = await this.listRepository.find();
        return lists;
    }
    
    async getAllListItem(): Promise<ListItem[]> {
        const allListItem = await this.listItemRepository.find();
        return allListItem;
    }

    async getActiveListItems(): Promise<ListItem[]> {
        const activeListItems = await this.listItemRepository.find({
            where: {
                status: false
            }
        });

        return activeListItems;
    }

    async getCompletedListItems(): Promise<ListItem[]> {
        const completedListItems = await this.listItemRepository.find({
            where: {
                status: true
            }
        })

        return completedListItems;
    }

    async getListItemsByKeyword(keyword: string): Promise<ListItem[]> {
        const listItems = await this.listItemRepository.findBy({
            todo_text: Like(`%${keyword}%`)
        });

        return listItems;
    }

    async getListItemById(id: number): Promise<ListItem> {
        const listItem = await this.listItemRepository.findOneBy({ id });
        return listItem;
    }

    async createList(): Promise<List> {
        const list = this.listRepository.create({
            inquiry_status: InquiryStatus.All
        })

        return this.listRepository.save(list);
    }

    async createListItem(createListItemDto: CreateListItemDto): Promise<ListItem> {
        const { todo_text, list_id } = createListItemDto;
        const listItem = this.listItemRepository.create({
            todo_text,
            list_id,
            status: false
        });

        return this.listItemRepository.save(listItem);
    }

    async updateListItem(id: number, todo_text: string, status: boolean): Promise<UpdateResult> {
        const updateResult = await this.listItemRepository.update(
            id,
            {
                todo_text: todo_text,
                status: status
            }
        );

        return updateResult;
    }

    async deleteListItem(id: number): Promise<DeleteResult> {
        const deleteResult = await this.listItemRepository.delete(id);
        return deleteResult;
    }

}
