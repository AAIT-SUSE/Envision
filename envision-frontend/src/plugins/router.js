import Vue from 'vue'
import VueRouter from 'vue-router'
//import Questions from "../views/Questions";

Vue.use(VueRouter);

const group = () => import('@/views/Group');
const groupGeneralInfo = () => import('@/components/GroupGeneralInfo');
const groupMemberList = () => import('@/components/GroupMemberList');
const newArticle =() => import('@/views/NewArticle');
const newPost = () => import('@/views/NewPost');
const newQuestion = () => import('@/views/NewQuestion');
const question = () => import('@/views/Question');
const questions = () => import('@/views/Questions');
const assignment = () => import('@/components/Assignment');
const school = () => import('@/components/School');
const addlist = () => import('@/components/Addlist');
const registration = () => import('@/components/Registration');

const routes = [
  {
    path: '/group',
    component: group,
    children: [
      {
        path: 'general',
        component: groupGeneralInfo
      },
      {
        path: 'members',
        component: groupMemberList
      },
    ]
  },
  {
    path: '/group/general',
    component: questions
  },
  {
    path: '/articles/new',
    component: newArticle
  },
  {
    path: '/posts/new',
    component: newPost
  },
  {
    path: '/questions/new',
    component: newQuestion
  },
  {
    path: '/questions',
    name: 'questions',
    component: questions
  },
  {
    path: '/question/:id',
    name: 'questionDetail',
    component: question
  },
  {
    path: '/allequipment/new',
    component: assignment
  },
  {
    path: '/todolist/new',
    component: school 
  },
  {
    path: '/texteditor/new',
    component: addlist 
  },
  {
    path: '/borrowed/new',
    component: registration
  }
];

const router = new VueRouter({
  routes: routes
});

export default router;