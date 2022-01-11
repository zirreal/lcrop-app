<template>
  <li v-if="ownership" class="meetings__item" :class="{'meetings__complete': meeting.complete}">
    <div  class="meetings__info">
      <div @click="showDetails" class="meetings__block">
        <img class="logo meetings__logo" src="@/assets/logo.png" alt="logo">
        <span class="meetings__time">{{ meeting.time }}</span>
      </div>
      <h2 @click="showDetails" @keypress.space="showDetails" tabindex="0" class="meetings__title" aria-label="show details for your meeting"> {{ meeting.name }} </h2>
      <div class="icons">
        <router-link class="icon-link" :to="{name: 'EditMeeting', params: {id: meeting.id}}" aria-label="edit your meeting">
          <span class="material-icons meetings__icons" >edit</span>
        </router-link>
        <span tabindex="0" v-if="!isPending" class="material-icons meetings__icons" @click="handleDelete" aria-label="delete your meeting">delete</span>
        <span v-else class="material-icons meetings__icons meetings__icons--deleting">delete</span>
        <span tabindex="0" class="material-icons meetings__icons tick" @click="handleComplete" aria-label="mark meeting as complete">done</span>
      </div>
    </div>
    <div class="meetings__details" v-if="details">
      <div class="meetings__details-top">
        <h3 class="meetings__details-title">{{meeting.title}}</h3>
         <div class="meetings__photo">
          <img :src=meeting.imgUrl :alt=meeting.name>
        </div>
      </div>
      <p class="meetings__descr"> {{ meeting.description }} </p>
    </div>
  </li>
</template>

<script>
import { ref, computed } from '@vue/reactivity'
import useDocument from '@/composables/useDocument';
import getUser from '@/composables/getUser';
import useStorage from '@/composables/useStorage';
export default {
  props: ['meeting', 'id' ],
  setup(props) {
    const details = ref(false);
    const isPending = ref(false);

    const {user} = getUser();
    const { updateDoc, deleteDoc } = useDocument('meetings', props.id);
    const {deleteImage} = useStorage('meetings');

    const ownership = computed(() => {
      return props.meeting && user.value && user.value.uid == props.meeting.userId
    });

    const showDetails = () => {
      details.value = !details.value;
    }

    const handleComplete = async () => {
      await updateDoc({
        complete: !props.meeting.complete
      })
    }

    const handleDelete = async () => {
      isPending.value = true
      await deleteImage(props.meeting.filePath);
      await deleteDoc();
    };



    return {
      showDetails, details, handleDelete, handleComplete, ownership, isPending
    }
  }
}
</script>

