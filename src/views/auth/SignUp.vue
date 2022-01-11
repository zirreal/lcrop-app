<template>
  <div class="login-wrapper">
    <div class="container container-center container__login">
      <div class="logo-wrapper">
        <img src="../../assets/logo.png" alt="logo" class="logo logo--big">
      </div>
      <Form class="form form--login" @submit="handleSubmit" :validationSchema="schema">
        <Field
          class="input input--login"
          type="text" name="name"
          placeholder="your name"
          v-model="displayName"
        />
        <ErrorMessage class="error-validation" name="name"/>
        <Field
          class="input input--login"
          name="email"
          type="email"
          placeholder="email"
          v-model="email"
        />
        <ErrorMessage class="error-validation" name="email"/>
        <Field
          class="input input--login"
          type="password"
          name="password"
          placeholder="password"
          v-model="password"
        />
        <ErrorMessage class="error-validation" name="password"/>
        <FileInput :handleChange="handleChange" :text="text" :picSrc="picSrc"/>
        <div v-if="error" class="errorn"> {{ error }}</div>
        <button class="btn btn--secondary" v-if="!isPending" type="submit" aria-label="sign up a new account">Sign up</button>
        <button class="btn btn--secondary" v-if="isPending" disabled type="submit" aria-label="signing up a new account">Loading</button>
      </form>
    </div>
  </div>
</template>

<script>
  import useSignup from '@/composables/useSignup';
  import useStorage from '@/composables/useStorage';
  import addImg from '../../utils/addImages';
  import { ref } from '@vue/reactivity';
  import { useRouter } from 'vue-router';

  import { v4 as uuidv4 } from 'uuid';
  import { Form, Field, ErrorMessage} from "vee-validate";
  import {useMeta} from 'vue-meta';
  import * as yup from 'yup';

  import FileInput from '../../components/FileInput.vue';

  export default {
    components: {
      FileInput,
      Form,
      Field,
      ErrorMessage
    },

    setup() {
      const { error, signup, isPending } = useSignup();
      const {url, filePath, uploadImage } = useStorage('icons');
      const router = useRouter();

      const email = ref('');
      const password = ref('');
      const displayName = ref('');
      const file = ref(null);
      const fileError = ref(null);
      const blob = ref(null);
      const picSrc = ref(null);
      const text = ref('Upload your profile picture');

    useMeta({
      title: 'Signup Page',
      description: 'create your lcorp account here',
    })

      const schema = yup.object({
        email: yup.string().required().email(),
        password: yup.string().min(8).required('Password is required'),
        name: yup.string().min(3).matches(/^[aA-zZ\s]+$/, "Only letters are allowed for this field ").required('This field is required')
      });

      const handleSubmit = async () => {
        await uploadImage(file.value);
        const res = await signup(email.value, password.value, displayName.value, url.value);

        if(!error.value) {
          router.push({name: 'Home'});
        }
      }

      const extendPhotoName = (e) => {
        Object.defineProperty(e.target.files[0], 'name', {
          writable: true,
          value:  e.target.files[0].name + '-' + uuidv4()
        });
      }


      const handleChange = (e) => {
        addImg(e, blob, file, fileError, picSrc, text, () => extendPhotoName(e));
      };

      return {email, password, displayName, handleSubmit, error, isPending, handleChange, picSrc, text, schema }
    }
  }
</script>

<style>
  .login-wrapper {
    display: flex;
    overflow-y: auto;
    background-color: #671919;
  }

  .form--login__title {
    font-size: 48px;
    color: #fff;
    text-align: center;
  }
</style>
