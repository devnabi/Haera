<template>
  <div class="d-flex align-items-center justify-content-center vh-100 mb-5 pb-5">
    <div class="text-center mb-5 pb-5">
      <h1 class="display-1 fw-bold text-secondary">Success</h1>
      <p class="fs-3">
        <span class="text-info">이메일이 인증되었습니다!</span>
      </p>
    </div>
  </div>
</template>
    
<script>
import axios from 'axios';

export default {
  name: 'EmailVerificationSuccessPage',

  async created() {
    // URL에서 토큰 추출
    const token = this.$route.query.token;
    console.log("토큰: ", token);

    try {
      const response = await axios.post("/auth/verifyTokenAndUpdateEmailVerificationStatus", null, {
        params: {
          token: token
        }
      });
      console.log("response", response.data);

    } catch (error) {
      console.log("error", error);
    }
  },
};
</script>

<style></style>
