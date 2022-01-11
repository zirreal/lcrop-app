<template>
   <div class="navbar">
     <div v-if="user" class="container">
        <nav class="nav">
          <router-link :to="{ name: 'Home' }" aria-label="go to home page">
            <div class="nav__logo-block">
              <img class="logo nav__logo" src="@/assets/logo.png" alt="logo">
              <h1 class="nav__title title">Lcorp</h1>
            </div>
          </router-link>
          <button @click="toggleActive" class="btn burger" :class="{active: active}">
            <span class="burger__line"></span>
            <span class="burger__line"></span>
            <span class="burger__line"></span>
          </button>
          <ul class="nav__info">
            <li class="nav__item">
              <router-link class="nav__link" :class="{'router-link-active': route.path.includes('projects')}" :to="{ name: 'Projects' }" aria-label="go to project page">Projects</router-link>
            </li>
            <li class="nav__item">
              <router-link class="nav__link" :to="{ name: 'Meetings' }"
              aria-label="go to meetings page">Meetings</router-link>
            </li>
            <li class="nav__item">
              <router-link class="nav__link" :to="{ name: 'Chat' }" aria-label="go to chat page">Chat</router-link>
            </li>
            <span class="nav__greeting" v-if="user.displayName"> {{timeValue}}, {{ user.displayName }} !</span>
            <div class="nav__picture" v-if="user.photoURL">
              <img :src=user.photoURL alt="profile picture">
            </div>
            <button class="btn btn--secondary nav__btn" @click="handleLogout">Log out</button>
          </ul>
          <div v class="menu" :class="{active: active}">
             <ul class="nav__info">
                <li class="nav__item">
                  <router-link class="nav__link" :to="{ name: 'Projects' }" aria-label="go to project page">Projects</router-link>
                </li>
                <li class="nav__item">
                  <router-link class="nav__link" :to="{ name: 'Meetings' }" aria-label="go to meetings page">Meetings</router-link>
                </li>
                <li class="nav__item">
                  <router-link class="nav__link" :to="{ name: 'Chat' }" aria-label="go to chat page">Chat</router-link>
                </li>
                <div class="nav__picture">
                  <div class="nav__greeting-block">
                    <span class="nav__greeting"> {{ user.displayName }}</span>
                    <span class="nav__greeting"> welcome to lcorp</span>
                  </div>
                  <img v-if="user.photoURL" :src=user.photoURL alt="profile picture">
                </div>
              </ul>
          </div>
        </nav>
     </div>
  </div>
</template>

<script>
import useLogout from '../composables/useLogout';
import getUser from '../composables/getUser';
import Spinner from '../components/Spinner.vue';
import { useRouter, useRoute } from 'vue-router';
import { ref } from '@vue/reactivity';

export default {
   components: {
    Spinner
  },
  setup() {
    const router = useRouter();
    const route = useRoute();

    const {logout} = useLogout();
    const { user } = getUser();

    const timeValue = ref('');
    const active = ref(false)


    // greeting works properly only with european 24hr time format
    const time = new Date().toLocaleTimeString();
    switch(time.substring(0, 2)) {
      case '00':
      case '01':
      case '02':
      case '03':
      case '04':
      case '05':
        timeValue.value = 'good night';
        break;
      case '06' :
      case '07' :
      case '08' :
      case '09' :
      case '10' :
      case '11':
        timeValue.value = 'good morning';
        break;
      case '12' :
      case '13' :
      case '14' :
      case '15' :
      case '16' :
        timeValue.value = 'good afternon';
        break;
      default :
        timeValue.value = 'good evening';
    }


    const handleLogout = async () => {
      const res = await logout();
      router.push({name: 'Login'});
    };

    const toggleActive = () => {
      active.value = !active.value;
    }

    return {
      handleLogout, user, timeValue, toggleActive, active, route
    }
  }
}
</script>

