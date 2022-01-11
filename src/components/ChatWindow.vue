<template>
  <div class="chat__window">
    <div v-if="error" class="error">{{error}}</div>
    <ul ref="block" v-if="messages" class="chat__list">
      <li class="chat__item" v-for="message in formatedMessages" :key="message.id">
        <div class="chat__item-wrapper" :class="{'chat__item--user': user.uid === message.userUid }">
          <div class="chat__info">
            <div class="chat__photo">
              <img :src=message.photo alt="photo">
            </div>
            <span class="chat__name">{{message.name}}</span>
            <span class="chat__msg">{{message.message}}</span>
          </div>
          <div class="chat__time">
            <span v-if="user.uid === message.userUid" class="material-icons chat__icons" @click="handleDelete(message.id)">delete</span>
            <span class="chat__time-text" v-if="user.uid === message.userUid">you,</span>
            <span>{{message.createdAt}}</span>
          </div>
        </div>
      </li>
    </ul>
    <div v-else class="spinner">
      <Spinner/>
    </div>
  </div>
</template>

<script>
import getCollection from '@/composables/getCollection';
import getUser from '@/composables/getUser';
import useDocument from '@/composables/useDocument';
import Spinner from '../components/Spinner.vue';

import { formatDistanceToNow } from 'date-fns';
import { computed, ref } from '@vue/reactivity';
import { onUpdated } from '@vue/runtime-core';

export default {
  components: {Spinner},
  setup() {
    const {error, documents: messages} = getCollection('messages');
    const {user} = getUser();
    const block = ref(null);

    const formatedMessages = computed(() => {
      if(messages.value) {
        return messages.value.map(msg => {
          let time = formatDistanceToNow(msg.createdAt.toDate());
          return {...msg, createdAt: time}
        })
      }
    });


    const handleDelete = async (id) => {
      const { deleteDoc } = useDocument('messages', id);
      await deleteDoc();
    }


    onUpdated(() => {
      block.value.scrollTop = block.value.scrollHeight;
    });

    return {error, messages, user, block, formatedMessages, handleDelete}
  }

}
</script>

<style lang="scss">
  .chat {
    &__window {
      width: 70%;
      margin: 0 auto;
      margin-bottom: 50px;
    }
    &__list {
      padding: 0;
      margin: 0;
      list-style: none;
      max-height: 400px;
      overflow: auto;
    }

    &__item {
      width: 100%;
      margin-bottom: 20px;

      &-wrapper {
        display: flex;
        justify-content: space-between;
        align-items: center;
      }

      &--user {

        & .chat {
          &__info {
            order: 2;
          }

          &__photo {
            margin-right: 0;
            order: 3;
          }

          &__name {
            margin-right: 20px;
            order: 2;
          }

          &__msg {
            margin-right: 50px;
            order: 1;
          }

          &__time {
            order: 1;

            &-text {
              margin-right: 5px;
            }
          }

          &__icons {
            order: unset;
            margin-right: 5px;
            margin-left: 0;
          }
        }
      }
    }

    &__info {
      display: flex;
      align-items: center;
    }

    &__time {
      display: flex;
      align-items: center;
      font-size: 14px;
      font-weight: 500;
      color: #bebebe;
    }

    &__name {
      margin-right: 50px;
      font-size: 16px;
      font-weight: 700;
      color: #111;
    }

    &__photo {
      width: 60px;
      height: 60px;
      margin-right: 20px;

      img {
        height: 100%;
        width: 100%;
        border-radius: 100%;
      }
    }

    &__icons {
      order: 2;
      margin-left: 5px;
      cursor: pointer;
      transition: color 0.3s ease-in-out, opacity 0.3s ease-in-out;

      &:hover {
        color: #333;
      }

       &:active {
         opacity: 0,7;
      }
    }

    &__msg {
      max-width: 200px;
      overflow-wrap: break-word;
    }
  }

  @media(max-width: 1180px) {
    .chat {
      &__window {
        width: 100%;
      }

      &__msg {
        max-width: 300px;
      }
    }
  }

  @media (max-width: 740px) {
    .chat {
      &__time {
        flex-direction: column;
        justify-content: center;
        align-items: flex-start;
      }

      &__item--user {
        & .chat {
          &__icons {
            margin-right: 0;
          }

          &__time-text {
            margin-right: 0;
          }
        }
      }

      &__msg {
        max-width: 200px;
      }
    }
  }

  @media (max-width: 576px) {
    .chat {
      &__name {
        display: none;
      }

      &__item--user .chat__msg {
        margin-right: 30px;
      }
    }
  }

  @media (max-width: 465px) {
    .chat__msg {
      max-width: 120px;
    }
  }
</style>