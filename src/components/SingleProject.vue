<template>
 <div class="project-left">
    <div class="project__img-block">
      <img class="project__img" :src=project.coverUrl alt="picture">
    </div>
    <div class="project__info">
      <h3 class=" project__title"> Project {{ project.title }}</h3>
      <p class="project__descr"> {{snippet}} </p>
      <router-link :to="{name: 'ProjectInfo', params: {id: project.id}}" class="btn project__btn" aria-label="go to project details page">View Project</router-link>
    </div>
  </div>
  <div class="project-right">
    <img class="logo project__logo" src="@/assets/logo.png" alt="logo">
  </div>
</template>

<script>
import { computed } from '@vue/reactivity'

export default {
  props: ['project'],
  setup(props) {

      const snippet = computed(() => {
      return props.project.description.substring(0, 300) + '...'
    });

    return { snippet }

  }

}
</script>

<style lang="scss">
  .project {
    &-left {
      padding: 58px 0 58px 38px;
      display: flex;
      justify-content: space-between;
      align-items: center;
    }

    &__img-block {
      min-height: 226px;
      width: 100%;
      margin-right: 48px;
      display: flex;
      align-items: center;
      justify-content: center;

      img {
        height: 175px;
        border-radius: 10px;
        filter: contrast(90%) brightness(115%);

      }
    }

    &__info {
      max-width: 500px;
    }

    &__title {
      margin: 0;
      font-weight: 700;
      font-size: 40px;
      line-height: 56px;
      text-transform: uppercase;
      color: #fff;
    }

    &__descr {
      padding: 0;
      margin: 0;
      margin-bottom: 30px;
      font-weight: 400;
      font-size: 15px;
      line-height: 18px;
      color: #fff;
    }

    &-right {
      width: 260px;
      height: 100%;
      margin: 0 auto;
      display: flex;
      align-items: center;
      justify-content: center;
      background-color: #671919;
      img {
        width: 90px;
        height: 96px;
      }
    }
  }

   @media (max-width: 1200px) {
    .project {
      &__img-block {
        display: none;
      }
    }
  }

  @media (max-width: 640px) {
    .project {
      &-right {
        width: 100%;
        padding: 10px 0;
        grid-row: 1
      }

      &-left {
        padding: 0 20px;
      }
    }

  }
</style>
