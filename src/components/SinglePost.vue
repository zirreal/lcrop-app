<template>
    <div class="post">
    <router-link :to="{name: 'PostDetails', params: {id: post.id}}" aria-label="go to post details page">
      <div class="post__title-block">
        <h3 class=" post__title">{{ post.title }}</h3>
      </div>
      <img class="post__img" :src=post.img alt="picture">
      <p class="post__descr"> {{ snippet }}</p>
      <div class="post__author-block">
        by <span class="post__author"> {{ post.author}}</span>
      </div>
    </router-link>
  </div>
</template>

<script>
import { computed } from '@vue/reactivity'

export default {
  props: ['post'],
  setup(props) {
    const snippet = computed(() => {
      return props.post.body.substring(0, 100) + '...'
    });

    return { snippet }
  }

}
</script>

<style lang="scss">
  .post {
    position: relative;
    padding-bottom: 10px;
    margin-bottom: 10px;
    // border-bottom: 1px dashed #5f1616;;
    cursor: pointer;
    overflow: hidden;

    &__title {
      position: relative;
      margin: 0;
      padding-left: 10px;
      font-size: 26px;
      color: #fff;
      text-align: center;

      &-block {
        content: "";
        position: absolute;
        top: 0;
        left: 50%;
        transform: rotateZ(-.8deg);
        z-index: 5;
      }

      &::before {
        content: "";
        position: absolute;
        display: block;
        top: 0;
        left: 0%;
        width: 100%;
        height: 120%;
        background-color: #5e1f1f;
        border-radius: 5px;
        transform: rotateZ(-.8deg);
        z-index: -1;
      }
    }

    &__descr {
      padding: 0;
      margin: 0;
      margin-bottom: 10px;
      font-weight: 400;
      font-size: 20px;
      line-height: 23px;
      color: #000;
    }

    &__author {
      font-weight: 700;
      &-block {
        font-size: 14px;
        line-height: 20px;
        text-align: right;
      }
    }
    &__img {
      display: block;
      height: 300px;
      width: 100%;
      margin-bottom: 20px;
      border-radius: 10px;
      filter: grayscale(100%);
      box-shadow: 1px 0 5px 0 rgb(61, 13, 13);
      transition: filter 0.33s ease-in-out, transform 0.4s ease-in-out;
    }

    &:hover {
      img {
        filter: grayscale(0%);
        transform: scale(1.08);
      }
    }
  }
</style>
