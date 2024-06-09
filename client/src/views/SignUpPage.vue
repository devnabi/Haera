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
      nickName: "",
      isNickNameChecked: false
    }
  },

  watch: {
    // 닉네임이 변경될 때마다 isNickNameChecked를 false로 초기화
    nickName() {
      this.isNickNameChecked = false;
    }
  },

  methods: {
    async checkAvailability() {
      if (this.nickName && this.nickName.trim().length > 0) {
        //닉네임 중복 체크 요청
        try {
          const response = await axios.get("/auth/nickNameExists", {
            params: {
              nickName: this.nickName
            }
          });
          console.log("닉네임 중복 여부: ", response.data);
          if (response.data == false) {
            this.isNickNameChecked = true;
            console.log("닉네임 사용 가능");
          } else {
            this.isNickNameChecked = false;
            console.log("닉네임 중복");
          }
        } catch (error) {
          this.isNickNameChecked = false;
          console.log("error", error);
        }
      } else {
        console.log("닉네임은 필수 항목이며, 0자 이상이여야 합니다.");
      }
    },

    async signUp() {
      const authCredentialsDto = {
        email: this.email,
        password: this.password,
        confirmPassword: this.confirmPassword,
        nickName: this.nickName
      };

      // 이메일이 입력되지 않았을 때
      if (!this.email) {
        console.log("이메일을 입력해야 합니다.");
        return;
      }
      // 비밀번호가 입력되지 않았거나 비밀번호가 일치하지 않을 때
      if ((!this.password) || (this.password.trim().length < 8) || (this.password !== this.confirmPassword)) {
        console.log("비밀번호를 8자 이상 입력해야 하며, 비밀번호와 확인 비밀번호가 일치해야 합니다.");
        return;
      }

      // 닉네임 중복 체크가 되지 않았을 때
      if (!this.isNickNameChecked) {
        console.log("닉네임 중복 체크를 하셔야 합니다.");
        return;
      }

      try {
        const response = await axios.post("/auth/signUp", authCredentialsDto);
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
  