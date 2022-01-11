<template>
<div class="create-project container">
    <Form class="create-form" @submit="handleSubmit" :validationSchema="schema">
    <h2 class="create-form__title">Create New Project</h2>
    <label class="create-form__label">Title:</label>
    <Field class="create-form__input" name="title" type="text" required placeholder="enter project title" v-model="title" />
    <ErrorMessage class="error-validation error-validation--CF" name="title"/>
    <label class="create-form__label">Authors:</label>
    <input @keydown.enter.prevent=" handleKeydown('authors')"  class="create-form__input" name="authors" type="text" placeholder="press enter to add new author" v-model="author" >
    <div class="pills">
      <div v-for="author in authors" :key="author" class="pill pill-red">
        @{{ author }}
      </div>
    </div>
    <label class="create-form__label">Notes:</label>
    <input @keydown.enter.prevent=" handleKeydown('notes')" class="create-form__input" name="notes" type="text" placeholder="press enter to add project notes" v-model="note">
    <div class="pills">
      <div v-for="note in notes" :key="note" class="pill">
        #{{ note }}
      </div>
    </div>
    <FileInput :handleChange="handleChange" :text="text" :picSrc="picSrc"/>
    <div v-if="fileError" class="error"> {{ fileError }} </div>
    <label class="create-form__label">Details:</label>
    <Field as="textarea" class="textarea create-form__textarea" name="description" required placeholder="Project description..." v-model="description"></Field>
    <ErrorMessage class="error-validation error-validation--CF" name="description"/>
    <button class="btn form__btn" v-if="!isPending" type="submit" aria-label="create a new project">Create</button>
    <button class="btn form__btn" disabled v-else >Saving...</button>
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

import FileInput from '../components/FileInput.vue';

import {useMeta} from 'vue-meta';
import { Form, Field, ErrorMessage} from "vee-validate";
import * as yup from 'yup';


export default {
   components: {
    FileInput,
    Field,
    Form,
    ErrorMessage
    },
  setup() {
    const {url, filePath, uploadImage } = useStorage('projects');
    const { error, addDoc } = useCollection('projects');
    const { user } = getUser();
    const router = useRouter();

    const title = ref('');
    const authors = ref([]);
    const author = ref('');
    const notes = ref([]);
    const note = ref('');
    const description = ref('');
    const file = ref(null);
    const fileError = ref(null);
    const isPending = ref(false);
    const blob = ref(null);
    const picSrc = ref(null);
    const text = ref('Upload project cover image');

    useMeta({
      title: 'Create Your Project',
      description: 'page for creating your lcorp project',
    })

    const schema = yup.object({
      title: yup.string().min(5).required('This field is required'),
      description: yup.string().min(10).required('This field is required'),
    });

    const handleSubmit = async () => {
      if (file.value) {
        isPending.value = true;
        await uploadImage(file.value)
        const res = await addDoc({
          title: title.value,
          description: description.value,
          userId: user.value.uid,
          username: user.value.displayName,
          coverUrl: url.value,
          filePath:  filePath.value,
          complete: false,
          notes: notes.value,
          authors: authors.value ,
          createdAt: timestamp(),
        });
        isPending.value = false;

        if(!error.value) {
          router.push({name: 'ProjectInfo', params: {id: res.id}})
        }

      } else {
        fileError.value = 'Please select an image file (png/jpg/jpeg)'
      }
    };

    const handleChange = (e) => {
      addImg(e, blob, file, fileError, picSrc, text);
    };

    const handleKeydown = (el) => {
      let items;
      let item;
      switch (el) {
        case 'notes':
          items = notes;
          item = note;
          break;
        case 'authors':
          items = authors;
          item = author;
          break;
        default:
          throw new Error ('something went wrong')
      }

      if(!items.value.includes(item.value)) {
        item.value - item.value.replace(/\s/, '');
        items.value.push(item.value);
      }
      item.value = ''
    }

    return { title, note, author, authors, notes, description, handleSubmit, handleChange, fileError, isPending, handleKeydown, picSrc, text, schema}
  }
}
</script>

<style>

  .pills {
    margin-bottom: 25px;
  }

  .pill {
    display: inline-block;
    max-width: 200px;
    margin: 10px 10px 0 0;
    color: #444;
    background-color: #ddd;
    padding: 8px;
    border-radius: 20px;
    font-size: 14px;
  }

  .pill-red {
    color: #fff;
    background-color: #671919;
  }
</style>
