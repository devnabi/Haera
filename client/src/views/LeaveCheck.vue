<template>
    <div class="d-flex vh-100 justify-content-center">

        <form @submit.prevent="confirmLeave">
            <fieldset>
                <div class="mt-4">
                    <h1 class="text-primary" style="font-family: 'Sofia';">Leave Check</h1>
                </div>

                <div class="container mt-3">
                    <div class="row justify-content-center">
                        <figure class="text-center mt-3">
                            <blockquote class="blockquote">
                                <p class="mb-0">If you enter your password, the withdrawal process will proceed.</p>

                            </blockquote>
                        </figure>

                        <div class="row justify-content-center">
                            <div class="col-6">
                                <label for="exampleInputPassword1"
                                    class="col-form-label col-form-label-lg mt-4">Password</label>
                                <input type="password" v-model="password" class="form-control form-control-lg"
                                    id="exampleInputPassword1" placeholder="Password" autocomplete="off">
                            </div>
                        </div>
                    </div>
                </div>

                <button type="button" @click="confirmLeave" class="btn btn-secondary btn-lg my-5 mt-5">Leave</button>
                <button type="button" @click="cancel" class="btn btn-outline-primary btn-lg mx-2 my-5 mt-5">Cancel</button>
            </fieldset>
        </form>

    </div>
</template>

<script>
import axios from 'axios';

export default {
    name: 'LeaveCheck',

    data() {
        return {
            password: "",
            token: ""
        }
    },

    mounted() {
        this.token = localStorage.getItem("accessToken");
    },

    methods: {
        confirmLeave() {
            const confirmation = confirm("Are you sure you want to leave 'Haera'?")
            if (confirmation && this.password) {
                this.leaveRequest();
            } else {
                console.log("취소되었습니다.");
            }
        },

        cancel() {
            this.$router.push("/");
        },

        // 비밀번호가 틀렸거나, 입력하지 않은 채로 버튼을 누르면 비밀번호를 확인하라는 빨간 문구 띄어주기
        async leaveRequest() {
            try {
                const getResponse = await axios.get(`/auth/getValidateUser/${this.token}`);
                const userData = getResponse.data;
                const deleteResponse = await axios.delete(`/auth/delete/${userData.id}`, {
                    data: {
                        password: this.password
                    }
                });
                console.log("deleteResponse: ", deleteResponse);
                this.signOut();
                this.$router.push("/leavesuccess");
            } catch (error) {
                console.log("error", error);
            }
        },

        async signOut() {
            localStorage.removeItem("accessToken");
            localStorage.removeItem("isSignedIn");
            await new Promise((resolve) => {
                setTimeout(resolve, 1000);
            })
            window.location.reload();
        },
    }
}
</script>
