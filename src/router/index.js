import { createRouter, createWebHistory } from 'vue-router'
import FindYourSeat from '../views/FindYourSeat.vue'
import Invitation from '../views/Invitation.vue'

const routes = [
    {
        path: '/findyourseat',
        name: 'FindYourSeat',
        component: FindYourSeat,
        meta: { title: 'Пронајди маса' }
    },
    {
        path: '/weddinginvitation',
        name: 'WeddingInvitation',
        component: Invitation,
        meta: { title: 'Покана Anja & Nikola' }
    },
    {
        path: '/:catchAll(.*)',
        redirect: '/findyourseat'
    }
]

const router = createRouter({
    history: createWebHistory(),
    routes
})

// set <title> on every route change
router.afterEach((to) => {
    document.title = to.meta.title || 'Default Title'
})

export default router
