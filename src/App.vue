<template>
  <metainfo>
    <template v-slot:title="{ content }">{{ content ? `${content} | LCORP` : `LCORP` }}</template>
  </metainfo>
  <Navbar/>
  <router-view/>
</template>

<script>
import { useMeta } from 'vue-meta'

import Navbar from '@/components/Navbar.vue'
export default {
  name: 'App',
  components: {
    Navbar
  },
  setup() {
      useMeta({
        title: '',
        htmlAttrs: { lang: 'en', amp: true }

    })
  }
}
</script>

<style lang="scss">
</style>
