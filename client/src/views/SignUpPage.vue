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
              <button @click="checkNickNameAvailability" class="btn btn-secondary btn-sm" type="button"
                id="button-addon2">Check
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
      nickName: "",
      isNickNameChecked: true,
      errorMessage: ""
    }
  },

  methods: {
    async checkNickNameAvailability() {
      try {
        const response = await axios.get("/auth/nickNameExists", {
          params: {
            nickName: this.nickName
          }
        });
        this.isNickNameChecked = response.data;
        if (!this.isNickNameChecked) {
          console.log("사용가능한 닉네임입니다.", this.isNickNameChecked);
          return this.isNickNameChecked;
        } else {
          console.log("닉네임이 중복됩니다.", this.isNickNameChecked);
          return false;
        }
      } catch (error) {
        console.log("error", error);
        return false;
      }

    },

    async signUp() {
      const authCreateDto = {
        email: this.email,
        password: this.password,
        confirmPassword: this.confirmPassword,
        nickName: this.nickName
      };

      try {
        const response = await axios.post("/auth/signUp", authCreateDto);
        console.log("회원가입 성공 여부: ", response.data);
        const { accessToken } = response.data;
        localStorage.setItem("accessToken", accessToken);
        localStorage.setItem("isSignedIn", "true");
        localStorage.setItem("isSignInSuccess", "true");
        localStorage.setItem("isSignedUp", "true");
        this.createList();
        await this.$router.push("/");
        window.location.reload();
      } catch (error) {
        this.errorMessage = error.response.data.message;
        console.log("errorMessage: ", this.errorMessage);
        console.log("error", error);
      }
    },

    async createList() {
      const token = localStorage.getItem("accessToken");
      try {
        const response = await axios.post("/lists", null, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
        console.log("response", response.data);
      } catch (error) {
        console.log("error", error);
      }
    }
  }

}
</script>
  