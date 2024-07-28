<!-- <script setup>
import { ref, computed, watchEffect, onMounted } from 'vue';
import BaseHead from '../../../components/BaseHead.vue';
import Table from '../../../components/EasyTable.vue';
import { usePurchaseStore } from "../../../store/stock/stock"
import { storeToRefs } from "pinia";

const stock_store = usePurchaseStore()
var { fetchDailyStock } = usePurchaseStore()

const currentDate = ref(getFormattedDate(new Date()));
const pageName = "Daily Stocks Report"
const dailyPurchases = computed(() => {
    return stock_store.dailyPurchaseData.filter(purchase => purchase.date === currentDate.value);
});
const tableHeader = ["No", "product", "supplierId", "Qty", "Price", "Total", "Action"]

function getFormattedDate(date) {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
}

watchEffect(() => {
    currentDate.value = getFormattedDate(new Date());
});

onMounted(() => {
    stock_store.fetchDailyStock();
});
</script>
<template>
    <div>
        <header class="ml-2">
            <BaseHead :Header="pageName" />
        </header>

        <p class="text-gray-600 mb-4">Date: {{ currentDate }}</p>
        <Table :headers="tableHeader" class=" mt-2">
            <tr v-for="(purchase, index) in filteredData" :key="purchase.date"
                class=" mt-2 bg-none  hover:bg-slate-200">
                <td>{{ index + 1 }}</td>
                <td>{{ purchase.medicineId.medicineName }}</td>
                <td>{{ purchase.supplierId.fullName }}</td>
                <td>{{ purchase.quantity }}</td>
                <td>{{ purchase.unitPrice }}</td>
                <td>{{ purchase.totalPayment }}</td>

            </tr>
        </Table>



    </div>
</template> -->
<!-- <template>
    <div>
        <h2>Table with Show/Hide Detail Cards</h2>
        <table border="1" cellspacing="0" cellpadding="10">
            <thead>
                <tr>
                    <th>ID</th>
                    <th>Name</th>
                    <th>Action</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="item in items" :key="item.id">
                    <td>{{ item.id }}</td>
                    <td>{{ item.name }}</td>
                    <td>
                        <button @click="toggleDetails(item.id)">
                            {{ selectedItem && selectedItem.id === item.id ? 'Hide Details' : 'Show Details' }}
                        </button>
                    </td>
                </tr>
            </tbody>
        </table>
        <div v-if="selectedItem" class="detail-card">
            <h3>Details for ID {{ selectedItem.id }}</h3>
            <p>Name: {{ selectedItem.name }}</p>
            <p>Additional Info: {{ selectedItem.details }}</p>
            <button @click="toggleDetails(selectedItem.id)">Close</button>
        </div>
    </div>
</template>

<script setup>
import { ref } from 'vue';

// Sample data for the table
const items = ref([
    { id: 1, name: 'Item 1', details: 'Detailed information about Item 1' },
    { id: 2, name: 'Item 2', details: 'Detailed information about Item 2' },
    { id: 3, name: 'Item 3', details: 'Detailed information about Item 3' },
]);

// State for tracking which item's details are currently visible
const selectedItem = ref(null);

// Function to toggle the display of details
function toggleDetails(itemId) {
    if (selectedItem.value && selectedItem.value.id === itemId) {
        selectedItem.value = null; // Hide details if the same item is clicked
    } else {
        const item = items.value.find((i) => i.id === itemId);
        selectedItem.value = item; // Show details if a different item is clicked
    }
}
</script>

<style scoped>
.detail-card {
    border: 1px solid #ccc;
    padding: 10px;
    border-radius: 5px;
    margin-top: 10px;
}
</style> -->
<!-- <template>
    <div>
        <h2>Table with Details</h2>
        <table border="1" cellspacing="0" cellpadding="10">
            <thead>
                <tr>
                    <th>ID</th>
                    <th>Name</th>
                    <th>Action</th>
                    <th v-if="selectedItem">Details</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="item in items" :key="item.id">
                    <td>{{ item.id }}</td>
                    <td>{{ item.name }}</td>
                    <td>
                        <button @click="toggleDetails(item.id)">
                            {{ selectedItem && selectedItem.id === item.id ? 'Hide Details' : 'Show Details' }}
                        </button>
                    </td>
                    <td v-if="selectedItem && selectedItem.id === item.id" :colspan="4">
                        <div class="detail-card">
                            <h3>Details for ID {{ selectedItem.id }}</h3>
                            <p>Name: {{ selectedItem.name }}</p>
                            <p>Additional Info: {{ selectedItem.details }}</p>
                            <button @click="toggleDetails(selectedItem.id)">Close</button>
                        </div>
                    </td>
                </tr>
            </tbody>
        </table>
    </div>
