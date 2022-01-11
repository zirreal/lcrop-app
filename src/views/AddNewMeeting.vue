<template>
<div class="create-project container">
    <Form class="create-form" @submit="handleSubmit" :validationSchema="schema">
    <h2 class="create-form__title create-form__title--meeting">Add New Meeting</h2>
    <label class="create-form__label">Name:</label>
    <Field class="create-form__input" name="name" type="text" required placeholder="enter name" v-model="name" />
    <ErrorMessage class="error-validation error-validation--CF" name="name"/>
    <label @click="handleTime" class="create-form__label">Time:</label>
    <Field  v-maska="'##:##'" class="create-form__input" name="time" type="text" required placeholder="enter time" v-model="time" />
    <ErrorMessage class="error-validation error-validation--CF" name="time"/>
    <!-- additional info -->
    <label class="create-form__label">Title:</label>
    <Field class="create-form__input" name="title" type="text" placeholder="type meeting title" v-model="title" />
    <ErrorMessage class="error-validation error-validation--CF" name="title"/>
    <!-- Upload playlist image -->
    <FileInput :handleChange="handleChange" :text="text" :picSrc="picSrc"/>
    <label class="create-form__label">Details:</label>
    <textarea class="textarea create-form__textarea" placeholder="Add some details here..." v-model="description"></textarea>
    <div v-if="fileError" class="error"> {{ fileError }} </div>
    <button class="btn form__btn" v-if="!isPending" type="submit" aria-label="create a new meeting">add meeting</button>
    <button class="btn form__btn" disabled v-else aria-label="creating a new meeting">Saving...</button>
  </form>
</div>
</template>

<script>
import { ref } from '@vue/reactivity';
import {useRouter} from 'vue-router';

import { timestamp } from '@/firebase/config';
import useStorage from '@/composables/useStorage';
import useCollection from '@/composables/useCollection';
import getUser from '@/composables/getUser';
import addImg from '../utils/addImages';

import { useMeta } from 'vue-meta'
import { Form, Field, ErrorMessage} from "vee-validate";
import * as yup from 'yup';

import FileInput from '../components/FileInput.vue';

export default {
  components: {
    FileInput,
    Field,
    Form,
    ErrorMessage,
    },
  setup() {
    const {url, filePath, uploadImage } = useStorage('meetings');
    const { error, addDoc } = useCollection('meetings');
    const { user } = getUser();
    const router = useRouter();

    const name = ref('');
    const title = ref('');
    const time = ref('');
    const description = ref('');
    const file = ref(null);
    const fileError = ref(null);
    const isPending = ref(false);
    const blob = ref(null);
    const picSrc = ref(null);
    const text = ref('Upload image for a person you meeting');


    useMeta({
      title: 'Add New Meeting here',
      description : `Add new meeting to your LCORP schedule`
    })

    const schema = yup.object({
      time: yup.string().max(5).matches( /^([0-9]|0[0-9]|1[0-9]|2[0-3]):[0-5][0-9]$/, 'Enter valid format: HH:MM (European 24-hour clock format) ').required('This field is required'),
      title: yup.string().min(5).required('This field is required'),
      name: yup.string().min(3).matches(/^[aA-zZ\s]+$/, "Only letters are allowed for this field ").required('This field is required')
    });

    const handleSubmit = async () => {

      if (file.value) {
        isPending.value = true;
        await uploadImage(file.value);
        const res = await addDoc({
          title: title.value,
          description: description.value,
          name: name.value,
          time: time.value,
          userId: user.value.uid,
          username: user.value.displayName,
          imgUrl: url.value,
          filePath:  filePath.value,
          complete: false,
          createdAt: timestamp(),
        });
        isPending.value = false;

        if(!error.value) {
          router.push({name: 'Meetings'})
        }

      } else {
        fileError.value = 'Please select an image file (png/jpg/jpeg)'
      }
    };

    const handleChange = (e) => {
      addImg(e, blob, file, fileError, picSrc, text);
    };

    return { title, name, time, description, handleSubmit, handleChange, fileError, isPending, picSrc, text, schema}
  }
}
</script>

<style>

  .create-form__title--meeting {
    text-transform: uppercase;
    text-align: center;
  }

  .create-form__textarea {
    margin-bottom: 20px;
  }

</style>
