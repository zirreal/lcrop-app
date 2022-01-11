import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import { createMetaManager} from 'vue-meta'
import { projectAuth } from './firebase/config';
import Maska from 'maska';

import '../src/assets/main.scss';

let app;
const metaManager = createMetaManager()

projectAuth.onAuthStateChanged(() => {
  if(!app) {
    app = createApp(App)
      .use(router)
      .use(metaManager)
      .use(Maska)
      .mount('#app')
  }
});
