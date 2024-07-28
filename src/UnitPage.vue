<script setup>
import { computed, ref, onMounted } from "vue";
import Table from "../../../components/EasyTable.vue";
import BaseHead from "../../../components/BaseHead.vue";
import { useUnitsStore } from "../../../store/configuration/unit";
import { storeToRefs } from "pinia";
import { useToast } from "vue-toast-notification";

var { addUnit, fetchAllUnit } = useUnitsStore();
const units_store = useUnitsStore();
const { units, message, hasError, status, isLoading } = storeToRefs(units_store);
console.log(message.value)
const tableHeader = ["No", "Unit Name"];
const unit = ref('');

var showButton = ref(true);
const searchInput = ref("");
// var open = ref(true);
const displayList = () => (open.value = true);
const displayShow = () => (open.value = false);
const toast = useToast();
const pageName = "Unit Page";
const isValid = computed(() => {
  return !unit.value;
});
const createUnit = async () => {
  const formData = {
    unit: unit.value,
  };
  // cont msg = a;
  // msg === a ? "success" :"error"

  await addUnit(formData)
    .then(() => {
      toast.open({
        message: hasError.value || message.value,
        position: "top",
        type: status.value === 201 ? "success" : "error"
      });

    });
  unit.value = ''
};
const perPageOptions = [5, 10, 25, 50, 100];

let currentPage = ref(1);
let itemsPerPage = ref(perPageOptions[0]);

const filterData = computed(() => {
  if (searchInput.value.trim() === "") {
    return units.value;
  } else {
    return units.value.filter((unit) =>
      unit.unit.toLowerCase().includes(searchInput.value.toLowerCase())
    );
  }
});

const paginatedUsers = computed(() => {
  const startIndex = (currentPage.value - 1) * itemsPerPage.value;
  const endIndex = startIndex + itemsPerPage.value;
  return filterData.value.slice(startIndex, endIndex);
});

const totalPages = computed(() => {
  return Math.ceil(filterData.value.length / itemsPerPage.value);
});

function nextPage() {
  currentPage.value++;
}

function prevPage() {
  currentPage.value--;
}
onMounted(() => {
  fetchAllUnit();
});
</script>

<template>
  <div>
    <p v-if="isLoading === true">loading {{ isLoading }}</p>
    <header class="m-2 w-full">
      <BaseHead @show-form="displayShow" @show-list="displayList" :Header="pageName" />
    </header>
    <div className="w-full  flex justify-center m-1 my-3">
      <div className=" flex-col  overflow-auto  border-r h-screen md:w-3/4 w-4/5">
        <div class="flex gap-4">
          <div class="relative w-1/3 mb-4 ml-4">
            <div class="absolute inset-y-0 start-0 flex items-center ps-3.5 pointer-events-none">
              <svg class="w-4 h-4 text-gray-500 dark:text-gray-400" aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                  d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z" />
              </svg>
            </div>
            <input type="text" v-model="searchInput" placeholder="search..." @click="filterData"
              class="h-8 px-2 py-1 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-gray-500 focus:border-gray-500 block w-full ps-10 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-gray-500 dark:focus:border-gray-500" />
          </div>
          <div class="m-1 mx-2">
            <label for="itemsPerPage">Items per page:</label>

            <select v-model="itemsPerPage"
              class="h-8 px-6 py-1 mx-2 appearance-none border border-slate-300 w-15 bg-slate-50 rounded focus:outline-none focus:ring-0 focus:shadow-none">
              <option v-for="option in perPageOptions" :key="option" :value="option">
                {{ option }}
              </option>
            </select>
          </div>
        </div>

        <Table :headers="tableHeader">
          <tr v-for="(item, index) in paginatedUsers" :key="index"
            class="bg-none rounded-2xl px-4 mx-2 hover:bg-slate-200">
            <td>{{ index + 1 }}</td>
            <td>{{ item.unit.charAt(0).toUpperCase() + item.unit.slice(1) }}</td>
          </tr>
        </Table>
        <nav class="flex items-center mx-4 mt-4">
          <button @click="prevPage" :disabled="currentPage === 1"
            class="px-3 h-7 py-1 bg-slate-100 hover:bg-slate-500 hover:text-white text-black ring-1 ring-slate-400 rounded">
            Previous
          </button>
          <span class="mx-2">{{ currentPage }} of {{ totalPages }}</span>
          <button @click="nextPage" :disabled="currentPage === totalPages"
            class="px-3 h-7 py-1 bg-slate-100 hover:bg-slate-500 hover:text-white text-black ring-1 ring-slate-400 rounded">
            Next
          </button>
        </nav>
      </div>
      <div class="flex  flex-col  mx-2  md:flex-row  flex-shrink-0 md:w-1/4 w-full py-1 pl-4">
        <div class="item-center   md:flex-col gap-4">
          <h2 class="font-semibold py-4 px-6">CreateUnit</h2>
          <FormKit v-model="unit" type="text" label="Unit Name" validation="required" />

          <button :disabled="isValid" v-if="showButton" @click="createUnit" :class="{ 'disabled-button': isValid }"
            class="bg-purple-500 h-8 block outline-offset-2 outline-purple-500 md:w-20 text-white font-semibold rounded-lg px-2 py-1 mt-6">
            create
          </button>
        </div>
      </div>
    </div>
  </div>
</template>
<style scoped>
.disabled-button {
  background-color: gray;
  color: white;
  outline-color: gray;
}
</style>
