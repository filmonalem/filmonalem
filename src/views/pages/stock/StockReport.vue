<script setup>
import { ref, computed } from 'vue';
import BaseHead from '../../../components/BaseHead.vue';
import Table from '../../../components/EasyTable.vue';
// import html2pdf from 'html2pdf';
import { storeToRefs } from "pinia";
import { usePurchaseStore } from "../../../store/stock/stock"
import { useToast } from "vue-toast-notification"
const stock_store = usePurchaseStore()
const toast = useToast()

var { fetchStockReport } = usePurchaseStore()
const { purchases, status, message, hasError } = storeToRefs(stock_store)
const startDate = ref();
const endDate = ref();
const pageName = "Filtered Report"
const filteredData = ref([]);
const tableHeader = ["No", "product", "customerId", "Qty", "Price", "Total", "Action"]
const filterData = async () => {
    const formData = {
        startDate: startDate.value,
        endDate: endDate.value
    }
    await fetchStockReport(formData).then(() => {
        toast.open({
            message: message.value || hasError.value,
            position: "top",
            type: status.value === 201 ? "success" : "error"
        })
    })
};

const printReport = () => {
    window.print();
};

const exportToPDF = () => {
    const element = document.querySelector('.report');
    html2pdf().from(element).save();
};
</script>

<template>
    <div class="p-4">
        <header class="ml-2">
            <BaseHead :Header="pageName" />
        </header>
        <div class="absolute flex space-x-4 mb-2 mt-2">

            <p class="flex font-semibold text-gray-500 space-x-4 mb-2 mt-1"> Search by date</p>
            <input type="date" v-model="startDate"
                class="h-8  px-2 py-1 appearance-none border border-slate-300  bg-slate-50 rounded   focus:outline-none focus:ring-0 focus:shadow-none">
            <p class="flex font-semibold text-gray-500 space-x-4 mb-2 mt-1"> to</p>
            <input type="date" v-model="endDate"
                class="h-8  px-2 py-1 appearance-none border border-slate-300  bg-slate-50 rounded   focus:outline-none focus:ring-0 focus:shadow-none">
            <button @click="filterData"
                class="h-8  px-2 py-1 text-gray-900 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-100 font-medium rounded-lg text-sm  me-2 mb-2 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700">Filter</button>
            <button @click="printReport"
                class="h-8  px-2 py-1 text-gray-900 bg-gray-200 border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-100 font-medium rounded-lg text-sm  me-2 mb-2 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700">
                Print</button>
            <button @click="exportToPDF"
                class="h-8 text-nowrap px-2 py-1 text-gray-900 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-100 font-medium rounded-lg text-sm  me-2 mb-2 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700">Export
                to PDF</button>


        </div>
        <div class="mt-5 border rounded-md p-4  w-full">

            <Table :headers="tableHeader" class=" mt-2">
                <tr v-for="(stock, index) in filteredData" :key="sale.date" class=" mt-2 bg-none  hover:bg-slate-200">
                    <td>{{ index + 1 }}</td>
                    <td>{{ stock.medicineId.medicineName }}</td>
                    <td>{{ stock.supplierId.fullName }}</td>
                    <td>{{ stock.quantity }}</td>
                    <td>{{ stock.unitPrice }}</td>
                    <td>{{ stock.totalPayment }}</td>

                </tr>
            </Table>
        </div>
    </div>
</template>
<style scoped></style>
<!-- <template>
    <div>
        <select @change="addItem($event.target.value)">
            <option value="">Select an item</option>
            <option v-for="item in filteredItems" :key="item.id" :value="item.firstName"
                :disabled="selectedItems.includes(item.firstName)">
                {{ item.firstName }}
            </option>
        </select>

        <div v-if="selectedItems.length > 0">
            <h2>Selected Items:</h2>
            <ul>
                <li v-for="item in selectedItems" :key="item">{{ item }}</li>
            </ul>
        </div>
    </div>
</template>

<script setup>
import { ref } from 'vue';

// Define reactive array to hold selected items
const selectedItems = ref([]);

// Define list of items with first names
const items = ref([
    { id: 1, firstName: 'John', lastName: 'Doe' },
    { id: 2, firstName: 'Jane', lastName: 'Doe' },
    { id: 3, firstName: 'Alice', lastName: 'Smith' },
    { id: 4, firstName: 'Bob', lastName: 'Smith' },
]);

// Function to add selected item to the array
const addItem = (item) => {
    if (item && !selectedItems.value.includes(item)) {
        selectedItems.value.push(item);
    }
};

// Computed property to filter items and return only first names
const filteredItems = items.value.map(item => {
    return { id: item.id, firstName: item.firstName };
});
</script> -->