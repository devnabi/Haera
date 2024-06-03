<template>
    <div class="d-flex align-items-center justify-content-center vh-100 mb-5 pb-5">
        <div class="text-center mb-5 pb-5">
            <h1 class="display-1 fw-bold text-secondary">Create</h1>
            <p class="fs-3">
                <span class="text-info">임시 비밀번호가 생성되었습니다!</span><br>
                이메일을 확인해주세요.
            </p>
        </div>
    </div>
</template>

<script>
import axios from 'axios';

export default {
    name: "TemporaryPasswordCreated",

    async created() {
        const email = this.$route.query.email;
        try {
            const response = await axios.post("/auth/generateAndSaveHashedPassword", null, {
                params: {
                    email: email
                }
            });
            console.log("response", response.data);
        } catch (error) {
            console.log("error", error);
        }
    },
}
</script>