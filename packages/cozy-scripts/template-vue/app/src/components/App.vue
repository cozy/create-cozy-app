<template>
  <div class='app-wrapper coz-sticky'>
    <aside class='coz-sidebar'>
      <nav>
        <ul class='c-nav'>
          <li class='c-nav-item'>
            <router-link class='c-nav-link' to='/viewhello1'>
              <icon class='nav-icon' v-bind:icon='navIcon' />
              {{ t('Nav.hello_nav_1') }}
            </router-link>
          </li>
          <li class='c-nav-item'>
            <router-link class='c-nav-link' to='/viewhello2'>
              <icon class='nav-icon' v-bind:icon='navIcon' />
              {{ t('Nav.hello_nav_2') }}
            </router-link>
          </li>
          <li class='c-nav-item'>
            <router-link class='c-nav-link' to='/viewhello3'>
              <icon class='nav-icon' v-bind:icon='navIcon' />
              {{ t('Nav.hello_nav_3') }}
            </router-link>
          </li>
        </ul>
      </nav>
    </aside>
    <main class='app-content'>
      <router-view class="view"></router-view>
    </main>
  </div>
</template>

<script>
import Vue from 'vue'
import VueRouter from 'vue-router'
import navIcon from '../assets/icons/icon-bullet-point.svg'

import icon from './Icon'

import Hello1 from './HelloViews/Hello1.vue'
import Hello2 from './HelloViews/Hello2.vue'
import Hello3 from './HelloViews/Hello3.vue'

// This installs <router-view> and <router-link>,
// and injects $router and $route to all router-enabled child components
Vue.use(VueRouter)

const router = new VueRouter({
  mode: 'hash',
  base: '/',
  linkActiveClass: 'active',
  routes: [
    { path: '/', redirect: '/viewhello1'},
    { path: '/viewhello1', component: Hello1 },
    { path: '/viewhello2', component: Hello2 },
    { path: '/viewhello3', component: Hello3 }
  ]
})

export default {
  router,
  components: { icon },
  data () {
    return {
      navIcon
    }
  },
}
</script>
