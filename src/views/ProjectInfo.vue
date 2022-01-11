<template>
  <div class="container project-info">
    <div v-if="error"> {{ error }} </div>
    <div v-if="project" class="project-info__wrapper">
      <div class="project-info__img-block">
        <img :src=project.coverUrl :alt=project.title>
      </div>
      <div class="project-info__details">
        <h2 class="project-info__title">
          {{project.title}}
        </h2>
        <div class="project-info__authors">
          created by
          <span v-for="author in trimItems" :key="author" class="project-info__author">
            {{ `${author} ` }}
          </span>
        </div>
        <p class="project-info__descr">
          {{project.description}}
        </p>
        <div v-if="project.notes.length" class="project-info__notes">
          NOTES:
          <span v-for="note in project.notes" :key="note" class="project-info__note">
            {{  `${note} ` }}
          </span>
        </div>
      </div>
      <div v-if="ownership" class="project-info__btns">
        <button
        v-if="!project.complete"
        @click="handleComplete"
        class="btn project-info__btn project-info__btn--complete"
        aria-label="complete your project"
        >
        Complete Project
          <span class="material-icons">check_circle</span>
        </button>
        <div v-else class="project-info__completed">
          This project is completed
          <span class="material-icons">check_circle</span>
        </div>
        <button v-if="!isPending"
        @click="handleDelete"
        class="btn project-info__btn project-info__btn--delete"
        aria-label="delete your project"
        >
        Delete Project
        <span class="material-icons">delete_forever</span>
        </button>
        <button v-else
        class="btn project-info__btn project-info__btn--deleting" disabled>
        Deleting
        <span class="material-icons">delete_forever</span>
        </button>
      </div>
    </div>
    <div v-else class="spinner">
      <Spinner />
    </div>

  </div>
</template>

<script>
import getDocument from '@/composables/getDocument';
import useDocument from '@/composables/useDocument';
import getUser from '@/composables/getUser';
import useStorage from '@/composables/useStorage';
import Spinner from '../components/Spinner.vue'

import { useRouter, useRoute } from 'vue-router';
import { computed, ref } from '@vue/reactivity';
import {useMeta} from 'vue-meta';

export default {
  components: {
    Spinner,
   },
  setup() {
    const route = useRoute();
    const router = useRouter();

    const {error, document: project} = getDocument('projects', route.params.id);
    const {user} = getUser();
    const { updateDoc, deleteDoc } = useDocument('projects', route.params.id);
    const {deleteImage} = useStorage('projects');

    const isPending = ref(false);

    useMeta({
      title: 'Detail Project Information',
      description: 'information about lcorp project witl all the details',
    })

    const ownership = computed(() => {
      return project.value && user.value && user.value.uid == project.value.userId
    });

    const toUpperCase = (item) => {
      return item.toLowerCase().split(' ').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')
    }

    const trimItems = computed(() => {
      return project.value.authors.map((item, i) => {
        if(project.value.authors[i] !== project.value.authors[project.value.authors.length - 1]) {
          return `${toUpperCase(item)} and`
        } else {
          return toUpperCase(item)
        }
      })
    });

    const handleComplete = async () => {
       await updateDoc({
        complete: true
      })
    }

    const handleDelete = async () => {
      isPending.value = true
      await deleteImage(project.value.filePath);
      await deleteDoc();
      router.push({name: 'Projects'});
    };



    return {
      project, error, isPending, ownership, trimItems, handleComplete, handleDelete,
    }
  }

}
</script>

<style lang="scss">
  .project-info {
    &__wrapper {
      padding-top: 68px;
      padding-bottom: 20px;
    }

    &__img-block {
      position: relative;
      margin-bottom: 90px;
      border-radius: 10px;

      img {
        max-height: 500px;
        height: 100%;
        width: 100%;
        border-radius: 10px;
      }

      &::after {
        content: '';
        position: absolute;
        width: 100%;
        height: 5px;
        bottom: -55px;
        left: 0;
        background-color: #111;
      }
    }

    &__title {
      margin: 0;
      font-weight: 700;
      font-size: 60px;
      line-height: 70px;
      color: #000;
      text-align: center;
    }

    &__authors {
      margin-bottom: 20px;
      text-align: center;
      font-weight: 700;
      font-size: 16px;
      line-height: 24px;
      color: #333;
    }

    &__descr {
      margin: 0;
      margin-bottom: 50px;
      font-weight: 400;
      font-size: 20px;
      line-height: 32px;
      color: #333;
    }

    &__notes {
      margin-bottom: 20px;
    }

    &__note {
      font-weight: 700;
      font-size: 16px;
      line-height: 24px;
      color: #671919;
      &:not(:first-child) {
        display: block;
      }
    }

    &__btns {
      display: flex;
      align-items: center;
      justify-content: flex-end;

      & .project-info__btn {
        padding: 15px 25px;
        border-radius: 5px;
        display: flex;
        align-items: center;
        justify-content: center;
        text-align: center;

        span {
          padding-left: 10px;
        }
      }
    }

    &__btn--complete {
      margin-right: 20px;
    }

    &__completed {
      margin-right: 20px;
      display: flex;
      align-items: center;
      justify-content: center;
      font-weight: 700;
      text-transform: uppercase;
      color: #2ea85d;

      span {
        padding-left: 10px;
      }
    }

    &__btn--deleting {
      opacity: 0.8;
      pointer-events: none;
      span {
        animation: 0.5s iconMove infinite ease-in;
      }
    }

  }

  .swiper-pagination-bullet {
    &-active {
      background: #ce4242;
    }
  }

  @media (max-width: 492px) {
      .project-info {
        &__descr {
          margin-bottom: 30px;
          font-size: 16px;
        }

        &__completed {
          font-size: 14px;
        }
        &__btns {
          & .project-info__btn {
            padding: 14px 8px;
            font-size: 13px;
          }
        }
      }
    }

    @media (max-width: 412px) {
       .project-info {
        &__completed {
          font-size: 10px;
          span {
            font-size: 16px;
          }
        }
      }
    }
</style>
