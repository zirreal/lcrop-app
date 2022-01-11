<template>
  <div class="login-wrapper">
    <div class="container container-center container__login">
      <div class="logo-wrapper">
        <img src="../../assets/logo.png" alt="logo" class="logo logo--big">
      </div>
      <form class="form form--login" @submit.prevent="handleSubmit">
        <input class="input input--login" name="email" type="email" placeholder="email" v-model="email">
        <input class="input input--login" type="password" name="password" placeholder="password" v-model="password">
        <div v-if="error" class="error-validation"> {{ error }}</div>
        <button class="btn btn--secondary" v-if="!isPending" type="submit" aria-label="log in to your account">Log in</button>
        <button class="btn btn--secondary" v-if="isPending" disabled type="submit" aria-label="logging in to your account">Loading</button>
      </form>
      <span class="login__signup">If you don't have an account <router-link class="signup-link" :to="{name: 'Signup'}" aria-label="go to sign up page">sign up</router-link></span>
    </div>
  </div>
</template>

<script>
import useLogin from '@/composables/useLogin';
import { ref } from '@vue/reactivity';
import { useRouter } from 'vue-router';

import {useMeta} from 'vue-meta';

export default {
  setup() {
    const { error, login, isPending } = useLogin();
    const router = useRouter();

    const email = ref('');
    const password = ref('');

    useMeta({
      title: 'Login Page',
      description: 'Login to your lcorp account here',
    })

    const handleSubmit = async () => {
      const res = await login(email.value, password.value);

      if(!error.value) {
        router.push({name: 'Home'});
      }
    }

    return {email, password, handleSubmit, error, isPending}

  }
}
</script>

<style lang="scss">
  .container__login {
    height: 100vh;

    .login__signup {
      color: #fff;
    }

    & a {
      display: inline-block;
      font-weight: 700;
      position: relative;
      color: #ebebeb;
      transition: color 0.33s ease-in-out, transform 0.33s ease-in-out;

      &::after {
        content: '';
        position: absolute;
        top: 20px;
        left: 0;
        width: 0%;
        height: 2px;
        opacity: 0;
        background-color: #fff;
        transition: opacity 0.33s ease-in-out, width 0.33s ease-in-out, transform 0.33s ease-in-out;
      }

      &:hover {
        transform: scale(1.09) translateX(8px);
      }

      &:hover::after {
        opacity: 1;
        width: 100%;
      }

      &:active {
        color: #c7c1c1;
      }
    }
  }

</style>
