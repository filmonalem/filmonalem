<script setup>
import { ref } from 'vue';
import Header from "./BaseHeader.vue"
import BaseFooter from './BaseFooter.vue';
import BasePurchase from './BasePurchase.vue';
import BaseConfiguration from './BaseConfiguration.vue';
import BaseSales from './BaseSales.vue';
import BaseStock from './BaseStock.vue';
const showSidebar = ref(true);
const darkTheme = ref(false);

const toggleSidebar = () => {
  showSidebar.value = !showSidebar.value;
};

const toggleTheme = () => {
  darkTheme.value = !darkTheme.value;
  document.documentElement.classList.toggle('dark', darkTheme.value);
};


</script>

<template>
  <div class=" flex h-screen min-h-screen overflow-y-auto bg-[#f3f4f6] w-full  ">
    <!-- Sidebar -->
    <div
      class="sticky top-0 z-40 h-full max-md:fixed max-md:z-40 max-md:inset-0 max-md:flex transform transition-all duration-500 ease-in-out shadow-sm overflow-auto"
      :class="{
        'max-md:translate-x-0 ': showSidebar,
        'max-md:-translate-x-full': !showSidebar,

      }">

      <div class="border-r max-md:block w-54 h-full bg-[#f3f4f6]   text-black p-2">


        <button v-if="showSidebar" @click="toggleSidebar"
          class=" hidden max-md:block font-bold text-xl text-black focus:outline-none  ">
          ☰
        </button>
        <div class="flex items-center m-0 py-2 px-2 text-2xl font-semibold">
          <img src="/src/assets/medicine.svg" class="h-10" />
          Apex
        </div>
        <!-- side bar   -->
        <div class="m-0 py-2 ">

          <BaseConfiguration />
          <BaseStock />
          <BaseSales />
        </div>

      </div>
      <!--hide at click-->
      <div class="hidden max-md:block flex-1 bg-transparent" @click="toggleSidebar"></div>

    </div>

    <!-- Main content -->
    <div class="h-full flex-1 transform transition-all duration-500 ease-in-out">

      <div class=" flex-grow p-1 align-bottom ">

        <!-- Header -->
        <header class=" flex justify-between bg-[#f3f4f6]   ">

          <div class="flex justify-start  px-4 align-baseline ">

            <button v-if="!showSidebar" class="hidden max-md:block font-bold text-xl text-black focus:outline-none"
              @click="toggleSidebar">
              ☰
            </button>
          </div>
          <div class="mr-4   ">
            <Header />
          </div>

        </header>


        <!-- Main content goes here -->
        <div class=" h-full  ">
          <router-view></router-view>
        </div>
      </div>
    </div>
  </div>
</template>


<style>
.link-active {
  @apply bg-purple-500 text-white rounded-r-full;

}
</style>