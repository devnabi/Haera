<template>
    <div class="container py-5 h-100">
        <div class="row justify-content-center">

            <h1 class="text-primary" style="font-family: 'Sofia';">{{ nickName }}'s List🪄</h1>

            <section class="vh-100 gradient-custom mt-3">
                <div class="container">
                    <div class="row d-flex justify-content-center align-items-center h-100">
                        <div class="col col-12">

                            <div class="card">
                                <div class="card-body py-4">

                                    <form class="d-flex mt-4">
                                        <input class="form-control border-info me-2" type="search" v-model="keyword"
                                            placeholder="Search keyword...">
                                        <button class="btn btn-primary btn-lg my-2 my-sm-0" type="submit"
                                            @click.prevent="getListItemByKeyword">Search</button>
                                    </form>

                                    &nbsp;

                                    <!-- Tabs navs -->
                                    <div class="d-flex">
                                        <ul class="nav nav-tabs mt-2 mb-2 pb-2" id="ex1" role="tablist">
                                            <li @click="getAllListItem" class="nav-item" role="presentation">
                                                <a class="nav-link" id="ex1-tab-2" data-mdb-tab-init href="#ex1-tabs-2"
                                                    role="tab" aria-controls="ex1-tabs-2" aria-selected="false">All</a>
                                            </li>
                                            <li @click="getActiveListItems" class="nav-item" role="presentation">
                                                <a class="nav-link" id="ex1-tab-2" data-mdb-tab-init href="#ex1-tabs-2"
                                                    role="tab" aria-controls="ex1-tabs-2"
                                                    aria-selected="false">Active</a>
                                            </li>
                                            <li @click="getCompletedListItems" class="nav-item" role="presentation">
                                                <a class="nav-link" id="ex1-tab-3" data-mdb-tab-init href="#ex1-tabs-3"
                                                    role="tab" aria-controls="ex1-tabs-3"
                                                    aria-selected="false">Completed</a>
                                            </li>
                                            <form>
                                                <div class="d-flex position-absolute end-0 mb-2 me-3">
                                                    <input class="form-control border-info me-2" type="text"
                                                        v-model="todo_text" placeholder="New task...">
                                                    <button @click.prevent="createListItem"
                                                        class="btn btn-secondary btn-lg" type="submit">➕Add</button>
                                                </div>
                                            </form>
                                        </ul>
                                    </div>

                                    <!-- Tabs content -->
                                    <div class="tab-content" id="ex1-content">
                                        <div class="tab-pane fade show active" id="ex1-tabs-1" role="tabpanel"
                                            aria-labelledby="ex1-tab-1">
                                            <ul class="list-group mb-0">
                                                <li v-if="listItems.length === 0">
                                                    나만의 리스트를 만들어보세요!
                                                </li>
                                                <li @dblclick="updateListItemStatus(listItem.id, listItem.status)"
                                                    v-for="(listItem, i) in listItems" :key="i"
                                                    v-bind:listItem="listItem" @mouseover="applyHoverStyles(i)"
                                                    @mouseleave="removeHoverStyles(i)"
                                                    class="list-group-item d-flex align-items-center border-0 mb-2 rounded"
                                                    :style="[listItem.hoverStyles, { 'background-color': listItem.isHovered ? '#ddf4d4' : '#f4f6f0' }]">
                                                    <div v-if="listItem.status">
                                                        <s><i>{{ listItem.todo_text }}</i></s>
                                                    </div>
                                                    <div v-else>
                                                        {{ listItem.todo_text }}
                                                    </div>
                                                    <div v-show="listItem.isHovered" class="position-absolute end-0">
                                                        <button class="btn btn-outline-dark btn-sm me-2" type="button"
                                                            @click="updateListItem(listItem.id, i)">✏️</button>
                                                        <button class="btn btn-outline-danger btn-sm me-2" type="button"
                                                            @click="deleteListItem(listItem.id)">❌</button>
                                                    </div>
                                                </li>

                                                <!-- listItem.length가 perPage보다 작으면 페이지네이션 박스가 움직여서 좋지 않으니 빈 항목들 추가 -->
                                                <li v-for="n in emptyItems" :key="'placeholder-' + n"
                                                    class="list-group-item d-flex align-items-center border-0 mb-2 rounded"
                                                    style="background-color: #f4f6f0;">
                                                    <div class="w-100">&nbsp;</div>
                                                </li>
                                            </ul>
                                        </div>
                                    </div>

                                    <!-- pagination -->
                                    <div class="row d-flex justify-content-center mt-5">
                                        <div class="col-auto overflow-auto">
                                            <b-pagination @page-click="handlePageClick" v-model="currentPage"
                                                :total-rows="rows" :per-page="perPage" first-text=&laquo; prev-text="<"
                                                next-text=">" last-text=&raquo;></b-pagination>
                                        </div>
                                    </div>

                                </div>
                            </div>

                        </div>
                    </div>
                </div>
            </section>
        </div>
    </div>
