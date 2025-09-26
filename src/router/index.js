import { createRouter, createWebHistory } from 'vue-router'
import PokanaZaLov from '../views/PokanaZaLov.vue'
import Invitation from '../views/Invitation.vue'

const routes = [
    {
        path: '/pokana',
        name: 'Pokana',
        component: PokanaZaLov,
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
        redirect: '/pokana'
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
