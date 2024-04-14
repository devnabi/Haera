<template>
    <form>
        <fieldset>

            <div class="mt-4">
                <h1 class="text-primary" style="font-family: 'Sofia'">My Profile</h1>
            </div>
            <div class="container mt-3">

                <div class="row justify-content-center">
                    <div class="col-4">
                        <label for="exampleInputEmail1" class="form-label mt-4 custom-cursor-default-hover">Email
                            Address</label>
                        <div class="input-group">
                            <input type="email" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp"
                                placeholder="Haera@example.com">
                            <button class="btn btn-secondary btn-sm" type="button" id="button-addon2">Email
                                Verification</button>
                        </div>
                    </div>
                </div>

                <div class="row justify-content-center">
                    <div class="col-4">
                        <label for="exampleInputPassword1" class="form-label mt-4">Password</label>
                        <input type="password" class="form-control" id="exampleInputPassword1" placeholder="Password"
                            autocomplete="off">
                    </div>
                </div>

                <div class="row justify-content-center">
                    <div class="col-4">
                        <label for="exampleInputPassword1" class="form-label mt-4">Check Password</label>
                        <input type="password" class="form-control" id="exampleInputPassword1" placeholder="Check Password"
                            autocomplete="off">
                    </div>
                </div>

                <div class="row justify-content-center">
                    <div class="col-4">
                        <label for="nick name" class="form-label mt-4">Nick Name</label>
                        <div class="input-group">
                            <input type="text" class="form-control" placeholder="Nick Name"
                                aria-label="Recipient's username" aria-describedby="button-addon2">
                            <button class="btn btn-secondary btn-sm" type="button" id="button-addon2">Check
                                Availability</button>
                        </div>
                    </div>
                </div>

                <div class="row justify-content-center">
                    <div class="col-4">
                        <div class="text-end mt-2">
                            <button @click="goToLeaveCheck" type="button" class="btn btn-link text-danger">Leave</button>
                        </div>
                    </div>
                </div>

                <button type="submit" class="btn btn-primary btn-lg btn-block my-5">Save</button>
                <button type="submit" class="btn btn-outline-secondary btn-lg btn-block mx-2 my-5">Cancel</button>

            </div>

        </fieldset>
    </form>
</template>

<script>
export default {
    name: 'MyProfileUpdate',

    methods: {
        goToLeaveCheck() {
            this.$router.push('/leavecheck');
        }
    }
}
</script>
