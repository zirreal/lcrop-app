<template>
  <form
    class="search-project__form"
    @submit.prevent="handleSubmit"
  >
    <label className="search-project__label" for="projectName">look for a specific project:</label>
    <div className="search-project__wrapper">
      <input
        class="search-project__input"
        name='projectName'
        type='text'
        placeholder="Enter project name"
        @input="cleanField"
        v-model="projectName" >
      <button
        type='submit'
        className="btn search-project__btn"
        aria-label="find needed project"
        >
        Find
      </button>
    </div>
  </form>
</template>

<script>

import { ref } from '@vue/reactivity';

export default {

  setup(props, {emit}) {

    const projectName = ref('');

    const handleSubmit = (e) => {
      e = projectName.value
      emit("handleSearch", e)
    }


    return {projectName, handleSubmit}
  }

}
</script>

<style lang="scss">
  .search-project {

    &__form {
      margin-top: 30px;
      padding: 30px;
      padding-top: 38px;
      display: flex;
      flex-direction: column;
      align-items: flex-end;
      justify-items: center;
      border-radius: 10px;

      & .search-project__btn {
        padding: 8px 35px;
      }
    }


    &__wrapper {
      display: flex;
    }


    &__label {
      margin-bottom: 10px;
      font-size: 18px;
      color: #333;
      text-transform: uppercase;
    }

    &__input {
      padding: 10px 20px;
      margin-right: 20px;
      border: 1px solid #333;
      border-radius: 10px;
      transition: border 0.3s ease-in-out;

      &:focus {
        outline: none;
      }

      &:focus-visible {
        border: 3px solid #671919;
      }
    }
  }
</style>
