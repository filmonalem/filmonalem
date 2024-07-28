<script setup>
import { ref, onMounted, onUnmounted } from 'vue';
// import expiringPage from '../views/pages/stock/expiringPage.vue';
const notificationCount = ref(1);
const showDropdown = ref(false);
const dropDownContainer = ref(null);

const toggleDropdown = () => {
  showDropdown.value = !showDropdown.value;
};
const logout = () => {
  localStorage.clear()

  window.location.reload()
}
const showingBadges = ref(false);
const badges = ref(['notification 1', 'notification 2']);

const badgeContainer = ref(null);

const showBadges = () => {
  showingBadges.value = !showingBadges.value;
};

const handleClickOutside = (event) => {
  if (badgeContainer.value && !badgeContainer.value.contains(event.target)) {
    showingBadges.value = false;
  };
  if (dropDownContainer.value && !dropDownContainer.value.contains(event.target)) {
    showDropdown.value = false;
  }
};
onMounted(() => {
  document.addEventListener('click', handleClickOutside);

});

onUnmounted(() => {
  document.removeEventListener('click', handleClickOutside);

});
</script>

<template>
  <div class="  flex mr-4  gap-4 py-1  ">
    <div ref="badgeContainer">
      <div @click="showBadges" class="absolute  notification-icon mx-4 mt-2 ">
        <span class="px-1  bg-[#f3f4f6]">🔔</span>
        <div v-if="notificationCount > 0" class="badge ">{{ notificationCount }}</div>

        <div v-if="showingBadges"
          class=" absolute font-md drop-shadow-md md:drop-shadow-xl  top-12  w-auto bg-[#f3f4f6] p-4 mt-2 rounded  ">


          <div v-for="(badge, index) in badges" :key="index"
            class="  font-md  mx-2 top-12   bg-[#f3f4f6] p-2 mt-1 rounded   hover:bg-blue-500  text-black py-0.5  ">

            <a class="block  hover:bg-blue-500   text-black py-0.5 whitespace-nowrap">{{ badge }}</a>

          </div>
        </div>
      </div>

    </div>
    <div class=" md:flex space-x-8 bg-[#f3f4f6] " ref="dropDownContainer">

      <button @click="toggleDropdown" class="   h-8 max-w-sm mr-3  mb-1 text-black font-bold  ">
        <img src="../assets/image/avatar.jpg" class=" rounded-full w-10" alt="user info">
      </button>

      <div v-if="showDropdown"
        class=" absolute font-md drop-shadow-md md:drop-shadow-xl  top-12 right-6 bg-[#f3f4f6] p-4 mt-2 rounded  ">
        <a class="block  hover:bg-blue-500  text-black py-0.5">Full Name</a>
        <a class="block  hover:bg-blue-500 text-black py-0.5"> Role </a>
        <a class="block hover:bg-blue-500 text-black py-0.5"> Email </a>
        <a class="block  hover:bg-blue-500 text-black py-0.5"> Change Password </a>
        <a @click="logout" class="block  hover:bg-gray-600 text-black py-0.5">Logout</a>
      </div>

    </div>
  </div>
</template>


<style>
a {
  @apply hover:text-white focus:outline-none p-2 text-white rounded
}

.notification-icon {
  position: relative;
  cursor: pointer;
}

.badges {
  position: relative;
  padding: 5px 10px;
  margin: 5px;
}


.badge {
  position: absolute;
  top: -5px;
  right: -5px;
  background-color: red;
  color: white;
  border-radius: 50%;
  width: 20px;
  height: 20px;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 12px;
}

.notiList {
  margin: 0px;

  list-style: none;
  width: 220px;

  align-items: center;
  font-size: 12px;
}
</style>