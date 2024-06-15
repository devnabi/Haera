import { Injectable, NotFoundException } from '@nestjs/common';
import { InquiryStatus } from "./list-inquiryStatus.enum";
import { CreateListItemDto } from './dto/create-listItem.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { List } from './list.entitiy';
import { ListItem } from './listItem.entity';
import { User } from 'src/auth/user.entity';
import { DeleteResult, Like, Repository, UpdateResult } from 'typeorm';
import { PaginationDto } from './dto/pagination.dto';

@Injectable()
export class ListsService {
    constructor(
        @InjectRepository(List)
        private listRepository: Repository<List>,
        @InjectRepository(ListItem)
        private listItemRepository: Repository<ListItem>
    ) { }

    async getAllList(user: User): Promise<List[]> {
        const lists = await this.listRepository.findBy({ user_id: user.id });
        return lists;
    }

    async getAllListItem(user: User): Promise<ListItem[]> {
        const list = await this.listRepository.findOneBy({ user_id: user.id });
        const allListItem = await this.listItemRepository.findBy({ list_id: list.id });
        return allListItem;
    }

    async getActiveListItems(user: User): Promise<ListItem[]> {
        const list = await this.listRepository.findOneBy({ user_id: user.id });
        const activeListItems = await this.listItemRepository.findBy({
            list_id: list.id,
            status: false
        })

        return activeListItems;
    }

    async getCompletedListItems(user: User): Promise<ListItem[]> {
        const list = await this.listRepository.findOneBy({ user_id: user.id });
        const completedListItems = await this.listItemRepository.findBy({
            list_id: list.id,
            status: true
        })

        return completedListItems;
    }

    async getListItemsByKeyword(keyword: string, user: User): Promise<ListItem[]> {
        const list = await this.listRepository.findOneBy({ user_id: user.id });
        const listItems = await this.listItemRepository.findBy({
            todo_text: Like(`%${keyword}%`),
            list_id: list.id
        });

        return listItems;
    }

    async getListItemById(id: number, user: User): Promise<ListItem> {
        const list = await this.listRepository.findOneBy({ user_id: user.id });
        const listItem = await this.listItemRepository.findOneBy({
            list_id: list.id,
            id
        });

        return listItem;
    }

    async fetchPaginatedListItems(paginationDto: PaginationDto, user: User): Promise<{ listItems: ListItem[], total: number }> {
        const { currentPage, perPage, listStatus } = paginationDto;
        const list = await this.listRepository.findOneBy({ user_id: user.id });
        const [listItems, total] = await this.listItemRepository.findAndCount({
            where: {
                list_id: list.id,
                status: listStatus
            },
            skip: currentPage <= 0 ? 0 : (currentPage - 1) * perPage,
            take: perPage
        });

        return { listItems, total };
    }

    async createList(user: User): Promise<List> {
        const list = this.listRepository.create({
            user_id: user.id,
            inquiry_status: InquiryStatus.All
        })

        return this.listRepository.save(list);
    }

    async createListItem(createListItemDto: CreateListItemDto, user: User): Promise<ListItem> {
        const { todo_text } = createListItemDto;
        const list = await this.listRepository.findOneBy({ user_id: user.id });
        const listItem = this.listItemRepository.create({
            todo_text,
            list_id: list.id,
            status: false,
        });

        return this.listItemRepository.save(listItem);
    }

    async updateListItem(id: number, todo_text: string, user: User): Promise<UpdateResult> {
        const list = await this.listRepository.findOneBy({ user_id: user.id });
        const listItemExists = await this.listItemRepository.existsBy({
            list_id: list.id,
            id
        });
        if (!listItemExists) {
            throw new NotFoundException();
        }

        const updateResult = await this.listItemRepository.update(
            id,
            {
                todo_text: todo_text,
            }
        );

        return updateResult;
    }

    async updateListItemStatus(id: number, status: boolean, user: User): Promise<UpdateResult> {
        const list = await this.listRepository.findOneBy({ user_id: user.id });
        const listItemExists = await this.listItemRepository.existsBy({
            list_id: list.id,
            id
        });
        if (!listItemExists) {
            throw new NotFoundException();
        }

        // 상태를 반대로 업데이트
        const newStatus = !status;
        const updateResult = await this.listItemRepository.update(
            id,
            {
                status: newStatus
            }
        );

        return updateResult;
    }

    async deleteListItem(id: number, user: User): Promise<DeleteResult> {
        const list = await this.listRepository.findOneBy({ user_id: user.id });
        const listItemExists = await this.listItemRepository.existsBy({
            list_id: list.id,
            id
        });
        if (!listItemExists) {
            throw new NotFoundException();
        }
        const deleteResult = await this.listItemRepository.delete({ id });

        return deleteResult;
    }
}
