<template>
  <div class="container chat">
    <div class="chat__wrapper">
      <ChatWindow/>
      <SingleMessage/>
    </div>
  </div>
</template>

<script>
import ChatWindow from '../components/ChatWindow.vue';
import SingleMessage from '../components/SingleMessage.vue';

import {useMeta} from 'vue-meta';

export default {
  components: {ChatWindow, SingleMessage},
  setup() {

    useMeta({
      title: 'Chat',
      description: 'Chat with your friends and LCOPR colleagues here', 
    })
  }
}
</script>

<style >
  .chat__wrapper {
    width: 70%;
    margin: 0 auto;
    margin-top: 40px;
    padding-bottom: 40px;
    padding-top: 20px;
    font-family: 'Nunito', sans-serif;
    background-color: #fff;
    border-radius: 10px;
    box-shadow: 1px 2px 3px rgba(50,50,50,0.05);
  }

  @media(max-width: 1180px) {
    .chat__wrapper {
      width: 80%;
      padding: 20px 20px 40px 20px;
    }
  }

  @media (max-width: 890px) {
    .chat__wrapper {
      width: 100%;
    }
  }
</style>