</template>

<script>
import axios from 'axios';
import { toast } from "vue3-toastify";
import "vue3-toastify/dist/index.css";

export default {
    name: 'MyList',

    data() {
        return {
            nickName: "",
            token: "",
            keyword: "",
            add: "",
            todo_text: "",
            status: "",
            listStatus: null, // Active(false), Completed(true)
            listItems: [],
            isHovered: true,
            currentPage: 1,
            perPage: 5, // 페이지당 데이터 수
            total: 0
        }
    },

    computed: {
        rows() {
            // 보여줄 페이지네이션 수
            return this.total;
        },

        emptyItems() {
            // 움수가 되지 않도록
            return Math.max(0, this.perPage - this.listItems.length);
        }
    },

    async mounted() {
        // 토큰을 통해 사용자를 찾기, 그 사용자의 닉네임을 바인딩
        this.token = localStorage.getItem("accessToken");
        try {
            const response = await axios.get(`/auth/getValidateUser/${this.token}`);
            this.nickName = response.data.nickName;
            console.log("response", response.data.nickName);
            // total에 따라 페이지 나타내기
            await this.fetchPaginatedListItems();
        } catch (error) {
            console.log("error", error);
        }
    },

    setup() {
        const keywordPromptToast = () => {
            toast("키워드를 입력하세요.", {
                autoClose: 1000,
                position: "bottom-right",
                theme: "dark",
                type: "info",
                transition: "bounce",
                closeOnClick: true,
            })
        }

        const nonexistentKeywordToast = () => {
            toast("존재하지 않는 키워드입니다.", {
                autoClose: 1000,
                position: "bottom-right",
                theme: "dark",
                type: "warning",
                transition: "bounce",
                closeOnClick: true,
            })
        }

        const showInputRequiredToast = () => {
            toast("입력하셔야 합니다.", {
                autoClose: 1000,
                position: "bottom-right",
                theme: "dark",
                type: "info",
                transition: "bounce",
                closeOnClick: true,
            })
        }

        const showEditCancelledToast = () => {
            toast("수정을 취소합니다.", {
                autoClose: 1000,
                position: "bottom-right",
                theme: "dark",
                type: "default",
                transition: "bounce",
                closeOnClick: true,
            })
        }
        return { keywordPromptToast, nonexistentKeywordToast, showInputRequiredToast, showEditCancelledToast };
    },

    methods: {
        applyHoverStyles(i) {
            this.listItems[i].isHovered = true;
            this.listItems[i].hoverStyles = {
                cursor: "pointer",
                backgroundColor: "#ddf4d4"
            };
        },
        removeHoverStyles(i) {
            this.listItems[i].isHovered = false;
            this.listItems[i].hoverStyles = {
                cursor: "default",
                backgroundColor: "#f4f6f0"
            };
        },

        async handlePageClick(event) {
            // 페이지를 클릭 시 객체가 받아지는 상황 -> 객체에서 페이지 번호 추출하고 형변환
            const pageText = event.target.value || event.target.innerText;
            const totalPages = Math.ceil(this.total / this.perPage);
            let page = this.currentPage;

            if (pageText === "<") {
                page = Math.max(--this.currentPage, 1);
            } else if (pageText === ">") {
                page = Math.min(++this.currentPage, totalPages);
            } else if (pageText === "«") {
                page = 1;
            } else if (pageText === "»") {
                page = totalPages;
            } else {
                page = Number(pageText);
            }

            console.log("Clicked Page:", page);
            this.currentPage = page;
            await this.fetchPaginatedListItems();
        },

        async getAllListItem() {
            try {
                const response = await axios.get("/lists/item", {
                    headers: {
                        Authorization: `Bearer ${this.token}`
                    }
                });
                this.listItems = response.data;
                this.listStatus = null;
                this.currentPage = 1;
                await this.fetchPaginatedListItems();
                console.log("All");
            } catch (error) {
                console.log("error", error);
            }
        },

        async getActiveListItems() {
            try {
                const response = await axios.get("/lists/item/active", {
                    headers: {
                        Authorization: `Bearer ${this.token}`
                    }
                });
                this.listItems = response.data;
                this.listStatus = false;
                this.currentPage = 1;
                await this.fetchPaginatedListItems();
                console.log("Active");
            } catch (error) {
                console.log("error", error);
            }
        },

        async getCompletedListItems() {
            try {
                const response = await axios.get("/lists/item/completed", {
                    headers: {
                        Authorization: `Bearer ${this.token}`
                    }
                });
                this.listItems = response.data;
                this.listStatus = true;
                this.currentPage = 1;
                await this.fetchPaginatedListItems();
                console.log("Completed");
            } catch (error) {
                console.log("error", error);
            }
        },

        async getListItemByKeyword() {
            if (this.keyword) {
                try {
                    const response = await axios.get(`/lists/item/search/${this.keyword}`, {
                        headers: {
                            Authorization: `Bearer ${this.token}`
                        }
                    });
                    this.listItems = response.data;
                    this.keyword = "";
                    if (this.listItems.length == 0) {
                        this.nonexistentKeywordToast();
                    }
                    console.log("keyword: ", response.data);
                } catch (error) {
                    console.log("error", error);
                }
            } else {
                this.keywordPromptToast();
            }
        },

        async fetchPaginatedListItems() {
            const paginationDto = {
                currentPage: this.currentPage,
                perPage: this.perPage,
                listStatus: this.listStatus
            }
            try {
                const response = await axios.post("/lists/item/pagination", paginationDto, {
                    headers: {
                        Authorization: `Bearer ${this.token}`
                    }
                });
                if (response.data) {
                    this.listItems = response.data.listItems || [];
                    this.total = response.data.total || 0;
                }
                console.log("ListItems: ", this.listItems);
                console.log("Total: ", this.total);
            } catch (error) {
                console.log("error", error);
            }
        },

        async createListItem() {
            const createListItemDto = {
                todo_text: this.todo_text
            }
            if (this.todo_text) {
                try {
                    const response = await axios.post("/lists/item", createListItemDto, {
                        headers: {
                            Authorization: `Bearer ${this.token}`
                        }
                    });
                    this.listItems.push(response.data);
                    this.todo_text = "";
                    console.log("response", response);
                } catch (error) {
                    console.log("error", error);
                }
            } else {
                console.log("입력하셔야 합니다.");
            }
        },

        async updateListItem(id, i) {
            const toDoText = this.listItems[i].todo_text;
            const promptInput = prompt("수정할 내용을 입력하세요: ", toDoText);
            if (promptInput !== null && promptInput.trim() !== '') {
                try {
                    const response = await axios.patch(`/lists/item/update/${id}`,
                        { todo_text: promptInput },
                        {
                            headers: {
                                Authorization: `Bearer ${this.token}`
                            }
                        }
                    );
                    this.listItems[i].todo_text = promptInput;
                    console.log("response", response.data);
                } catch (error) {
                    console.log("error", error);
                }
            } else if (promptInput == "") {
                this.showInputRequiredToast();
            } else {
                this.showEditCancelledToast();
            }
        },

        async updateListItemStatus(id, status) {
            try {
                const response = await axios.patch(`/lists/item/updateStatus/${id}`,
                    { status: status },
                    {
                        headers: {
                            Authorization: `Bearer ${this.token}`
                        }
                    });
                const index = this.listItems.findIndex(item => item.id == id);
                this.listItems[index].status = !status;
                console.log("response", response.data);
            } catch (error) {
                console.log("error", error);
            }
        },

        async deleteListItem(id) {
            try {
                const response = await axios.delete(`/lists/item/delete/${id}`,
                    {
                        headers: {
                            Authorization: `Bearer ${this.token}`
                        }
                    }
                );
                const index = this.listItems.findIndex(item => item.id == id);
                this.listItems.splice(index, 1);
                console.log("response", response.status);
            } catch (error) {
                console.log("error", error);
            }
        }
    }
}
</script>
