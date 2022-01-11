<template>
  <div class="projects">
    <div class="projects-list">
      <article class="project" v-for="project in projects" :key="project.id">
        <SingleProject :project="project" />
      </article>
    </div>
    <div class="projects__btn-block">
      <router-link :to="{name: 'CreateProject'}" class="btn projects__btn" aria-label="create project page">Create Project</router-link>
    </div>
  </div>
</template>

<script>
  import SingleProject from './SingleProject.vue';
  export default {
    props: ['projects'],
    components: { SingleProject },
    setup(props) {
    }
  }
</script>

<style lang="scss">
  .projects {
    padding: 30px;

    &__btn {
      position: absolute;
      right: 0;
      top: 0;
      padding: 15px 40px;

      &-block {
        position: relative;
        height: 60px;
      }
    }

  }

  .project {
    width: 100%;
    min-height: 352px;
    height: 100%;
    padding-right: 112px;
    margin-bottom: 68px;
    display: grid;
    grid-template-columns: 2fr 1fr;
    grid-template-rows: minmax(352px, auto);
    column-gap: 80px;
    justify-content: space-between;
    background-color: #111;
    overflow: hidden;
  }

  @media (max-width: 1200px) {
    .project {
      padding-right: 20px;
      column-gap: 40px;
    }
  }

   @media (max-width: 640px) {
    .project {
      padding: 0 0 20px 0;
      grid-template-columns: 1fr;
      grid-auto-rows: minmax(352px, auto);
      grid-template-rows: minmax(30px, auto);
      gap: 15px 0;
    }
  }

</style>
