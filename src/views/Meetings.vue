<template>
  <div class="meetings container">
    <MeetingsNav @filterChange="current = $event" :current="current"/>
    <div class="error" v-if="error">{{error}}</div>
    <div v-if="meetings">
      <ul class="meetings__list" v-for="meeting in filteredMeetings" :key="meeting.id">
        <SingleMeeting :meeting="meeting" :id="meeting.id"/>
      </ul>
    </div>
    <div class="spinner" v-else>
      <Spinner/>
    </div>
  </div>
</template>

<script>
import getCollection from '@/composables/getCollection';
import getUser from '@/composables/getUser';
import { computed, ref } from '@vue/reactivity';

import Spinner from '../components/Spinner.vue';
import MeetingsNav from '../components/MeetingsNav.vue';
import SingleMeeting from '../components/SingleMeeting.vue';

import {useMeta} from 'vue-meta';

export default {

  components: { MeetingsNav, SingleMeeting, Spinner },

  setup() {
    const current = ref('all');
    const {user} = getUser();
    const {error, documents: meetings } = getCollection(
      'meetings', 
      ['userId', '==', user.value.uid]
    );

    useMeta({
      title: 'Meetings',
      description: 'page for your lcorp meeting with all the details', 
    })

    const filteredMeetings = computed(() => {
      if(current.value === 'ongoing') {
       return meetings.value
              .filter(meeting => !meeting.complete)
              .sort((a, b) => parseInt(a.time) - parseInt(b.time))
      } else if (current.value === 'completed') {
        return meetings.value
                .filter(meeting => meeting.complete)
                .sort((a, b) => parseInt(a.time) - parseInt(b.time))
      } else {
        return meetings.value.sort((a, b) => parseInt(a.time) - parseInt(b.time))
      }
    })

    return {
      current, meetings, error, filteredMeetings
    }
  }
}
</script>

<style lang="scss">
  .meetings {
    &__list {
      padding: 0;
      margin: 0;
      list-style: none;
    }
  }

  
</style>