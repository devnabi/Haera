import { Injectable } from '@nestjs/common';
import { v4 as uuid } from 'uuid'
import { InquiryStatus, list, listItem } from './lists.model';

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

    createList() {
        const list = {
            id: uuid(),
            inquiry_status: InquiryStatus.All
        }

        this.lists.push(list);
    }

    createListItem(todo_text: string, list_id: string) : listItem {
        const listItem = {
            id: uuid(),
            todo_text,
            list_id,
            status: false
        }
        this.listItems.push(listItem);

        return listItem;
    }

}
