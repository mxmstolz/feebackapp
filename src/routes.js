import Projects from './components/Projects'
import addProject from './components/addProject'
import login from './components/login'

export default [
    { path: '/', component: Projects, meta: { requiresAuth: true } },
    { path: '/add', component: addProject, meta: { requiresAuth: true } },
    { path: '/login', component: login },
]