<template>
  <div class="container">
    <div v-if="error"> {{ error }} </div>
    <div v-if="post" class="post-inside">
      <h3 class="post-inside__title"> {{post.title}} </h3>
      <div class="post-inside__author-block">
        by <span class="post__author"> {{ post.author}}</span>
      </div>
      <p class="post-inside__descr"> {{post.body}} </p>
      <img class="post-inside__img" :src=post.img alt="picture">
      <p class="post-inside__descr"> {{post.bodyAdd}} </p>
    </div>
    <div v-else class="spinner">
      <Spinner />
    </div>
    <button @click="$router.go(-1)" class="btn btn__post-back" aria-label="go back to home page">
      Back to News
    </button>
  </div>
</template>

<script>
import getDocument from '../composables/getDocument';
import Spinner from '../components/Spinner.vue'
import { useRoute } from 'vue-router';

import {useMeta} from 'vue-meta';

export default {
  components: { Spinner },

  setup() {
    const route = useRoute();

    const {error, document: post} = getDocument('posts', route.params.id);

     useMeta({
      title: 'Post Details',
      description: 'page for lcorp article details ',
    })

    return {
      post, error
    }
  }
}
</script>

<style lang="scss">

  .post-inside {
    &__title {
      margin: 0;
      margin-top: 68px;
      margin-bottom: 10px;
      font-size: 40px;
      text-transform: uppercase;
      text-align: center;

    }
    &__descr {
      padding: 0;
      margin: 0;
      margin-bottom: 20px;
      color: #444;
      line-height: 1.5em;
      white-space: pre-wrap;
    }

    &__author {
      &-block {
        text-align: right;
        padding-bottom: 20px;
        margin-bottom: 20px;
        border-bottom: 3px dashed #671919;
      }
    }

    &__img {
      width: 100%;
      height: 100%;
      max-height: 500px;
      margin-bottom: 25px;
      filter: contrast(90%) brightness(115%);
      box-shadow: -1px 0 5px 0 rgb(12, 12, 12);
    }
  }

  .btn__post-back {
    margin-bottom: 20px;
  }



</style>
