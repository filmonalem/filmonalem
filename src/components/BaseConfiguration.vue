<script setup>
import { ref } from "vue"
var displayConfiguration = ref(false);
const isOpen = () => {
  displayConfiguration.value = !displayConfiguration.value;
}
const routes = ref([
  {
    name: "Account",
    path: "/configuration/account",
    icon: "ri-account-pin-box-line",
  },
  {
    name: "Medicine",
    path: "/configuration/medicine",
    icon: "gi-pill-drop",
  },
  {
    name: "Unit",
    path: "/configuration/unit",
    icon: "co-unity",
  },
  {
    name: "Category",
    path: "/configuration/category",
    icon: "md-category-outlined",
  },
  // {
  //   name: "Test",
  //   path: "/configuration/test",
  //   icon: "md-category-outlined",
  // }
])
</script>
<template>
  <div class="  pl-1 m-0 ">
    <h6 @click="isOpen" class="   hover:text-black py-1  text-gray-600  "
      :class="{ 'text-primary': displayConfiguration }">
      Configurations
      <span class=" font-bold mr-5">
        <icon class="w-3 px-4 space-x-2.5" name="bi-chevron-down" v-if="!displayConfiguration" />
        <icon class="w-6 px-4 space-x-2" name="bi-chevron-right" v-if="displayConfiguration" />
      </span>
    </h6>

    <!--  links  -->
    <ul v-if="!displayConfiguration">
      <li v-for="x in routes"
        class=" mt-1 flex w-full h-full  hover:rounded-r-full hover:bg-purple-400   text-sm text-slate-600">
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