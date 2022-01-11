<template>
<div>
</div>
  <div class="home container">
    <Header />
    <div v-if="error">{{ error }}</div>
    <div v-if="posts.length" class="layout">
      <PostList :posts="posts" />
    </div>
    <div v-else class="spinner">
      <Spinner />
    </div>
  </div> 
</template>

<script>
import Header from '../components/Header.vue';
import PostList from '../components/PostList.vue';
import getPosts from '../composables/getPosts';
import Spinner from '../components/Spinner.vue';

import { useMeta } from 'vue-meta'

export default {
  name: 'Home',
  components: {
    Header,PostList, Spinner
  },
  setup() {
    const { error, posts, load } = getPosts('posts'); 

    useMeta({
      title: 'Welcome to LCORP',
      description : 'Lcorp home page with the latest news about company'
    })

    load();
    return {
      posts, error, load
    }
  }
}
</script>

<style>
  .layout {
    overflow: hidden;
  }
</style>