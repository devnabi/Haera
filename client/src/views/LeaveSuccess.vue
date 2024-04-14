<template>
    <div class="container mt-4">
        <h1 class="text-primary" style="font-family: 'Sofia';">Leave Success</h1>
        <div class="d-flex justify-content-center align-items-center mt-5">
            <div class="card col-md-4 bg-white shadow-md px-5 py-5 mb-5">
                <div class="mb-4 text-center">
                    <svg xmlns="http://www.w3.org/2000/svg" class="text-success bi bi-check-circle" width="100" height="100"
                        fill="currentColor" viewBox="0 0 16 16">
                        <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z" />
                        <path
                            d="M10.97 4.97a.235.235 0 0 0-.02.022L7.477 9.417 5.384 7.323a.75.75 0 0 0-1.06 1.06L6.97 11.03a.75.75 0 0 0 1.079-.02l3.992-4.99a.75.75 0 0 0-1.071-1.05z" />
                    </svg>
                </div>
                <div class="text-center">
                    <h1>Success!</h1>
                    <p>Thank you for using 'Haera' all this time.</p>
                    <p class="text-danger">When you delete your account, all of your information will be permanently
                        removed.<br>
                        If you log in within 7 days, you can cancel the deletion process.</p>
                    <button @click="goToMain" class="btn btn-outline-success">Back Home</button>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: 'LeaveSuccess',
    methods: {
        goToMain() {
            this.$router.push('/');
        }
    }
}
</script>
