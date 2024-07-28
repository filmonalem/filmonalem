<!-- <script setup>
import { ref, computed, watchEffect, onMounted } from 'vue';
import BaseHead from '../../../components/BaseHead.vue';
import Table from '../../../components/EasyTable.vue';
import { useSalesStore } from '../../../store/sales/sales';
const salesStore = useSalesStore();
const currentDate = ref(getFormattedDate(new Date()));
const pageName = "Daily Sales Report"
const dailySales = computed(() => {
    return salesStore.dailySalesData.filter(sale => sale.date === currentDate.value);
});
const tableHeader = ["No", "product", "customerId", "Qty", "Price", "Total", "Action"]

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
    salesStore.fetchDailySales();
});
</script>
<template>
    <div>
        <header class="ml-2">
            <BaseHead :Header="pageName" />
        </header>

        <p class="text-gray-600 mb-4">Date: {{ currentDate }}</p>
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
</template> -->
<template>
    <div>
        <!-- Input field to enter the original date -->
        <label for="original-date">Enter Date:</label>
        <input type="date" id="original-date" v-model="originalDate" @change="calculateExpiryDate" />

        <!-- Table to display the calculated expiry date -->
        <table>
            <thead>
                <tr>
                    <th>Original Date</th>
                    <th>Expiry Date (6 months earlier)</th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td>{{ originalDate }}</td>
                    <td>{{ expiryDate }}</td>
                </tr>
            </tbody>
        </table>
    </div>
</template>

<script setup>
import { ref } from 'vue';

// Define reactive variables to hold the original date and calculated expiry date
const originalDate = ref('');
const expiryDate = ref('');

// Function to calculate the expiry date
const calculateExpiryDate = () => {
    if (originalDate.value) {
        const date = new Date(originalDate.value);
        date.setMonth(date.getMonth() - 6); // Subtract 6 months
        // Format the date as YYYY-MM-DD
        expiryDate.value = date.toISOString().split('T')[0];
    } else {
        expiryDate.value = ''; // Clear the expiry date if there's no original date
    }
};
</script>