<template>
  <div class="d-flex vh-100 justify-content-center">

    <form>
      <fieldset>
        <div class="mt-4">
          <h1 class="text-primary" style="font-family: 'Sofia';">Sign Up</h1>
        </div>

        <div class="container mt-3">

          <!-- 이메일이 인증되었으면 확인 문구를 보여주기 -->
          <div class="row justify-content-center">
            <label for="exampleInputEmail1"
              class="col-form-label col-form-label-lg mt-4 custom-cursor-default-hover">Email
              Address</label>
            <div class="input-group">
              <input type="email" v-model="email" class="form-control form-control-lg" id="exampleInputEmail1"
                aria-describedby="emailHelp" placeholder="Haera@example.com">
            </div>
          </div>

          <small id="emailHelp" class="form-text text-muted">We'll never share your email with anyone else.</small>

          <div class="row justify-content-center">
            <label for="exampleInputPassword1" class="col-form-label col-form-label-lg mt-4">Password</label>
            <div class="input-group">
              <input type="password" v-model="password" class="form-control form-control-lg" id="exampleInputPassword1"
                placeholder="Password" autocomplete="off">
            </div>
          </div>

          <!-- 비밀번호가 위의 것과 다르면 문구로 보여주기 -->
          <div class="row justify-content-center">
            <label for="exampleInputPassword1" class="col-form-label col-form-label-lg mt-4">Confirm Password</label>
            <div class="input-group">
              <input type="password" v-model="confirmPassword" class="form-control form-control-lg"
                id="exampleInputPassword1" placeholder="Confirm Password" autocomplete="off">
            </div>
          </div>

          <!-- 입력한 닉네임의 가능여부를 문구로 보여주기 -->
          <div class="row justify-content-center">
            <label for="nick name" class="col-form-label col-form-label-lg mt-4">Nick Name</label>
            <div class="input-group">
              <input type="text" v-model="nickName" class="form-control form-control-lg" placeholder="Nick Name"
                aria-label="Recipient's username" aria-describedby="button-addon2">
              <button @click="checkAvailability" class="btn btn-secondary btn-sm" type="button" id="button-addon2">Check
                Availability</button>
            </div>
          </div>

          <button type="submit" @click.prevent="signUp" class="btn btn-primary btn-lg my-5">Sign Up!</button>

        </div>
      </fieldset>
    </form>

  </div>
</template>
  
<script>
import axios from 'axios';

export default {
  name: 'SignUpPage',

  data() {
    return {
      email: "",
      password: "",
      confirmPassword: "",
      nickName: ""
    }
  },

  methods: {
    async checkAvailability() {
      //닉네임 중복 체크 요청
      try {
        const response = await axios.get("/auth/checkNickName", {
          params: {
            nickName: this.nickName
          }
        });
        console.log("닉네임 중복 여부: ", response.data);
      } catch (error) {
        console.log("error", error);
      }
    },

    async signUp() {
      const authCredentialsDto = {
        email: this.email,
        password: this.password,
        confirmPassword: this.confirmPassword,
        nickName: this.nickName
      };
      
      if (this.password === this.confirmPassword) {
        try {
          const response = await axios.post("/auth/signUp", authCredentialsDto);
          console.log("회원가입 성공 여부: ", response.data);
          const { accessToken } = response.data;
          localStorage.setItem("accessToken", accessToken);
          localStorage.setItem("isSignedIn", "true");
          this.$router.push({ path: '/', query: { registered: true } });
        } catch (error) {
          console.log("error", error);
        }
      } else {
        console.log("비밀번호가 일치하지 않습니다.");
      }
    },
  }

}
</script>
  