</template>

<script setup>
import { ref } from 'vue';

const items = ref([
    { id: 1, name: 'Item 1', details: 'Detailed information about Item 1' },
    { id: 2, name: 'Item 2', details: 'Detailed information about Item 2' },
    { id: 3, name: 'Item 3', details: 'Detailed information about Item 3' },
]);

const selectedItem = ref(null);

function toggleDetails(itemId) {
    if (selectedItem.value && selectedItem.value.id === itemId) {
        selectedItem.value = null; // Hide details if the same item is clicked
    } else {
        const item = items.value.find((i) => i.id === itemId);
        selectedItem.value = item; // Show details if a different item is clicked
    }
}
</script>

<style scoped>
.detail-card {
    border: 1px solid #ccc;
    padding: 10px;
    border-radius: 5px;
    margin-top: 10px;
}
</style> -->
<script setup>
import BaseHead from "../../../components/BaseHead.vue";
import Table from "../../../components/EasyTable.vue";
import { onMounted, ref, computed } from "vue";
import { storeToRefs } from "pinia";
import { useExpiryStore } from "../../../store/stock/expiry";
import { usePurchaseStore } from "../../../store/stock/stock";

var { fetchAllStocks } = usePurchaseStore();
const store = usePurchaseStore();
const { purchases } = storeToRefs(store);

var { fetchAllExpiring } = useExpiryStore();
const expire_store = useExpiryStore();
const { expiries } = storeToRefs(expire_store);

const pageName = "Expiry Products";

// console.log(purchases);

const tableHeader = ["No", "FullName", "MedicineName", "ExpiringDate"];

const supplierId = ref("");
const medicineId = ref("");
const expiryDate = ref("");


// const expiryate = 2024;
// const currentDate = new Date();
// const nowdate = currentDate.getMonth() + 1;

// const getRemainingDate = (expiryate) => {
//   var currentDate = new Date();
//   currentDate.getDate();
//   var expiryRemainingDate = getDate(expiryate);
//   expiryRemainingDate.getDate();
//   const remainDate = expiryRemainingDate - currentDate;
//   return remainDate;
// };

// console.log(purchases.expiryDate.value);

let searchInput = ref("");
const perPageOptions = [5, 10, 25, 50, 100];

let currentPage = ref(1);
let itemsPerPage = ref(perPageOptions[0]);

const filterData = computed(() => {
    if (searchInput.value.trim() === "") {
        return purchases.value;
    } else {
        const resultFiltered = purchases.value.filter((expire) => {
            return expire.medicineName.toLowerCase().includes(searchInput.value.toLowerCase());
        });
        return resultFiltered;
    }
});

console.log(filterData);
const paginatedExpire = computed(() => {
    const startIndex = (currentPage.value - 1) * itemsPerPage.value;
    const endIndex = startIndex + itemsPerPage.value;
    return filterData.value.slice(startIndex, endIndex);
});
const totalPages = computed(() => {
    return Math.ceil(filterData.length / itemsPerPage);
});

function nextPage() {
    currentPage.value++;
}

function prevPage() {
    currentPage.value--;
}

onMounted(() => {
    fetchAllExpiring();
    fetchAllStocks();
});
</script>

<template>
    <div>
        <header>
            <BaseHead :Header="pageName" />
        </header>
        <div class="flex gap-4 py-4">
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

        <div>
            <Table :headers="tableHeader" class="mt-1">
                <tr v-for="(item, index) in paginatedExpire" class="mt-2 bg-none hover:bg-slate-200">
                    <td>{{ index + 1 }}</td>
                    <td>{{ item.supplierId.fullName }}</td>
                    <td>{{ item.medicineId.medicineName }}</td>
                    <td>{{ item.expiryDate }}</td>
                </tr>
            </Table>
            <div class="flex justify-end">
                <nav class="inline-flex -space-x-px text-sm items-center mx-4 mt-4">
                    <button @click="prevPage" :disabled="currentPage === 1"
                        class="flex items-center justify-center px-3 h-8 ms-0 leading-tight text-gray-500 bg-white border border-e-0 border-gray-300 rounded-s-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">
                        Previous
                    </button>
                    <span
                        class="flex items-center justify-center px-3 h-8 leading-tight text-gray-500 border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">Page
                        {{ currentPage }} of {{ totalPages }}</span>
                    <button @click="nextPage" :disabled="currentPage === totalPages"
                        class="flex items-center justify-center px-3 h-8 leading-tight text-gray-500 bg-white border border-gray-300 rounded-e-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">
                        Next
                    </button>
                </nav>
            </div>
        </div>
    </div>
</template>

<style></style>
