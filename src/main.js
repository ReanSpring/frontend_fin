import './assets/main.css'

import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import { library } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { fas } from '@fortawesome/free-solid-svg-icons'

// Add all icons to the library
library.add(fas)

const app = createApp(App)

// Register the FontAwesomeIcon component globally
app.component('font-awesome-icon', FontAwesomeIcon)

app.use(router)

app.mount('#app')