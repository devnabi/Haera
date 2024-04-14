<template>
  <div class="card bg-dark text-white bg-transparent">
    <div class="container">
      <div class="row justify-content-center">

        <div class="card mb-5">
          <div class="row g-0">
            <div class="col-lg-4 d-flex align-items-center justify-content-center">
              <img src="@/assets/todolist.jpg" class="img-fluid rounded-start" alt="img">
            </div>
            <div class="col-md-8">
              <div class="card-body">
                <h1 class="card-title">Welcome to the Haera website!</h1>
                <p class="card-text mt-4 fs-4">"Haera" means "do it!"<br>
                  Write down what you want to do and what you need to do to make your life
                  fulfilling!😊<br>
                  Check out the tutorial below.<br>
                  Easily get acquainted with it through the demo,<br>
                  allowing you to start right away!
                </p>
                <p class="blockquote-footer mt-2">
                  Haera's <cite title="Source Title">Developer</cite>
                </p>
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>
  </div>

  <!-- accordion -->
  <div class="accordion mt-5" id="accordionExample">
    <div class="container mt-4">
      <div class="row justify-content-center row-col-auto">

        <div class="Tutorial">
          <h1 class="text-primary py-2" style="font-family: 'Sofia'; background: white;">Tutorial</h1>
        </div>

        <div class="accordion-item col-2">
          <h2 class="accordion-header" id="headingOne">
            <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse"
              data-bs-target="#collapseOne" aria-expanded="false" aria-controls="collapseOne">
              1. Add a list
            </button>
          </h2>
          <div id="collapseOne" class="accordion-collapse collapse" aria-labelledby="headingOne"
            data-bs-parent="#accordionExample" style="">
            <div class="accordion-body">
              <strong>This is the first item's accordion body.</strong>
            </div>
          </div>
        </div>

        <div class="accordion-item col-2">
          <h2 class="accordion-header" id="headingTwo">
            <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse"
              data-bs-target="#collapseTwo" aria-expanded="false" aria-controls="collapseTwo">
              2. Update a list
            </button>
          </h2>
          <div id="collapseTwo" class="accordion-collapse collapse" aria-labelledby="headingTwo"
            data-bs-parent="#accordionExample" style="">
            <div class="accordion-body">
              <strong>This is the second item's accordion body.</strong>
            </div>
          </div>
        </div>

        <div class="accordion-item col-2">
          <h2 class="accordion-header" id="headingTwo">
            <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse"
              data-bs-target="#collapseTwo" aria-expanded="false" aria-controls="collapseTwo">
              3. Delete a list
            </button>
          </h2>
          <div id="collapseTwo" class="accordion-collapse collapse" aria-labelledby="headingTwo"
            data-bs-parent="#accordionExample" style="">
            <div class="accordion-body">
              <strong>This is the second item's accordion body.</strong>
            </div>
          </div>
        </div>

        <div class="accordion-item col-2">
          <h2 class="accordion-header" id="headingTwo">
            <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse"
              data-bs-target="#collapseTwo" aria-expanded="false" aria-controls="collapseTwo">
              4. Check & manage lists
            </button>
          </h2>
          <div id="collapseTwo" class="accordion-collapse collapse" aria-labelledby="headingTwo"
            data-bs-parent="#accordionExample" style="">
            <div class="accordion-body">
              <strong>This is the second item's accordion body.</strong>
            </div>
          </div>
        </div>

        <div class="accordion-item col-2">
          <h2 class="accordion-header" id="headingTwo">
            <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse"
              data-bs-target="#collapseTwo" aria-expanded="false" aria-controls="collapseTwo">
              5. View lists
            </button>
          </h2>
          <div id="collapseTwo" class="accordion-collapse collapse" aria-labelledby="headingTwo"
            data-bs-parent="#accordionExample" style="">
            <div class="accordion-body">
              <strong>This is the second item's accordion body.</strong>
            </div>
          </div>
        </div>

      </div>
    </div>
  </div>

  <!-- list -->
  <section class="vh-100 gradient-custom">
    <div class="container py-5 h-100">
      <div class="row d-flex justify-content-center align-items-center h-100">
        <div class="col col-xl-10">

          <div class="card">
            <div class="card-body py-4">

              <div class="demo">
                <h1 class="text-primary" style="font-family: 'Sofia';">Demo</h1>
              </div>

              <form class="d-flex">
                <input class="form-control me-sm-2" type="text" placeholder="New task...">
                <button class="btn btn-secondary btn-lg my-2 my-sm-0" type="submit">➕Add</button>
              </form>

              &nbsp;

              <!-- Tabs navs -->
              <ul class="nav nav-tabs mb-4 pb-2" id="ex1" role="tablist">
                <li class="nav-item" role="presentation">
                  <a class="nav-link active" id="ex1-tab-1" data-mdb-tab-init href="#ex1-tabs-1" role="tab"
                    aria-controls="ex1-tabs-1" aria-selected="true">All</a>
                </li>
                <li class="nav-item" role="presentation">
                  <a class="nav-link" id="ex1-tab-2" data-mdb-tab-init href="#ex1-tabs-2" role="tab"
                    aria-controls="ex1-tabs-2" aria-selected="false">Active</a>
                </li>
                <li class="nav-item" role="presentation">
                  <a class="nav-link" id="ex1-tab-3" data-mdb-tab-init href="#ex1-tabs-3" role="tab"
                    aria-controls="ex1-tabs-3" aria-selected="false">Completed</a>
                </li>
              </ul>

              <!-- Tabs content -->
              <div class="tab-content" id="ex1-content">
                <div class="tab-pane fade show active" id="ex1-tabs-1" role="tabpanel" aria-labelledby="ex1-tab-1">
                  <ul class="list-group mb-0">
                    <li class="list-group-item d-flex align-items-center border-0 mb-2 rounded"
                      style="background-color: #f4f6f7;">
                      <input class="form-check-input me-2" type="checkbox" value="" aria-label="..." checked />
                      <s>Cras justo odio</s>
                    </li>
                    <li class="list-group-item d-flex align-items-center border-0 mb-2 rounded"
                      style="background-color: #f4f6f7;">
                      <input class="form-check-input me-2" type="checkbox" value="" aria-label="..." checked />
                      <s>Dapibus ac facilisis in</s>
                    </li>
                    <li class="list-group-item d-flex align-items-center border-0 mb-2 rounded"
                      style="background-color: #f4f6f7;">
                      <input class="form-check-input me-2" type="checkbox" value="" aria-label="..." />
                      Porta ac consectetur ac
                    </li>
                    <li class="list-group-item d-flex align-items-center border-0 mb-0 rounded"
                      style="background-color: #f4f6f7;">
                      <input class="form-check-input me-2" type="checkbox" value="" aria-label="..." />
                      Vestibulum at eros
                    </li>
                  </ul>
                </div>
                <div class="tab-pane fade" id="ex1-tabs-2" role="tabpanel" aria-labelledby="ex1-tab-2">
                  <ul class="list-group mb-0">
                    <li class="list-group-item d-flex align-items-center border-0 mb-2 rounded"
                      style="background-color: #f4f6f7;">
                      <input class="form-check-input me-2" type="checkbox" value="" aria-label="..." />
                      Porta ac consectetur ac
                    </li>
                    <li class="list-group-item d-flex align-items-center border-0 mb-0 rounded"
                      style="background-color: #f4f6f7;">
                      <input class="form-check-input me-2" type="checkbox" value="" aria-label="..." />
                      Vestibulum at eros
                    </li>
                  </ul>
                </div>
                <div class="tab-pane fade" id="ex1-tabs-3" role="tabpanel" aria-labelledby="ex1-tab-3">
                  <ul class="list-group mb-0">
                    <li class="list-group-item d-flex align-items-center border-0 mb-2 rounded"
                      style="background-color: #f4f6f7;">
                      <input class="form-check-input me-2" type="checkbox" value="" aria-label="..." checked />
                      <s>Cras justo odio</s>
                    </li>
                    <li class="list-group-item d-flex align-items-center border-0 mb-2 rounded"
                      style="background-color: #f4f6f7;">
                      <input class="form-check-input me-2" type="checkbox" value="" aria-label="..." checked />
                      <s>Dapibus ac facilisis in</s>
                    </li>
                  </ul>
                </div>
              </div>

            </div>
          </div>

        </div>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  name: 'MainPage'
}
</script>
