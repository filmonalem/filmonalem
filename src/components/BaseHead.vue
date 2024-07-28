<script setup>
import { ref } from 'vue';

const props = defineProps({
  Header: {
    type: String

  },
  buttonText: String,
  buttonText1: String

})
const emits = defineEmits(['showForm,showList', 'handleInput'])


</script>

<template>
  <div class="flex md:w-full  h-12 bg-slate-100 border-b gap-4">
    <div class="flex w-full h-12 bg-slate-100 border-b">
      <div class="flex mt-2 font-semibold text-center text-gray-500 w-1/5 mx-5 ">
        <p class="text-nowrap"> {{ Header }}</p>
      </div>
      <div class="flex w-4/5  ">
      </div>
      <div class="flex justify-end w-1/5 px-2  ">
        <button class=" text-nowrap button rounded-l px-2 font-semibold " @click="$emit('showForm')">
          {{ buttonText }}
        </button>
        <button class=" text-nowrap button rounded-r px-2  font-semibold" @click="$emit('showList')">
          {{ buttonText1 }}
        </button>
      </div>
    </div>
  </div>
</template>

<style scoped>
.button {
  @apply w-full hover:bg-slate-400 px-2 mt-2 h-8 hover:text-white text-gray-700;
}
</style>