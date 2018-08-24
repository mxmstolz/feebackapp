import Projects from './components/Projects'
import addProject from './components/addProject'
import login from './components/login'
import Feedback from './components/Feedback'
import editGroup from './components/editGroup'
import register from './components/register'
import Statistic from './components/Statistic'

export default [
    { path: '/', component: Projects, name: 'projects', meta: { requiresAuth: true } },
    { path: '/add', component: addProject, name: 'addProject', meta: { requiresAuth: true } },
    { path: '/login', component: login, name: 'login', meta: { requiresVisitor: true } },
    { path: '/register', component: register, name: 'register', meta: { requiresVisitor: true } },
    { path: '/addFeedback/:id', component: Feedback, name: 'feedback', meta: { requiresAuth: true } },
    { path: '/edit/:id', name: 'edit', component: editGroup, meta: { requiresAuth: true } },
    { path: '/statistic/:id', component: Statistic, name: 'statistic', meta: { requiresAuth: true } },

    { path: '*', redirect: '/' }
]