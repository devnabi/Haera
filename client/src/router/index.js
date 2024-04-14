import { createRouter, createWebHistory } from "vue-router";
import Main from '@/views/MainPage.vue';
import Error from '@/views/ErrorPage';
import Login from '@/views/LoginPage.vue';
import SignUp from '@/views/SignUpPage.vue';
import MyProfileUpdate from '@/views/MyProfileUpdatePage.vue';
import FindPassword from '@/views/FindPassword.vue';
import LeaveCheck from '@/views/LeaveCheck.vue';
import LeaveSuccess from '@/views/LeaveSuccess.vue';

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
      path: '/login',
      name: 'LoginPage',
      component: Login
    },
    {
      path: '/signup',
      name: 'SignUpPage',
      component: SignUp
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
  ]
});

export default router;
