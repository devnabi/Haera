<template>
    <div class="d-flex vh-100 justify-content-center">

        <form>
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
                                <input type="password" class="form-control form-control-lg" id="exampleInputPassword1"
                                    placeholder="Password" autocomplete="off">
                            </div>
                        </div>
                    </div>
                </div>

                <button @click="confirmLeave" type="button" class="btn btn-secondary btn-lg my-5 mt-5">Leave</button>
                <button type="button" class="btn btn-outline-primary btn-lg mx-2 my-5 mt-5">Cancel</button>
            </fieldset>
        </form>

    </div>
</template>

<script>
export default {
    name: 'LeaveCheck',
    methods: {
        // 비밀번호가 틀렸거나, 입력하지 않은 채로 버튼을 누르면 비밀번호를 확인하라는 빨간 문구 띄어주기
        confirmLeave() {
            if (confirm("Are you sure you want to leave 'Haera'?")) {
                this.$router.push('/leavesuccess');
            }
        }
    }
}
</script>
