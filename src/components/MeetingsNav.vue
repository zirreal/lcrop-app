<template>
  <nav class="meeting-nav">
    <button
    @click="updateFilter('all')" :class="{'meeting-nav__btn-active': current === 'all'}" class="meeting-nav__btn" aria-label="filter and display all meetings">
    view all</button>
    <button
    @click="updateFilter('completed')" :class="{'meeting-nav__btn-active': current === 'completed'}" class="meeting-nav__btn" aria-label="filter and display completed meetings">
    completed</button>
    <button
    @click="updateFilter('ongoing')" :class="{'meeting-nav__btn-active': current === 'ongoing'}" class="meeting-nav__btn" aria-label="filter and display ongoing meetings">
    ongoing</button>
    <router-link class="meeting-nav__btn  meeting-nav__btn-add" :to="{name: 'AddNewMeeting'}" aria-label="add new meeting">add new meeting</router-link>
  </nav>
</template>

<script>
export default {
  props: ['current'],
  setup(props, {emit}) {

    const updateFilter = (by) =>  {
        emit('filterChange', by)
    }

    return {
      updateFilter
    }
  }

}
</script>

<style lang="scss">
  .meeting-nav {
    display: flex;
    justify-content: center;
    align-items: center;
    padding-top: 68px;
    margin-bottom: 60px;

    &__btn {
      font-weight: 500;
      font-size: 22px;
      line-height: 42px;
      color: #BBBBBB;
      background-color: transparent;
      border: 1px solid transparent;
      text-align: center;
      text-transform: uppercase;
      cursor: pointer;
      transition: transform 0.33s ease-in-out, opacity 0.33s ease-in-out, background-color 0.33s ease-in, color 0.3s ease-in-out;

      &-add {
        padding: 0 10px;
        border-radius: 20px;
        border: 1px solid #bbb;
      }

      &:not(:last-child) {
        margin-right: 40px;
      }

      &:nth-child(3) {
        margin-right: 80px;
      }

      &:hover {
        color: #333;
        transform: scale(1.08);
      }

      &:focus {
        outline: none;
      }

      &:focus-visible {
        color: #e9e9e9;
        background-color: rgb(85, 14, 14);
      }

      &:active {
        opacity: 0.5;
      }

      &-active {
        color: #671919;
      }
    }
  }

  @media (max-width: 786px) {
    .meeting {
      &-nav {
        flex-wrap: wrap;

        &__btn:nth-child(-n+3) {
          margin-right: 10px;
        }
      }
    }
  }

  @media (max-width: 575px) {
    .meeting {
      &-nav {
        margin-bottom: 30px;
      }
    }
  }
</style>