<style lang="scss" scoped>
  .navbar {
    padding: 16px 10px;
    font-family: 'Nunito', sans-serif;
    background-color: #671919;
  }

  .menu {
    position: fixed;
    width: 400px;
    height: 350px;
    right: 20px;
    top: 122px;
    border-top: 1px solid #fff;
    background-color: rgba(103, 25, 25, 1);
    border-radius: 10px;
    box-shadow: 1px 2px 5px black;
    transform: translateX(150%);
    transition: transform 0.8s ease-in-out, opacity 0.5s ease-in-out;
    opacity: 0;
    z-index: 10;


    & .nav {
      &__info {
        padding-top: 30px;
        padding-left: 40px;
        flex-direction: column;
        align-items: flex-start;
      }

      &__item {
        display: block;
        font-size: 24px;

        &:not(:last-child) {
          margin-bottom: 20px;

          &::after {
            top: 30px;
          }
        }

        & .router-link-active {
          &::after {
            top: 30px;
          }
        }
      }

      &__picture {
        margin-bottom: 30px;
        padding-bottom: 30px;
        display: flex;
        align-items: center;
        order: -1;
        border-bottom: 1px solid #fff;

        & .nav__greeting {
          display: inline;
          border: none;
          font-size: 14px;
          font-weight: 700;
          text-transform: uppercase;

          &:nth-child(2) {
            display: block;
            font-size: 14px;
            font-weight: 300;
            color: #bbb;
          }
        }
      }
    }

    &.active {
      transform:  translateX(0) translateY(-5px);
      opacity: 1;

      &:hover {
        transform: rotate(-2deg)  scale(1.025);
      }
    }
  }

  .burger {
    display:none;
    flex-direction: column;
    width: 70px;
    padding: 0;
    background-color: transparent;
    border: 1px solid transparent;
    cursor: pointer;

    &__line {
      height:7px;
      margin: 7px 0;
      background-color: #fff;
      border-radius: 10px;
      transition: .4s  cubic-bezier(0.68, -0.6, 0.32, 1.6);

      &:first-child {
        width:50%;
      }

      &:nth-child(2) {
        width:100%;
      }

      &:last-child {
        width:75%;
      }
    }

    &:focus {
      box-shadow: none;
    }

    &:focus-visible {
      background-color: #111;
    }

    &.active {

      & .burger__line {
         &:first-child {
          transform-origin: bottom;
          transform:rotatez(45deg) translate(8px,0px)
        }

        &:nth-child(2) {
          transform-origin: top;
          transform: rotatez(-45deg)
        }

        &:last-child {
          transform-origin:bottom;
          width:50%;
          transform: translate(30px,-11px) rotatez(45deg);
        }
      }
    }
  }


  .nav {
    display: flex;
    align-items: center;
    justify-content: space-between;

    .router-link-active {
      &::after {
        opacity: 0;
      }
    }

    &__title {
      position: absolute;
      overflow: hidden;
      width: 1px;
      height: 1px;
      clip: rect(0 0 0 0);
    }

    &__logo-block {
      position: relative;
      display: flex;
      align-items: center;
      flex-direction: column;
      color: #fff;

      div {
        align-self: flex-start;
        padding-left: 10px;
        font-size: 8px;
        font-weight: 700;
      }

      &:hover {
        animation: shake 0.6s cubic-bezier(.36,.07,.19,.97) both;
        transform: translate3d(0, 0, 0);
        backface-visibility: hidden;
        perspective: 1000px;
      }
    }

    &__logo {
      width: 78px;
      height: 84px;
      margin-right: 20px;
    }

    &__info {
      display: flex;
      align-items: center;
      list-style: none;
      margin: 0;
      padding: 0;
    }

    &__picture {
        margin-right: 40px;
        filter: drop-shadow(0px 4px 10px rgba(0, 0, 0, 0.5));

      & img {
        width: 76px;
        height: 76px;
        border-radius: 100%;
      }
    }

    &__item {
      position: relative;
      color: #fff;
      transition: transform 0.35s ease-in-out;
      &:not(:last-child) {
        margin-right: 25px;
      }

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
        transform: scale(1.09);
      }

      &:hover::after {
        opacity: 1;
        width: 100%;
      }

      & .router-link-active {
        &::after {
          content: '';
          position: absolute;
          top: 20px;
          left: 0;
          width: 100%;
          height: 2px;
          opacity: 1;
          box-shadow: -5px 2px 20px 1px rgb(228, 228, 228);
          background-color: rgb(247, 247, 247);
        }
      }

    }

    &__greeting {
      display: inline-block;
      margin-left: 16px;
      margin-right: 40px;
      padding-left: 16px;
      font-size: 14px;
      color: #fff;
      border-left: 1px solid #eee;
    }

    &__btn {
      padding: 10px 20px;
      font-family: 'Nunito', sans-serif;
      font-weight: 500;
      font-size: 14px;
      line-height: 16px;
      text-transform: lowercase;

      &:focus {
        box-shadow: 2px 0 10px 5px rgb(192, 65, 65);
      }
    }
  }

  // media rules for navbar

  @media (max-width: 845px) {
    .nav {
      &__picture {
        display: none;
      }
    }
  }

  @media (max-width: 720px) {
    .burger {
      display: flex;
    }
    .nav {
      &__item ,
      &__greeting{
        display: none;
      }
    }
  }

  @media (max-width: 485px) {
    .menu {
      width: 300px;

      & .nav__greeting {
        margin: 0;
      }
    }
  }



</style>
