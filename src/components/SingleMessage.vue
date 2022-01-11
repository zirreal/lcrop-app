<template>
    <form class="chat__form">
      <textarea
        class="chat__textarea"
        placeholder="Type your message here..."
        v-model="message"
        :disabled=isPending
        @keypress.enter.prevent="handleSubmit">
      </textarea>
      <button :disabled=isPending @click.prevent="handleSubmit" type="submit" class="btn chat__btn" aria-label="send message to the chat">Send</button>
      <div v-if="error" class="error">{{ error }}</div>
  </form>
</template>

<script>
import { ref } from '@vue/reactivity'
import getUser from '../composables/getUser';
import useCollection from '../composables/useCollection';
import { timestamp } from '../firebase/config';

export default {
  setup() {
    const message = ref('');
    const isPending = ref(false);
    const { user } = getUser();
    const { addDoc, error } = useCollection('messages');

    const handleSubmit =  async () => {
      const chat = {
        message: message.value,
        name: user.value.displayName,
        createdAt: timestamp(),
        photo: user.value.photoURL,
        userUid: user.value.uid
      }

      if(message.value) {
        isPending.value = true;
        await addDoc(chat);
      }

      if(!error.value) {
        message.value = '';
        isPending.value = false;
      }
    }

    return {message, handleSubmit, error, isPending}
  }

}
</script>

<style lang="scss">
  .chat {
    &__form {
      width: 70%;
      display: flex;
      align-items: center;
      margin: 0 auto;

      & .chat__btn {
        padding: 15px 40px;
      }
    }

    &__textarea {
      width: 80%;
      padding: 0 20px;
      margin-right: 30px;
      font-size: 16px;
      font-weight: 500;
      font-family: "Nunito", sans-serif;
      color: #111;
      border: 1px solid transparent;
      border-bottom: 1px solid #111;
      transition: border 0.3s ease-in-out;

      &:focus {
        outline: none;
        border-bottom: 1px solid rgb(131, 47, 47);
      }
    }
  }

  @media (max-width: 576px) {
    .chat {
      &__form {
        width: 100%;
      }
    }
  }
</style>
