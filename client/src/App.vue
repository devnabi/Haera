<template>
  <link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Sofia">
  <div id="app">
    <PageHeader></PageHeader>
    <router-view>
    </router-view>
    <PageFooter></PageFooter>
  </div>
</template>

<script>
import PageHeader from '@/components/main/PageHeader.vue';
import PageFooter from '@/components/main/PageFooter.vue';
import { jwtDecode } from 'jwt-decode';

export default {
  name: 'App',

  components: {
    PageHeader,
    PageFooter
  },

  computed: {
    isSignedIn() {
      return localStorage.getItem("isSignedIn") === "true";
    }
  },

  async created() {
    setInterval(() => {
      if (this.isSignedIn) {
        const token = localStorage.getItem("accessToken");
        try {
          const decoded = jwtDecode(token);
          const currentTime = Date.now() / 1000; // 현재 시간
          const expiryTime = decoded.exp; // 만료 시간
          if (currentTime >= expiryTime) {
            this.signOut();
            alert("안전한 서비스 사용을 위해 자동으로 로그아웃 되었습니다. 다시 로그인 해주세요.");
          }
        } catch (error) {
          this.signOut();
        }
      }
    }, 60000) // 60초 마다 만료 확인
  },

  methods: {
    async signOut() {
      localStorage.removeItem("accessToken");
      localStorage.removeItem("isSignedIn");
      await this.$router.push("/");
      await new Promise((resolve) => {
        setTimeout(resolve, 1000);
      })
      window.location.reload();
    },
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  /* color: #2c3e50; */
  color: aliceblue;
  margin-top: 60px;
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  /* viewport의 전체 높이를 차지 */
  width: 100vw;
  background: linear-gradient(50deg, #144375, black);
}
</style>
