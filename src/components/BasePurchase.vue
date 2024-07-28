<script setup>
import { ref } from "vue"
var displayPurchase = ref(false);
const isOpen = () => {
  displayPurchase.value = !displayPurchase.value;
}
const routes = ref([

])
</script>
<template>
  <div class="  p-1 m-0 ">
    <div class="flex flex-row">
      <h6 @click="isOpen" class="  hover:text-black py-1  text-gray-600 rounded-r-full "
        :class="{ 'text-primary': displayPurchase }">
        Purchase
        <span class="  ml-10 ">
          <icon class="w-3 px-4 space-x-2.5" name="bi-chevron-down" v-if="!displayPurchase" />
          <icon class="w-6 px-4 space-x-2" name="bi-chevron-right" v-if="displayPurchase" />
        </span>
      </h6>
    </div>

    <!--  links  -->
    <ul v-if="!displayPurchase">
      <li v-for="x in routes" class="flex w-full h-full  hover:rounded-r-full hover:bg-purple-400   text-sm text-black">
        <router-link router-link="w-full" active-class="link-active w-full" :to="x.path" class=" text-black">
          <div class="flex gap-1 items-center w-full px-4 ">
            <icon class="w-6" :name="x.icon" />
            <span class="ml-1 truncate flex-1">{{ x.name }}</span>
          </div>
        </router-link>
      </li>
    </ul>
  </div>

</template>