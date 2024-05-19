<template>
  <div class="d-flex vh-100 justify-content-center">

    <form>
      <fieldset>
        <div class="mt-4">
          <h1 class="text-primary" style="font-family: 'Sofia';">Sign Up</h1>
        </div>

        <div class="container mt-3">

          <div class="row justify-content-center">
            <label for="exampleInputEmail1"
              class="col-form-label col-form-label-lg mt-4 custom-cursor-default-hover">Email
              Address</label>
            <div class="input-group">
              <input type="email" class="form-control form-control-lg" id="exampleInputEmail1"
                aria-describedby="emailHelp" placeholder="Haera@example.com">
              <button class="btn btn-secondary btn-sm" type="button" id="button-addon2">Email Verification</button>
            </div>
          </div>
          
          <small id="emailHelp" class="form-text text-muted">We'll never share your email with anyone else.</small>

          <div class="row justify-content-center">
            <label for="exampleInputPassword1" class="col-form-label col-form-label-lg mt-4">Password</label>
            <div class="input-group">
              <input type="password" class="form-control form-control-lg" id="exampleInputPassword1"
                placeholder="Password" autocomplete="off">
            </div>
          </div>

          <div class="row justify-content-center">
            <label for="exampleInputPassword1" class="col-form-label col-form-label-lg mt-4">Check Password</label>
            <div class="input-group">
              <input type="password" class="form-control form-control-lg" id="exampleInputPassword1"
                placeholder="Check Password" autocomplete="off">
            </div>
          </div>

          <div class="row justify-content-center">
            <label for="nick name" class="col-form-label col-form-label-lg mt-4">Nick Name</label>
            <div class="input-group">
              <input type="text" class="form-control form-control-lg" placeholder="Nick Name"
                aria-label="Recipient's username" aria-describedby="button-addon2">
              <button class="btn btn-secondary btn-sm" type="button" id="button-addon2">Check Availability</button>
            </div>
          </div>

          <button type="submit" class="btn btn-primary btn-lg my-5">Sign Up!</button>

        </div>
      </fieldset>
    </form>

  </div>
</template>
  
<script>
export default {
  name: 'SignUpPage'
}
</script>
  