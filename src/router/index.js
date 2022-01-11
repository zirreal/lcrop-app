import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'
import SignUp from '../views/auth/SignUp.vue';
import Login from '../views/auth/Login.vue';
import PostDetails from '../views/PostDetails.vue';
import Projects from '../views/Projects.vue';
import Meetings from '../views/Meetings.vue';
import Chat from '../views/Chat.vue';
import ProjectInfo from '../views/ProjectInfo.vue';
import CreateProject from '../views/CreateProject.vue';
import AddNewMeeting from '../views/AddNewMeeting.vue';
import EditMeeting from '../views/EditMeeting.vue';
import Page404 from '../views/Page404.vue';

// route guard
import { projectAuth } from '../firebase/config';

const requireAuth = (to, from, next) => {
  let user = projectAuth.currentUser;
  if(!user) {
    next({ name: 'Login'});
  } else {
    next();
  }
};

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
    beforeEnter: requireAuth
  },
  {
    path: '/signup',
    name: 'Signup',
    component: SignUp
  },
  {
    path: '/login',
    name: 'Login',
    component: Login
  },

  {
    path: '/posts/:id',
    name: 'PostDetails',
    component: PostDetails, 
    beforeEnter: requireAuth,
    props: true
  },

  {
    path: '/projects/',
    name: 'Projects',
    component: Projects, 
    beforeEnter: requireAuth,
  },

  {
    path: '/meetings/',
    name: 'Meetings',
    component: Meetings, 
    beforeEnter: requireAuth,
  },

  {
    path: '/chat/',
    name: 'Chat',
    component: Chat, 
    beforeEnter: requireAuth,
  },

  {
    path: '/meetings-add/',
    name: 'AddNewMeeting',
    component: AddNewMeeting, 
    beforeEnter: requireAuth,
  },

  {
    path: '/meetings-edit/:id',
    name: 'EditMeeting',
    component: EditMeeting, 
    beforeEnter: requireAuth,
    props: true
  },

  {
    path: '/create-project/',
    name: 'CreateProject',
    component: CreateProject, 
    beforeEnter: requireAuth,
  },

  {
    path: '/projects/:id',
    name: 'ProjectInfo',
    component: ProjectInfo, 
    beforeEnter: requireAuth,
    props: true
  },

  { 
    path: '/:pathMatch(.*)*', 
    name: 'Page404', 
    component: Page404,
},
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
