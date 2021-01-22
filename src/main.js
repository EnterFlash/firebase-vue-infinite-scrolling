import Vue from 'vue'
import App from './App.vue'
import firebase from 'firebase/app'

Vue.config.productionTip = false

const firebaseConfig = {
  // YOUR FIREBASE CONFIG HERE, maybe use .env as well
};

firebase.initializeApp(firebaseConfig)

new Vue({
  render: h => h(App),
}).$mount('#app')
