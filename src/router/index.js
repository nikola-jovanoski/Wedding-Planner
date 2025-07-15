import { createRouter, createWebHistory } from 'vue-router'
import FindYourSeat from '../views/FindYourSeat.vue'
import Invitation from '../views/Invitation.vue'

const routes = [
    {
        path: '/findyourseat',
        name: 'FindYourSeat',
        component: FindYourSeat
    },
    {
        path: '/weddinginvitation',
        name: 'WeddingInvitation',
        component: Invitation
    },
    {
        path: '/:catchAll(.*)',
        redirect: '/findyourseat'
    }
]

export default createRouter({
    history: createWebHistory(),
    routes
})
