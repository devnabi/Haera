import { Injectable } from '@nestjs/common';
import { v4 as uuid } from 'uuid'
import { list, listItem } from './list.model';
import { InquiryStatus } from "./list-inquiryStatus.enum";
import { CreateListItemDto } from './dto/create-listItem.dto';

@Injectable()
export class ListsService {
    private lists: list[] = [];
    private listItems: listItem[] = [];

    getAllList() {
        return this.lists;
    }
    
    getAllListItem() {
        return this.listItems;
    }

    getActiveListItem() {
        return this.listItems.filter((item) => item.status == false);
    }

    getCompletedListItem() {
        return this.listItems.filter((item) => item.status == true);
    }

    getListItemById(id: string) : listItem {
        return this.listItems.find((item) => item.id === id)
    }

    createList() {
        const list = {
            id: uuid(),
            inquiry_status: InquiryStatus.All
        }

        this.lists.push(list);
    }

    createListItem(createListItemDto: CreateListItemDto) : listItem {
        const { todo_text, list_id } = createListItemDto;
        
        const listItem = {
            id: uuid(),
            todo_text,
            list_id,
            status: false // 기본으로 생성되는 자리는 미완료(false)
        }
        this.listItems.push(listItem);

        return listItem;
    }

    updateListItem(id: string, todo_text: string, status: boolean) : listItem {
        const listItem = this.getListItemById(id);
        listItem.todo_text = todo_text;
        listItem.status = status;

        return listItem;
    }

    deleteListItem(id: string) : void {
        const index = this.listItems.findIndex((item) => item.id == id)
        this.listItems.splice(index, 1);
    }

}
