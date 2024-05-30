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

export default {
  name: 'App',
  components: {
    PageHeader,
    PageFooter
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
  min-height: 100vh; /* viewport의 전체 높이를 차지 */
  width: 100vw;
  background: linear-gradient(50deg, #144375, black);
}
</style>
