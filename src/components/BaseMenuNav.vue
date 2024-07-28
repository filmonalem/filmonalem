<script setup>
import { ref } from "vue"

var displayConfiguration = ref(false);

const isOpen = () => {
  displayConfiguration.value = !displayConfiguration.value;
};
const routes = ref([


])
</script>      
   
<template>
  <div class=" text-lg p-1 m-0 ">
    <h6 @click="isOpen" class="px-2  hover:bg-gray-600 hover:text-white py-1  rounded-r-full "
      :class="{ 'text-primary': displayConfiguration }">
      Configurations
      <span class="w-6 px-4 space-x-2.5">
        <icon class="w-6 px-4 space-x-2.5" name="bi-chevron-down" v-if="!displayConfiguration" />
        <icon class="w-6 px-4 space-x-2" name="bi-chevron-right" v-if="displayConfiguration" />
      </span>
    </h6>

    <!--  links  -->
    <ul v-if="!displayConfiguration">
      <li v-for="x in routes" class="flex w-full h-full m-1  hover:bg-purple-700 rounded-r-full text-sm text-gray-700 outline-none">
        <router-link router-link="w-full" active-class="link-active w-full" :to="x.path" class="w-full">
          <div class="flex gap-1 items-center w-full px-4 py-1.5">
            <icon class="w-6" :name="x.icon" />
            <span class="ml-1 truncate flex-1">{{ x.name }}</span>
          </div>
        </router-link>
      </li>
    </ul>
  </div>
</template>