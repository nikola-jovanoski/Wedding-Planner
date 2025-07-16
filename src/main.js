// src/main.js
import { createApp } from 'vue'
import App from './App.vue'
import router from './router'

// Font Awesome setup
import { library } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

import {
    faGlassCheers,
    faCarSide,
    faUtensils,
    faChurch,
    faRing,
    faMusic,        // use a music note or dancing icon
    faChampagneGlasses,
    faDrumSteelpan // if available in your version, else use faGlassCheers twice
} from '@fortawesome/free-solid-svg-icons'

library.add(
    faGlassCheers,
    faCarSide,
    faUtensils,
    faChurch,
    faRing,
    faMusic,
    faChampagneGlasses,
    faDrumSteelpan
)

const app = createApp(App)
app.component('font-awesome-icon', FontAwesomeIcon)
app.use(router)
app.mount('#app')
