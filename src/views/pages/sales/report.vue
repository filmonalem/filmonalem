<script setup>
import { ref } from 'vue';
// import html2pdf from 'html2pdf';
import BaseHead from '../../../components/BaseHead.vue';
import Table from '../../../components/EasyTable.vue';
const pageName = "Filtered Report"
const startDate = ref('');
const endDate = ref('');
const tableHeader = ["No", "date", "date"]
// const tableHeader = ["No", "product", "customerId", "Qty", "Price", "Total", "Action"]
const data = ref([
    { date: '2024-03-18', data: 'Report data 1' },
    { date: '2024-03-19', data: 'Report data 2' },
    { date: '2024-03-20', data: 'Report data 3' },
]);

const filteredData = ref([]);

const filterData = () => {
    filteredData.value = data.value.filter(item => {
        return item.date >= startDate.value && item.date <= endDate.value;
    });
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
        <div class="flex space-x-4 mb-2 mt-2">
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
        <div>
            <Table :headers="tableHeader" class=" mt-2">
                <tr v-for="(item, index ) in filteredData" :key="item.date" class=" mt-2 bg-none  hover:bg-slate-200">
                    <td>{{ index + 1 }}</td>
                    <td class="border px-4 py-2">{{ item.date }}</td>
                    <td class="border px-4 py-2">{{ item.data }}</td>
                </tr>
            </Table>

            <!--            <div class="border rounded-md p-4">
     <Table :headers="tableHeader" class=" mt-2">
    <tr v-for="(sale, index) in filteredData" :key="sale.date" class=" mt-2 bg-none  hover:bg-slate-200">
        <td>{{ index + 1 }}</td>
        <td>{{ sale.medicineId.medicineName }}</td>
        <td>{{ sale.customerId.fullName }}</td>
        <td>{{ sale.quantity }}</td>
        <td>{{ sale.unitPrice }}</td>
        <td>{{ sale.totalPayment }}</td>

    </tr>
</Table>
</div> -->
        </div>
    </div>
</template>


<style scoped></style>
/* Add your custom styles here */

<!-- <script setup>
import { ref } from 'vue';
import BaseHead from '../../../components/BaseHead.vue';
import Table from '../../../components/EasyTable.vue';
// import html2pdf from 'html2pdf';
import { useSalesStore } from '../../../store/sales/sales';
import { storeToRefs } from 'pinia';
const sale_Store = useSalesStore()
const { sales } = storeToRefs(sale_Store)
const startDate = ref('');
const endDate = ref('');
const pageName = "Filtered Report"
const filteredData = ref([]);
const tableHeader = ["No", "product", "customerId", "Qty", "Price", "Total", "Action"]
const filterData = () => {
    filteredData.value = sales.value.filter(sale => {
        return sale.sales >= startDate.value && sale.sales <= endDate.value;
    });
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
        <div class="flex space-x-4 mb-2 mt-2">
            <input type="date" v-model="startDate"
                class="h-8  px-2 py-1 appearance-none border border-slate-300  bg-slate-50 rounded   focus:outline-none focus:ring-0 focus:shadow-none">
            <input type="date" v-model="endDate"
                class="h-8  px-2 py-1 appearance-none border border-slate-300  bg-slate-50 rounded   focus:outline-none focus:ring-0 focus:shadow-none">
            <button @click="filterData"
                class="bg-blue-500 outline outline-offset-2 hover:outline-blue-500 block hover:bg-blue-700 px-4 text-white font-semibold rounded  py-1 ">Filter</button>
            <button @click="printReport"
                class="bg-green-500 outline outline-offset-2 hover:outline-green-500 block hover:bg-green-700  px-4 text-white font-semibold rounded  py-1 ">
                Print</button>
            <button @click="exportToPDF"
                class="bg-orange-500 outline outline-offset-2 hover:outline-orange-500 block hover:bg-orange-700 px-4  text-white font-semibold rounded  py-1 ">Export
                to PDF</button>
        </div>
        <div class="border rounded-md p-4">

            <Table :headers="tableHeader" class=" mt-2">
                <tr v-for="(sale, index) in filteredData" :key="sale.date" class=" mt-2 bg-none  hover:bg-slate-200">
                    <td>{{ index + 1 }}</td>
                    <td>{{ sale.medicineId.medicineName }}</td>
                    <td>{{ sale.customerId.fullName }}</td>
                    <td>{{ sale.quantity }}</td>
                    <td>{{ sale.unitPrice }}</td>
                    <td>{{ sale.totalPayment }}</td>

                </tr>
            </Table>
        </div>
    </div>
</template>
<style scoped></style>
/* Add your custom styles here */ -->
