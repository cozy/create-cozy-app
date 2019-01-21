<template>
  <div class="app-wrapper o-layout-2panes">
    <aside class="o-sidebar">
      <nav>
        <ul class="c-nav">
          <li class="c-nav-item">
            <router-link class="c-nav-link" to="/viewhello1">
              <Icon :icon="navIcon" class="c-nav-icon" />
              {{ t('Nav.hello_nav_1') }}
            </router-link>
          </li>
          <li class="c-nav-item">
            <router-link class="c-nav-link" to="/viewhello2">
              <Icon :icon="navIcon" class="c-nav-icon" />
              {{ t('Nav.hello_nav_2') }}
            </router-link>
          </li>
          <li class="c-nav-item">
            <router-link class="c-nav-link" to="/viewhello3">
              <Icon :icon="navIcon" class="c-nav-icon" />
              {{ t('Nav.hello_nav_3') }}
            </router-link>
          </li>
        </ul>
      </nav>
    </aside>
    <main>
      <div class="app-content"><router-view class="view" /></div>
    </main>
  </div>
</template>

<script>
import Vue from 'vue'
import VueRouter from 'vue-router'
import navIcon from '../assets/icons/icon-bullet-point.svg'

import Icon from './Icon'

import Hello1 from './HelloViews/Hello1.vue'
import Hello2 from './HelloViews/Hello2.vue'
import Hello3 from './HelloViews/Hello3.vue'

// This installs <router-view> and <router-link>,
// and injects $router and $route to all router-enabled child components
Vue.use(VueRouter)

const router = new VueRouter({
  mode: 'hash',
  base: '/',
  linkActiveClass: 'is-active',
  routes: [
    { path: '/viewhello1', component: Hello1 },
    { path: '/viewhello2', component: Hello2 },
    { path: '/viewhello3', component: Hello3 },
    { path: '/', redirect: '/viewhello1' },
    // default, always at the end
    { path: '*', redirect: '/viewhello1' }
  ]
})

export default {
  router,
  components: { Icon },
  data() {
    return {
      navIcon
    }
  }
}
</script>
