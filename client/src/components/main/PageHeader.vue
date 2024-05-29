<template>
  <nav class="navbar fixed-top navbar-expand-lg bg-primary" data-bs-theme="dark">
    <div class="container-fluid">
      <a @click="goToMain" class="navbar-brand fs-3" href="/" style="font-family: 'Sofia';">Haera<small>♥</small></a>
      <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarColor01"
        aria-controls="navbarColor01" aria-expanded="false" aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
      </button>
    <div class="col-1 d-flex justify-content-between"> <!-- 수평 정렬을 위한 부분 -->
      <button v-if="!isSignedIn" @click="goToSignIn" type="button" class="btn btn-outline-dark px-3 pt-2">Sign In</button>
      <button v-else @click="signOut" type="button" class="btn btn-outline-dark px-3 pt-2">Sign Out</button>
      <button v-if="isSignedIn" @click="goToMyProfileUpdate" class="btn btn-dark btn-sm">⚙️</button>
    </div>

    </div>
  </nav>
</template>

<script>
export default {
  name: 'PageHeader',

  computed: {
    isSignedIn() {
      return localStorage.getItem("isSignedIn") == "true";
    }
  },

  methods: {
    goToMain() {
      this.$router.push("/");
    },

    goToSignIn() {
      this.$router.push("/signin");
    },

    goToMyProfileUpdate() {
      this.$router.push("/myprofileupdate");
    },

    signOut() {
      localStorage.removeItem("accessToken");
      localStorage.removeItem("isSignedIn");
      this.$router.push("/");
    }
  }
}
</script>
