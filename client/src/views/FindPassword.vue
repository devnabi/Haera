<template>
    <div class="d-flex vh-100 justify-content-center">

        <form>
            <fieldset>
                <div class="mt-4">
                    <h1 class="text-primary" style="font-family: 'Sofia';">Find Password</h1>
                </div>

                <div class="container mt-3">
                    <div class="row justify-content-center">
                        <figure class="text-center mt-3">
                            <blockquote class="blockquote">
                                <p class="mb-0">Please enter your email and press the 'Email Verification' button.<br>
                                    Check your email and click the link to receive a temporary password.</p>

                            </blockquote>
                        </figure>
                    </div>

                    <div class="row justify-content-center">
                        <label for="exampleInputEmail1"
                            class="col-form-label col-form-label-lg mt-4 custom-cursor-default-hover">Email
                            Address</label>
                        <div class="input-group">
                            <input type="email" v-model="email" class="form-control form-control-lg" id="exampleInputEmail1"
                                aria-describedby="emailHelp" placeholder="Haera@example.com">
                            <button @click="sendPasswordResetEmail" class="btn btn-secondary btn-sm" type="button" id="button-addon2">Request
                                Password</button>
                        </div>
                    </div>
                </div>

                <button @click="goToSignIn" type="button" class="btn btn-primary btn-lg my-5 mt-5">Go to Sign in</button>
            </fieldset>
        </form>

    </div>
</template>

<script>
import axios from 'axios';

export default {
    name: 'FindPassword',

    data() {
        return {
            email: ""
        }
    },

    methods: {
        goToSignIn() {
            this.$router.push('/signin');
        },

        async sendPasswordResetEmail() {
            try {
                const response = await axios.post("/auth/sendPasswordResetEmail", {
                    email: this.email
                });
                console.log("response", response.status);
            } catch (error) {
                console.log("error", error);
            }
        }
    }
}
</script>
