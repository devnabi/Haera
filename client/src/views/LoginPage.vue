<template>
  <div class="d-flex vh-100 justify-content-center">

    <form>
      <fieldset>
        <div class="mt-4">
          <h1 class="text-primary" style="font-family: 'Sofia';">Login</h1>
        </div>

        <div class="container mt-3">

          <div class="row justify-content-center">
            <label for="exampleInputEmail1"
              class="col-form-label col-form-label-lg mt-4 custom-cursor-default-hover">Email
              Address</label>
            <div class="input-group">
              <input type="email" class="form-control form-control-lg" id="exampleInputEmail1"
                aria-describedby="emailHelp" placeholder="Haera@example.com">
            </div>
          </div>

          <div class="row justify-content-center">
            <label for="exampleInputPassword1" class="col-form-label col-form-label-lg mt-4">Password</label>
            <div class="input-group">
              <input type="password" class="form-control form-control-lg" id="exampleInputPassword1"
                placeholder="Password" autocomplete="off">
            </div>
          </div>

          <div class="row justify-content-center">
            <div class="form-check mt-4">
              <input class="col-form-check-input custom-cursor-default-hover me-3" type="checkbox" value="" id="flexCheckDefault">
              <label class="form-check-label custom-cursor-default-hover" for="flexCheckDefault">
                Remember ID
              </label>
            </div>
          </div>

          <div class="row justify-content-center mt-2">
            <div class="col-auto">
              <a class="btn btn-link" href="#">Find ID</a>
            </div>
            <div class="col-auto">
              <a @click="changePopState" class="btn btn-link" href="/findpassword">Find Password</a>
            </div>
          </div>
        </div>

        <button type="submit" class="btn btn-primary btn-lg my-5 px-5 py-2">Ok!</button>
      </fieldset>
      <a class="text-secondary" href="/signup">Are you not a member?</a>
    </form>

  </div>
</template>

<script>
export default {
  name: 'LoginPage',

  data() {
    return {
      
    }
  },

  methods: {}
}
</script>