<style lang="scss">
  .meetings {
    &__item {
      padding: 20px 40px;
      border-radius: 10px;
      transition: all ease 0.2s;

      &:not(:last-child) {
        margin-bottom: 16px;
      }

      &:hover {
        box-shadow: 1px 2px 3px rgba(50,50,50,0.05);
        transform: scale(1.02);
        transition: all ease 0.2s;
      }
    }

    &__info {
      padding-bottom: 40px;
      display: flex;
      align-items: center;
      justify-content: space-between;
    }

    &__block {
      max-height: 100px;
      display: flex;
      align-items: center;
      cursor: pointer;


      img {
        display: inline-block;
        margin-right: 100px;
        width: 90px;
        height: 95px;
      }
    }

    &__title {
      position: relative;
      margin: 0;
      font-weight: 700;
      font-size: 60px;
      color: #111;
      text-transform: uppercase;
      cursor: pointer;
      transition: color 0.33s ease-in-out, opacity 0.33s ease-in-out, transform 0.3s ease-in-out, background-color 0.3s ease-in-out;

      &::after {
        content: '';
        position: absolute;
        top: 50%;
        left: 0px;
        width: 0;
        height: 5px;
        background-color: #111;
        opacity: 0;
        border-radius: 20px;
        transition: width 0.3s ease-in-out, opacity 0.5s cubic-bezier(0.22, 0.61, 0.36, 1);

      }

      &:focus {
        outline: none;
      }

      &:focus-visible {
        transform: scale(1.06);
        background-color: #d66060;
      }
    }

    &__time {
      font-weight: normal;
      font-size: 36px;
      color: #000;
      transition: color 0.33s ease-in-out, opacity 0.33s ease-in-out;
    }

    &__icons {
      font-size: 24px;
      color: #bbb;
      cursor: pointer;
      transition: color 0.3s ease-in-out, transform 0.3s ease-in-out, background-color 0.3s ease-in-out;

      &:not(:last-child) {
        margin-right: 10px;
      }

      &:hover {
        color: #111;
      }

      &:focus {
        outline: none;
      }

      &:focus-visible {
        transform: scale(1.06);
        background-color: #d66060;
      }

      &--deleting {
        opacity: 0.8;
        pointer-events: none;
        animation: 0.7s iconMove infinite ease-in-out;
      }
    }

    .icon-link {
      display: inline-block;
      margin-right: 10px;
    }

    &__details {
      padding: 20px;
      border-top: 2px solid #333;
      &-top {
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-bottom: 20px;
      }

      &-title {
        margin: 0;
        margin-right: 40px;
        font-weight: 500;
        font-size: 36px;
        line-height: 42px;
        color: #111;
        transition: color 0.33s ease-in-out, opacity 0.33s ease-in-out;
      }
    }

    &__photo {
      max-width: 100px;
      max-height: 100px;
      width: 100%;
      height: 100%;
      overflow: hidden;
      border-radius: 100%;
      transition: opacity 0.33s ease-in-out;
      img {
        filter: brightness(160%);
      }
    }

    &__descr {
      margin: 0;
      font-weight: 400;
      font-size: 26px;
      line-height: 32px;
      color: #555;
      transition: color 0.33s ease-in-out, opacity 0.33s ease-in-out;
    }

    &__complete {
      background-color: rgb(23, 104, 59);

      & .meetings {
        &__title {
        color: #fff;
        opacity: 0.7;

          &::after {
            width: 100%;
            opacity: 1;
          }
        }

        &__time {
          opacity: 0.7;
          color: #fff;
        }

        &__details {
          &-title {
            opacity: 0.7;
            color: #fff;
          }
        }

        &__photo {
          opacity: 0.7;
        }

        &__descr {
          opacity: 0.7;
          color: #fff;
        }
      }


      & .tick {
        color: rgb(62, 189, 110);
      }
    }
  }

  @media (max-width: 950px) {
    .meetings {
      &__block {
        img {
          margin-right: 30px;
        }
      }

      &__title {
        font-size: 48px;
      }
    }
  }

  @media (max-width: 786px) {
    .meetings {
      &__info {
        padding: 20px 0;
      }
      &__title {
        font-size: 32px;
      }

      &__time {
        font-size: 24px;
      }

      &__block {
        img {
          width: 50px;
          height: 50px;
        }
      }

      &__details {
        padding: 20px 0;
        &-title {
          font-size: 26px;
          line-height: 32px;
          margin-right: 0;
          text-transform: uppercase;
        }
      }

      &__photo {
        width: 80px;
        height: 80px;
      }

      &__descr {
        font-size: 20px;
        line-height: 30px;
      }
    }
  }

  @media (max-width: 575px) {
    .meetings {
      &__item {
        padding: 20px;
      }

      &__title {
        font-size: 28px;
      }

      &__time {
        font-size: 20px;
      }

      &__icons {
        font-size: 20px;
      }

      &__details {
        &-title {
          font-size: 22px;
          line-height: 32px;
          text-transform: uppercase;
        }
      }

      &__photo {
        width: 50%;
        height: 100%;
      }

      &__descr {
        font-size: 18px;
      }
    }
  }

  @media (max-width: 480px) {
    .meetings {
      &__info {
        flex-direction: column;
        justify-content: center;
      }

      &__time {
        margin-bottom: 10px;
      }

      &__title {
        margin-bottom: 10px;
      }

      &__block {
        img {
          display: none;
        }
      }

      &__details-top {
        flex-direction: column;
        justify-content: center;
        text-align: center;
      }
    }
  }

</style>
