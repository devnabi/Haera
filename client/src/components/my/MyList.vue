<template>
    <div class="container">
        <div class="row justify-content-center">

            <div class="mt-4">
                <h1 class="text-primary" style="font-family: 'Sofia';">{{ userNickName }}'s List!🪄</h1>
            </div>

            <section class="vh-100 gradient-custom">
                <div class="container py-5 h-100">
                    <div class="row d-flex justify-content-center align-items-center h-100">
                        <div class="col col-xl-10">

                            <div class="card mb-5">
                                <div class="card-body p-5">

                                    <form class="d-flex">
                                        <input class="form-control me-sm-2" type="text" placeholder="New task...">
                                        <button class="btn btn-secondary btn-lg my-2 my-sm-0" type="submit">➕Add</button>
                                    </form>

                                    &nbsp;

                                    <!-- Tabs navs -->
                                    <ul class="nav nav-tabs mb-4 pb-2" id="ex1" role="tablist">
                                        <li class="nav-item" role="presentation">
                                            <a class="nav-link active" id="ex1-tab-1" data-mdb-tab-init href="#ex1-tabs-1"
                                                role="tab" aria-controls="ex1-tabs-1" aria-selected="true">All</a>
                                        </li>
                                        <li class="nav-item" role="presentation">
                                            <a class="nav-link" id="ex1-tab-2" data-mdb-tab-init href="#ex1-tabs-2"
                                                role="tab" aria-controls="ex1-tabs-2" aria-selected="false">Active</a>
                                        </li>
                                        <li class="nav-item" role="presentation">
                                            <a class="nav-link" id="ex1-tab-3" data-mdb-tab-init href="#ex1-tabs-3"
                                                role="tab" aria-controls="ex1-tabs-3" aria-selected="false">Completed</a>
                                        </li>
                                    </ul>

                                    <!-- Tabs content -->
                                    <div class="tab-content" id="ex1-content">
                                        <div class="tab-pane fade show active" id="ex1-tabs-1" role="tabpanel"
                                            aria-labelledby="ex1-tab-1">
                                            <ul class="list-group mb-0">
                                                <li class="list-group-item d-flex align-items-center border-0 mb-2 rounded"
                                                    style="background-color: #f4f6f7;">
                                                    <input class="form-check-input me-2" type="checkbox" value=""
                                                        aria-label="..." checked />
                                                    <s>Cras justo odio</s>
                                                </li>
                                                <li class="list-group-item d-flex align-items-center border-0 mb-2 rounded"
                                                    style="background-color: #f4f6f7;">
                                                    <input class="form-check-input me-2" type="checkbox" value=""
                                                        aria-label="..." checked />
                                                    <s>Dapibus ac facilisis in</s>
                                                </li>
                                                <li class="list-group-item d-flex align-items-center border-0 mb-2 rounded"
                                                    style="background-color: #f4f6f7;">
                                                    <input class="form-check-input me-2" type="checkbox" value=""
                                                        aria-label="..." />
                                                    Morbi leo risus
                                                </li>
                                                <li class="list-group-item d-flex align-items-center border-0 mb-2 rounded"
                                                    style="background-color: #f4f6f7;">
                                                    <input class="form-check-input me-2" type="checkbox" value=""
                                                        aria-label="..." />
                                                    Porta ac consectetur ac
                                                </li>
                                                <li class="list-group-item d-flex align-items-center border-0 mb-0 rounded"
                                                    style="background-color: #f4f6f7;">
                                                    <input class="form-check-input me-2" type="checkbox" value=""
                                                        aria-label="..." />
                                                    Vestibulum at eros
                                                </li>
                                            </ul>
                                        </div>
                                        <div class="tab-pane fade" id="ex1-tabs-2" role="tabpanel"
                                            aria-labelledby="ex1-tab-2">
                                            <ul class="list-group mb-0">
                                                <li class="list-group-item d-flex align-items-center border-0 mb-2 rounded"
                                                    style="background-color: #f4f6f7;">
                                                    <input class="form-check-input me-2" type="checkbox" value=""
                                                        aria-label="..." />
                                                    Morbi leo risus
                                                </li>
                                                <li class="list-group-item d-flex align-items-center border-0 mb-2 rounded"
                                                    style="background-color: #f4f6f7;">
                                                    <input class="form-check-input me-2" type="checkbox" value=""
                                                        aria-label="..." />
                                                    Porta ac consectetur ac
                                                </li>
                                                <li class="list-group-item d-flex align-items-center border-0 mb-0 rounded"
                                                    style="background-color: #f4f6f7;">
                                                    <input class="form-check-input me-2" type="checkbox" value=""
                                                        aria-label="..." />
                                                    Vestibulum at eros
                                                </li>
                                            </ul>
                                        </div>
                                        <div class="tab-pane fade" id="ex1-tabs-3" role="tabpanel"
                                            aria-labelledby="ex1-tab-3">
                                            <ul class="list-group mb-0">
                                                <li class="list-group-item d-flex align-items-center border-0 mb-2 rounded"
                                                    style="background-color: #f4f6f7;">
                                                    <input class="form-check-input me-2" type="checkbox" value=""
                                                        aria-label="..." checked />
                                                    <s>Cras justo odio</s>
                                                </li>
                                                <li class="list-group-item d-flex align-items-center border-0 mb-2 rounded"
                                                    style="background-color: #f4f6f7;">
                                                    <input class="form-check-input me-2" type="checkbox" value=""
                                                        aria-label="..." checked />
                                                    <s>Dapibus ac facilisis in</s>
                                                </li>
                                            </ul>
                                        </div>
                                    </div>

                                    <!-- pagination -->
                                    <div class="row justify-content-center mt-5">
                                        <ul class="pagination col-3">
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
export default {
    name: 'MyList',
    data() {
        return {
            userNickName: 'H' // 임시 데이터
        }
    }
}
</script>
