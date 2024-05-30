<template>
    <div class="container py-5 h-100">
        <div class="row justify-content-center">

            <h1 class="text-primary" style="font-family: 'Sofia';">{{ nickName }}'s List!🪄</h1>

            <section class="vh-100 gradient-custom mt-3">
                <div class="container">
                    <div class="row d-flex justify-content-center align-items-center h-100">
                        <div class="col col-12">

                            <div class="card">
                                <div class="card-body py-4">

                                    <form class="d-flex mt-4">
                                        <input class="form-control border-info me-2" type="search" v-model="search"
                                            placeholder="Search keyword...">
                                        <button class="btn btn-primary btn-lg my-2 my-sm-0" type="submit">Search</button>
                                    </form>

                                    &nbsp;

                                    <!-- Tabs navs -->
                                    <div class="d-flex">
                                        <ul class="nav nav-tabs mt-2 mb-2 pb-2" id="ex1" role="tablist">
                                            <li @click="getAllListItem" class="nav-item" role="presentation">
                                                <a class="nav-link active" id="ex1-tab-2" data-mdb-tab-init
                                                    href="#ex1-tabs-2" role="tab" aria-controls="ex1-tabs-2"
                                                    aria-selected="false">All</a>
                                            </li>
                                            <li @click="getActiveListItems" class="nav-item" role="presentation">
                                                <a class="nav-link" id="ex1-tab-2" data-mdb-tab-init href="#ex1-tabs-2"
                                                    role="tab" aria-controls="ex1-tabs-2" aria-selected="false">Active</a>
                                            </li>
                                            <li @click="getCompletedListItems" class="nav-item" role="presentation">
                                                <a class="nav-link" id="ex1-tab-3" data-mdb-tab-init href="#ex1-tabs-3"
                                                    role="tab" aria-controls="ex1-tabs-3"
                                                    aria-selected="false">Completed</a>
                                            </li>
                                            <div class="d-flex position-absolute end-0 mb-2 me-3">
                                                <input class="form-control border-info me-2" type="text" v-model="todo_text"
                                                    placeholder="New task...">
                                                <button @click="createListItem" class="btn btn-secondary btn-lg"
                                                    type="button">➕Add</button>
                                            </div>
                                        </ul>
                                    </div>

                                    <!-- Tabs content -->
                                    <div class="tab-content" id="ex1-content">
                                        <div class="tab-pane fade show active" id="ex1-tabs-1" role="tabpanel"
                                            aria-labelledby="ex1-tab-1">
                                            <ul class="list-group mb-0">
                                                <li v-for="(listItem, i) in listItems" :key="i" v-bind:listItem="listItem"
                                                    class="list-group-item d-flex align-items-center border-0 mb-2 rounded"
                                                    style="background-color: #f4f6f0;">
                                                    {{ listItem.todo_text }}
                                                    <div class="position-absolute end-0">
                                                        <button class="btn btn-outline-dark btn-sm me-2"
                                                            type="button">✏️</button>
                                                        <button class="btn btn-outline-danger btn-sm me-2"
                                                            type="button">❌</button>
                                                    </div>
                                                </li>
                                            </ul>
                                        </div>
                                    </div>

                                    <!-- pagination -->
                                    <div class="row d-flex justify-content-center mt-5">
                                        <ul class="justify-content-center pagination">
                                            <li class="page-item disabled">
                                                <a class="page-link" href="#">&laquo;</a>
                                            </li>
                                            <li class="page-item active">
                                                <a class="page-link" href="#">1</a>
                                            </li>
                                            <li class="page-item">
                                                <a class="page-link" href="#">2</a>
                                            </li>
                                            <li class="page-item">
                                                <a class="page-link" href="#">3</a>
                                            </li>
                                            <li class="page-item">
                                                <a class="page-link" href="#">4</a>
                                            </li>
                                            <li class="page-item">
                                                <a class="page-link" href="#">5</a>
                                            </li>
                                            <li class="page-item">
                                                <a class="page-link" href="#">&raquo;</a>
                                            </li>
                                        </ul>
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

export default {
    name: 'MyList',

    data() {
        return {
            nickName: "",
            token: "",
            search: "",
            add: "",
            todo_text: "",
            listItems: []
        }
    },

    async mounted() {
        // 토큰을 통해 사용자를 찾기, 그 사용자의 닉네임을 바인딩
        this.token = localStorage.getItem("accessToken");
        try {
            const response = await axios.get(`/auth/getValidateUser/${this.token}`);
            this.nickName = response.data.nickName;
            console.log("response", response.data.nickName);
            // 마이리스트 페이지에 들어오면 항상 all로 조회
            this.getAllListItem();
        } catch (error) {
            console.log("error", error);
        }
    },

    methods: {
        async getAllListItem() {
            try {
                const response = await axios.get("/lists/item", {
                    headers: {
                        Authorization: `Bearer ${this.token}`
                    }
                });
                this.listItems = response.data;
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
                    console.log("response", response);
                } catch (error) {
                    console.log("error", error);
                }
            } else {
                console.log("입력하셔야 합니다.");
            }
        }
    }
}
</script>
