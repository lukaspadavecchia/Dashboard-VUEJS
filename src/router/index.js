import { createRouter, createWebHistory } from 'vue-router'
import UserDashboard from '../views/UserDashboard.vue'
import UserForm from '../views/UserForm.vue'

const routes = [
  {
    path: '/',
    name: 'dashboard',
    component: UserDashboard
  },
  {
    path: '/users/new',
    name: 'user-create',
    component: UserForm
  },
  {
    path: '/users/:id',
    name: 'user-edit',
    component: UserForm
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router