<template>
  <nav class="navbar fixed-top navbar-expand-lg bg-primary" data-bs-theme="dark">
    <div class="container-fluid">
      <a @click="goToMain" class="navbar-brand fs-3" href="/" style="font-family: 'Sofia';">Haera<small>♥</small></a>
      <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarColor01"
        aria-controls="navbarColor01" aria-expanded="false" aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
      </button>
      <!-- <div class="collapse navbar-collapse" id="navbarColor01">
      <ul class="navbar-nav me-auto">
        <li class="nav-item">
          <a class="nav-link active" href="#">Demo
            <span class="visually-hidden">(current)</span>
          </a>
        </li>
        <li class="nav-item">
          <a class="nav-link" href="#">About</a>
        </li>
      </ul>
    </div> -->
    <div class="col-1 d-flex justify-content-between"> <!-- 수평 정렬을 위한 부분 -->
      <button @click="goToSignIn" type="button" class="btn btn-outline-dark px-3 pt-2">Sign In</button>
      <button @click="goToMyProfileUpdate" class="btn btn-dark btn-sm">⚙️</button>
    </div>

    </div>
  </nav>
</template>

<script>
export default {
  name: 'PageHeader',
  components: {

  },
  methods: {
    goToMain() {
      this.$router.push('/');
    },
    goToSignIn() {
      this.$router.push('/signin');
    },
    goToMyProfileUpdate() {
      this.$router.push('/myprofileupdate');
    }
  }
}
</script>
