<template>
  <div class="page404-layout">
    <img class="page404__logo" src="@/assets/logo.png" alt="logo">
    <span class="page404__text">The page you were looking for is not here...</span>
    <router-link class="page404__link" :to="{ name: 'Home' }" aria-label="go to home page">return to the main page</router-link>
  </div>
</template>

<script>
import { useMeta } from 'vue-meta'

export default {
  setup() {

    useMeta({
      title: 'Page not found',
      description : 'This page does not exist'
    })

  }
}
</script>

<style lang="scss">
  .page404 {
    &-layout {
      height: 100vh;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      font-family: 'Nunito', sans-serif;
      background-color: #671919;

    }

    &__logo {
      width: 200px;
      height: 220px;
      margin-bottom: 40px;
      animation: moving 6s cubic-bezier(.36,.07,.19,.97) both infinite;
    }

    &__text {
      margin-bottom: 10px;
      padding: 10px;
      font-size: 20px;
      font-weight: 700;
      color: #111;
      background-color: #fff;
      box-shadow: 1px 2px 4px black;
      text-transform: uppercase;
    }

    &__link {
      font-weight: 700;
      color: #bbb;
      transition: color 0.3s ease-in-out;

      &:hover {
        color: #fff;
      }
    }
  }
</style>
