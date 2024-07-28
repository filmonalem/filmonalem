<script setup>
import { ref, computed, watchEffect, onMounted } from 'vue';
import BaseHead from '../../../components/BaseHead.vue';
import Table from '../../../components/EasyTable.vue';
import { usePurchaseStore } from "../../../store/stock/stock"
import { storeToRefs } from "pinia";
const stock_store = usePurchaseStore()
const { stocks } = storeToRefs(stock_store)
var { fetchBalanceStock } = usePurchaseStore()

const pageName = "Stock Balance "

const tableHeader = ["No",
    'medicineName',
    "totalQuantity",
    "averagePrice",
    "totalPrice",

    "Action"];

onMounted(() => {
    fetchBalanceStock();
});
</script>
<template>
    <div>
        <header class=" ">
            <BaseHead :Header="pageName" />
        </header>
        <div className=" relative flex justify-end m-1 my-3">
            <div className=" flex-col  w-full">
                <div class="relative w-1/3 mb-4 ml-4">
                    <div class="absolute inset-y-0 start-0 flex items-center ps-3.5 pointer-events-none">
                        <svg class="w-4 h-4 text-gray-500 dark:text-gray-400" aria-hidden="true"
                            xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                            <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z" />
                        </svg>
                    </div>
                    <input type="text" v-model="searchInput" placeholder="search..." @click="filterData" class="bg-gray-50   border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-gray-500 focus:border-gray-500 block w-full ps-10 p-2.5 
                         dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-gray-500
                          dark:focus:border-gray-500" />
                </div>
                <div class="w-full absolute">
                    <Table :headers="tableHeader" class=" mt-2">
                        <tr v-for="(stock, index) in stocks" class=" mt-2 bg-none  hover:bg-slate-200">
                            <td>{{ index + 1 }}</td>
                            <td>{{ stock._id.medicineId }}</td>
                            <td>{{ stock.totalQuantity }}</td>
                            <td>{{ stock.averagePrice }}</td>
                            <td>{{ stock.totalPrice }}</td>
                            <td>

                                <span class=" font-bold mr-5">
                                    <icon @click="removeItem" class="w-3 px-4 space-x-2.5 text-blue-800"
                                        name="pr-send" />
                                </span>

                            </td>
                        </tr>
                    </Table>
                </div>
            </div>
        </div>
    </div>
</template>