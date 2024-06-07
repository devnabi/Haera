<template>
  <div class="container py-5 h-100">
    <div class="row justify-content-center">

      <div class="card border-secondary bg-dark text-white mb-5">
        <div class="row g-0 align-items-center justify-content-center">
          <div class="col-lg-5">
            <img src="@/assets/todolist.jpg" class="img-fluid rounded-start" alt="img">
          </div>
          <div class="col-md-8">
            <div class="card-body">
              <h1 class="card-title">Welcome to the Haera website!</h1>
              <p class="card-text mt-4 fs-4">"Haera" means "do it!"<br>
                Write down what you want to do and what you need to do to make your life
                fulfilling!😊
              </p>
              <p class="blockquote-footer mt-2">
                Haera's <cite title="Source Title">Developer</cite>
              </p>
            </div>
          </div>
        </div>
      </div>

      <div class="position-relative mt-5">
        <button type="button" @click="goToMyList" class="btn btn-outline-secondary btn-lg mt-5 py-4 px-5"><strong>Go To
            MyList</strong></button>
      </div>

    </div>
  </div>
</template>

<script>
import { toast } from "vue3-toastify";
import "vue3-toastify/dist/index.css";

export default {
  name: 'MainPage',

  computed: {
    isSignedUp() {
      return localStorage.getItem("isSignedUp") == "true";
    },

    isSignedIn() {
      return localStorage.getItem("isSignedIn") == "true";
    },

    isSignInSuccess() {
      return localStorage.getItem("isSignInSuccess") == "true";
    }
  },

  setup() {
    const showEmailVerificationToast = (callback) => {
      toast("이메일 인증 링크를 보냈습니다! \n계정을 유지하려면 3일 내로 인증을 완료하세요.", {
        autoClose: false,
        position: "bottom-right",
        theme: "dark",
        type: "warning",
        transition: "bounce",
        closeOnClick: true,
        onClose: callback,
        style: {
          whiteSpace: "pre-line", // 줄바꿈
        }
      });
    }

    const showSignInSuccessToast = (callback) => {
      toast("로그인 성공!", {
        autoClose: 1000,
        position: "top-center",
        theme: "dark",
        type: "success",
        transition: "bounce",
        closeOnClick: true,
        onClose: callback
      });
    }

    const requireSignIn = (callback) => {
      toast("로그인을 하셔야 접근이 가능합니다.", {
        autoClose: 1000,
        position: "top-center",
        theme: "dark",
        type: "warning",
        transition: "bounce",
        closeOnClick: true,
        onClose: callback, // 토스트가 닫힐 때 실행될 콜백 함수
      });
    }
    return { showEmailVerificationToast, showSignInSuccessToast, requireSignIn };
  },

  mounted() {
    // 회원가입 성공
    if (this.isSignedUp) {
      this.showEmailVerificationToast(() => {
        localStorage.removeItem("isSignedUp");
      });
    }

    // 로그인 성공
    if (this.isSignInSuccess) {
      this.showSignInSuccessToast(() => {
        localStorage.setItem("isSignInSuccess", "false");
      });
    }
  },

  methods: {
    goToMyList() {
      if (this.isSignedIn) {
        this.$router.push("/mylist");
      } else {
        this.requireSignIn(() => {
          this.$router.push("/signin");
        });
      }
    }
  }
}
</script>
