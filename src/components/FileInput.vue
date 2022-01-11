<template>
  <label class="file">
    <input type="file" class="file__input" accept="image/*" @change="handleChange">
    <span class="file__icon"></span>
    <img v-if="picSrc" class="file__photo" :src="picSrc" alt="photo">
    <span class="file__content">{{text}}</span>
  </label>
</template>

<script>
export default {
  props: ['handleChange', 'picSrc', 'text']

}
</script>

<style>
  .file {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    border-radius: 20px;
    padding: 10px;
    margin-top: 10px;
    margin-bottom: 15px;
    width: 100%;
    min-height: 42px;
    background-color: #ebebeb;
    box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
    cursor: pointer;
  }

  .file__input {
    position: absolute;
    opacity: 0;
    appearance: none;
  }

  .file__icon {
    position: relative;
    border: 2px solid transparent;
    margin-bottom: 17px;
    border-radius: 100%;
    width: 50px;
    height: 50px;
    color: #fff;
    background-color: #671919;
    transition: border-color 0.3s ease-in-out, color 0.3s ease-in-out, background-color 0.3s ease-in-out;
  }

  .file__icon::before {
    content: "";
    position: absolute;
    left: 50%;
    top: 50%;
    width: 20px;
    height: 3px;
    background-color: currentColor;
    transform: translate(-50%, -50%);
  }

  .file__icon::after {
    content: "";
    position: absolute;
    left: 50%;
    top: 50%;
    width: 3px;
    height: 20px;
    background-color: currentColor;
    transform: translate(-50%, -50%);
  }

  .file__content {
    font-weight: 400;
    font-size: 14px;
    line-height: 30px;
    color: #671919;
  }

  .file__input:focus + .file__icon {
    background-color: #000;
    color: #993d3d;
  }

  .file:hover .file__icon {
    background-color: #000;
    color:  #993d3d;
  }

  .file__input:active + .file__icon {
    border-color: cornflowerblue;
    color: cornflowerblue;
  }

  .file__photo {
    width: 50px;
    height: 50px;
    border-radius: 10px;
    box-shadow: 1px 2px 5px #333;
  }
</style>
