<template>
  <nav class="navbar fixed-top navbar-expand-lg bg-primary" data-bs-theme="dark">
    <div class="container-fluid">
      <a @click="goToMain" class="navbar-brand fs-3" href="/" style="font-family: 'Sofia';">Haera<small>♥</small></a>
      <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarColor01"
        aria-controls="navbarColor01" aria-expanded="false" aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="col-1 d-flex justify-content-end"> <!-- 수평 정렬을 위한 부분 -->
        <button v-if="!isSignedIn" @click="goToSignIn" type="button" class="btn btn-outline-dark px-3 pt-2 me-3">Sign
          In</button>
        <button v-else @click="signOut" type="button" class="btn btn-outline-dark px-3 pt-2 me-3">Sign Out</button>
        <button @click="goToMyProfileUpdate" class="btn btn-dark btn-sm">⚙️</button>
      </div>

    </div>
  </nav>
</template>

<script>
import { toast } from "vue3-toastify";
import "vue3-toastify/dist/index.css";

export default {
  name: 'PageHeader',

  computed: {
    isSignedIn() {
      return localStorage.getItem("isSignedIn") == "true";
    }
  },

  setup() {
    const requireSignOut = () => {
      toast("로그아웃!", {
        autoClose: 1000,
        position: "top-center",
        theme: "dark",
        type: "danger",
        transition: "bounce",
        closeOnClick: true
      });
    }
    return { requireSignOut };
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

    async signOut() {
      localStorage.removeItem("accessToken");
      localStorage.removeItem("isSignedIn");
      localStorage.removeItem("isSignInSuccess");
      localStorage.removeItem("isSignedUp");
      await this.$router.push("/");
      this.requireSignOut();
      await new Promise((resolve) => {
        setTimeout(resolve, 1000);
      })
      window.location.reload();
    }
  }
}
</script>
