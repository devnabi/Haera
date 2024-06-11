<template>
    <div class="d-flex vh-100 justify-content-center">

        <form>
            <fieldset>
                <div class="mt-4">
                    <h1 class="text-primary" style="font-family: 'Sofia';">My Profile</h1>
                </div>

                <div class="container mt-3">

                    <div class="row justify-content-center">
                        <label for="exampleInputEmail1"
                            class="col-form-label col-form-label-lg mt-4 custom-cursor-default-hover">Email
                            Address</label>
                        <div class="input-group">
                            <input type="email" v-model="userData.email" class="form-control form-control-lg"
                                id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Haera@example.com"
                                readonly>
                        </div>
                    </div>

                    <!-- 비밀번호 변경하는 페이지 이동 or 여기서 현재 비번과 변경할 비번을 입력하도록 하기? -->
                    <div class="row justify-content-center">
                        <label for="exampleInputPassword1" class="col-form-label col-form-label-lg mt-4">Current
                            Password</label>
                        <div class="input-group">
                            <input type="password" v-model="password" class="form-control form-control-lg"
                                id="exampleInputPassword1" placeholder="Current Password" autocomplete="off">
                        </div>
                    </div>

                    <div class="row justify-content-center">
                        <label for="exampleInputPassword1" class="col-form-label col-form-label-lg mt-4">New
                            Password</label>
                        <div class="input-group">
                            <input type="password" v-model="newPassword" class="form-control form-control-lg"
                                id="exampleInputPassword1" placeholder="New Password" autocomplete="off">
                        </div>
                    </div>

                    <div class="row justify-content-center">
                        <label for="exampleInputPassword1" class="col-form-label col-form-label-lg mt-4">Confirm
                            Password</label>
                        <div class="input-group">
                            <input type="password" v-model="confirmPassword" class="form-control form-control-lg"
                                id="exampleInputPassword1" placeholder="Confirm Password" autocomplete="off">
                        </div>
                    </div>

                    <div class="row justify-content-center">
                        <label for="nick name" class="col-form-label col-form-label-lg mt-4">Nick Name</label>
                        <div class="input-group">
                            <input type="text" v-model="userData.nickName" class="form-control form-control-lg"
                                placeholder="Nick Name" aria-label="Recipient's username" aria-describedby="button-addon2">
                            <button class="btn btn-secondary btn-sm" @click="checkNickNameAvailability" type="button"
                                id="button-addon2">Check
                                Availability</button>
                        </div>
                    </div>

                    <div class="row justify-content-center">
                        <div class="text-end mt-2">
                            <button @click="goToLeaveCheck" type="button" class="btn btn-link text-danger">Leave</button>
                        </div>
                    </div>

                    <button type="submit" @click.prevent="updateProfile"
                        class="btn btn-primary btn-lg btn-block my-5">Save</button>
                    <button type="submit" @click="cancel"
                        class="btn btn-outline-secondary btn-lg btn-block mx-2 my-5">Cancel</button>

                </div>
            </fieldset>
        </form>

    </div>
</template>

<script>
import axios from 'axios';
import { toast } from "vue3-toastify";
import "vue3-toastify/dist/index.css";

export default {
    name: 'MyProfileUpdate',

    data() {
        return {
            password: "",
            newPassword: "",
            confirmPassword: "",
            nickName: "",
            userData: {},
            isNickNameChecked: true,
            errorMessage: ""
        }
    },

    setup() {
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

        const updateSuccessToast = () => {
            toast("업데이트 성공!", {
                autoClose: 1000,
                position: "top-center",
                theme: "dark",
                type: "success",
                transition: "bounce",
                closeOnClick: true,
            })
        }
        return { requireSignIn, updateSuccessToast };
    },

    async mounted() {
        // 로그인 할 때 로컬스토리지 저장한 토큰 추출
        const token = localStorage.getItem("accessToken");
        if (!token) {
            this.requireSignIn(() => {
                this.$router.push("/signin");
            });
            return;
        }

        try {
            const response = await axios.get(`/auth/getValidateUser/${token}`);
            this.userData = response.data;
        } catch (error) {
            console.log("error", error);
            this.requireSignIn(() => {
                this.$router.push("/signin");
            });
        }
    },

    methods: {
        async checkNickNameAvailability() {
            try {
                const response = await axios.get("/auth/nickNameExists", {
                    params: {
                        nickName: this.userData.nickName
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

        async updateProfile() {
            const { id } = this.userData;

            const authUpdateDto = {
                email: this.userData.email,
                password: this.password,
                newPassword: this.newPassword,
                confirmPassword: this.confirmPassword,
                nickName: this.userData.nickName
            }
            try {
                const response = await axios.patch(`/auth/update/${id}`, authUpdateDto);
                this.updateSuccessToast();
                console.log("response", response);
            } catch (error) {
                this.errorMessage = error.response.data.message;
                console.log("errorMessage: ", this.errorMessage);
                console.log("error", error);
            }

        },

        goToLeaveCheck() {
            this.$router.push("/leavecheck");
        },

        cancel() {
            this.$router.push("/");
        }
    }
}
</script>
