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

    updateListItem() {

    }

    deleteListItem() {

    }

}
