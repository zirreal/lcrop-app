<template>
<div class="create-project container">
    <div v-if="error" class="error">{{error}}</div>
    <form v-if="meeting" class="create-form" @submit.prevent="handleSubmit">
    <h2 class="create-form__title create-form__title--meeting">Edit Meeting with {{meeting.name}} </h2>
    <label class="create-form__label">Name:</label>
    <input class="create-form__input" type="text" required placeholder="enter name" v-model="name">
    <label  class="create-form__label">Time:</label>
    <input v-maska="'##:##'" class="create-form__input" type="text" required placeholder="enter time" v-model="time">
    <!-- additional info -->
    <label class="create-form__label">Title:</label>
    <input class="create-form__input" type="text" placeholder="type meeting title" v-model="title">
    <label class="create-form__label">Details:</label>
    <textarea class="textarea create-form__textarea" required placeholder="Add some details here..." v-model="description"></textarea>
    <button @click="handleSubmit" class="btn form__btn" v-if="!isPending" type="submit" aria-label="edit chosen meeting">edit meeting</button>
    <button class="btn form__btn" disabled v-else>Saving...</button>
  </form>
  <div v-else class="spinner">
      <Spinner  />
  </div>
</div>
</template>

<script>
import { ref } from '@vue/reactivity';
import {useRouter, useRoute} from 'vue-router';
import getDocument from '@/composables/getDocument';
import useDocument from '@/composables/useDocument';

import Spinner from '../components/Spinner.vue';
import { watch } from '@vue/runtime-core';

import {useMeta} from 'vue-meta';

export default {
  components: {Spinner},
  setup() {
    const router = useRouter();
    const route = useRoute();
    const {error, document: meeting} = getDocument('meetings', route.params.id);
    const { updateDoc} = useDocument('meetings', route.params.id);

    const name = ref('');
    const title = ref('');
    const time = ref('');
    const description = ref('');
    const isPending = ref(false);

    watch(() => meeting.value, () => {
      name.value = meeting.value.name;
      title.value = meeting.value.title;
      time.value = meeting.value.time;
      description.value = meeting.value.description;
    })

    useMeta({
      title: 'Edit Meeting page',
      description: 'page for editing your lcrop meetings',
    })

    const handleSubmit= async () => {
      isPending.value = true;
      await updateDoc({
        name: name.value,
        title: title.value,
        time: time.value,
        description: description.value
      })

      router.push({name: 'Meetings'});
    }

    return { error, title, name, time, description, meeting, isPending, handleSubmit}
  }
}
</script>

<style>

  .create-form__title--meeting {
    text-transform: uppercase;
    text-align: center;
  }

</style>
