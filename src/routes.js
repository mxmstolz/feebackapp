import Projects from './components/Projects'
import addProject from './components/addProject'
import login from './components/login'
import Feedback from './components/Feedback'
import editGroup from './components/editGroup'

export default [
    { path: '/', component: Projects, meta: { requiresAuth: true } },
    { path: '/add', component: addProject, meta: { requiresAuth: true } },
    { path: '/login', component: login },
    { path: '/addFeedback/:id', component: Feedback },
    { path: '/edit/:id', name: 'edit', component: editGroup }
]