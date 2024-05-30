import { createRouter, createWebHistory } from "vue-router";
import Main from '@/views/MainPage.vue';
import Error from '@/views/ErrorPage';
import SignIn from '@/views/SignInPage';
import SignUp from '@/views/SignUpPage.vue';
import MyList from '@/views/MyList.vue';
import MyProfileUpdate from '@/views/MyProfileUpdatePage.vue';
import FindPassword from '@/views/FindPassword.vue';
import LeaveCheck from '@/views/LeaveCheck.vue';
import LeaveSuccess from '@/views/LeaveSuccess.vue';
import EmailVerificationSuccess from '@/views/EmailVerificationSuccessPage.vue';

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/',
      name: 'MainPage',
      component: Main
    },
    {
      path: '/:pathMatch(.*)*',
      name: 'ErrorPage',
      component: Error
    },
    {
      path: '/signin',
      name: 'SignInPage',
      component: SignIn
    },
    {
      path: '/signup',
      name: 'SignUpPage',
      component: SignUp
    },
    {
      path: '/mylist',
      name: 'MyList',
      component: MyList
    },
    {
      path: '/myprofileupdate',
      name: 'MyProfileUpdatePage',
      component: MyProfileUpdate
    },
    {
      path: '/findpassword',
      name: 'FindPassword',
      component: FindPassword
    },
    {
      path: '/leavecheck',
      name: 'LeaveCheck',
      component: LeaveCheck
    },
    {
      path: '/leavesuccess',
      name: 'LeaveSuccess',
      component: LeaveSuccess
    },
    {
      path: '/emailverificationsuccess',
      name: 'EmailVerificationSuccessPage',
      component: EmailVerificationSuccess
    },
  ]
});

export default router;
