<template>
  <div class="projects container">
    <div v-if="error">{{ error }}</div>
    <div v-if="documents" class="layout">
      <SearchBar :projects="documents" @handleSearch="handleSubmit" />
      <ProjectsList :projects="filteredDocs" />
    </div>
    <div v-else class="spinner">
      <Spinner />
    </div>
  </div> 
</template>

<script>
  import getCollection from '../composables/getCollection';

  import ProjectsList from '../components/ProjectsList.vue';
  import Spinner from '../components/Spinner.vue';
  import SearchBar from '../components/SearchBar.vue';

  import {useMeta} from 'vue-meta';
  import { computed, ref } from '@vue/reactivity';

  export default {
    name: 'Projects',
    components: {
      ProjectsList, Spinner, SearchBar
    },
    setup() {
      const { error, documents } = getCollection('projects');
      const val = ref('');

      useMeta({
        title: 'Our Projects',
        description: 'Check LCOPR projects here or create your own', 
      })

      const handleSubmit = (event) =>  {
        val.value = event;
      }

      const filteredDocs = computed(() => {
        if(!val.value)  {
          return documents.value
        } else {
          return documents.value.filter(doc => {
            if(doc.title.toLowerCase().includes(val.value)) {
              return doc
            }
         })
        }
      })

      return {
        documents, error, handleSubmit, filteredDocs,
      }
    }
  }
</script>

<style>

</style>