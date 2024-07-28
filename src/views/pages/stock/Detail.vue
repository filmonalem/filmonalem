<script setup>
import { ref, computed, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import Table from '../../../components/EasyTable.vue';

import BaseHead from '../../../components/BaseHead.vue';
const router = useRouter();
const route = router.currentRoute;
function routeToStocksPage() {
    router.push({ path: "/:stocks/stock-page" })
}


const supplierId = route.value.query.supplierId
const medicineId = route.value.query.medicineId
const invoiceNumber = route.value.query.invoiceNumber
const quantity = route.value.query.quantity
const unitPrice = route.value.query.unitPrice
const totalPrice = route.value.query.totalPrice
const produceDate = route.value.query.produceDate
const expiryDate = route.value.query.expiryDate
const shelf = route.value.query.shelf
const status = route.value.query.status
const tableHeader = ["No", "invoiceNo", 'supplierID',
    'medicineName',
    "qty", "unitPrice",
    "totalPrice",
    'produceDate',
    'expiryDate',
    "shelf",
    "status",
];
const pageName = " stock Details"
const index = 0
onMounted(() => {
});
</script>
<template>
    <div>
        <header class=" ">
            <BaseHead :Header="pageName" />
        </header>
        <div className=" relative flex justify-end m-1 my-3">
            <div className=" flex-col  w-full">
                <div class="flex justify-end ">
                    <button @click="routeToStocksPage"
                        class="bg-slate-400 outline outline-offset-2 hover:outline-gray-500  hover:bg-gray-700 py-1 px-1  text-white   rounded ">
                        <span class=" font-bold mr-5">
                            <icon class="w-3 px-4 space-x-2.5 text-gray-200" name="ri-arrow-go-back-fill" />
                        </span>
                    </button>
                </div>
                <div class="w-full absolute">
                    <!-- 
                    <Table :headers="tableHeader" class=" mt-2">
                        <tr>
                            <td>{{ index + 1 }}</td>
                            <td>{{ invoiceNumber }}</td>
                            <td>{{ supplierId }}</td>
                            <td>{{ medicineId }}</td>
                            <td>{{ quantity }} </td>
                            <td>{{ unitPrice }}</td>
                            <td>{{ totalPrice }}</td>
                            <td>{{ produceDate }}</td>
                            <td>{{ expiryDate }}</td>
                            <td>{{ shelf }}</td>
                            <td>{{ status }}</td>
                        </tr>
                    </Table> -->

                    <section class="  border-r px-4 py-2 w-1/2 rounded-md">
                        <ul class="max-w-md divide-y   divide-gray-200 dark:divide-gray-700">
                            <li class="pb-3 sm:pb-4">
                                <div class="flex items-center space-x-4 rtl:space-x-reverse">
                                    <div class="flex min-w-0 ">
                                        <hr>
                                        <p class="text-sm font-medium text-gray-900 truncate dark:text-white">
                                            {{ index + 1 }}
                                        </p>
                                    </div>
                                    <div class="flex min-w-0">
                                        <p class="text-sm font-medium text-gray-900 truncate dark:text-white">
                                            invoice Number -
                                        </p>
                                    </div>
                                    <div
                                        class="flex items-center text-base font-semibold text-gray-900 dark:text-white">
                                        {{ invoiceNumber }}
                                    </div>
                                </div>
                            </li>
                            <li class=" pb-0 sm:pt-4">
                                <div class="flex items-center space-x-4 rtl:space-x-reverse">
                                    <div class="flex min-w-0">
                                        <p class="text-sm font-medium text-gray-900 truncate dark:text-white">
                                            2
                                        </p>
                                    </div>

                                    <div class="flex min-w-0">
                                        <p class="text-sm font-medium text-gray-900 truncate dark:text-white">
                                            Supplier Name -
                                        </p>
                                    </div>
                                    <div
                                        class="flex items-center text-base font-semibold text-gray-900 dark:text-white">
                                        {{ supplierId }}
                                    </div>
                                </div>
                            </li>
                            <li class="pt-3 pb-0 sm:pt-4">
                                <div class="flex items-center space-x-4 rtl:space-x-reverse">
                                    <div class="flex min-w-0">
                                        <p class="text-sm font-medium text-gray-900 truncate dark:text-white">
                                            3
                                        </p>
                                    </div>

                                    <div class="flex min-w-0">
                                        <p class="text-sm font-medium text-gray-900 truncate dark:text-white">
                                            Medicine Name -
                                        </p>
                                    </div>
                                    <div
                                        class="flex items-center text-base font-semibold text-gray-900 dark:text-white">
                                        {{ medicineId }} </div>
                                </div>
                            </li>
                            <li class="pt-3 pb-0 sm:pt-4">
                                <div class="flex items-center space-x-4 rtl:space-x-reverse">
                                    <div class="flex min-w-0">
                                        <p class="text-sm font-medium text-gray-900 truncate dark:text-white">
                                            4
                                        </p>
                                    </div>
                                    <div class="flex min-w-0">
                                        <p class="text-sm font-medium text-gray-900 truncate dark:text-white">
                                            Quantity -
                                        </p>
                                    </div>
                                    <div
                                        class="flex items-center text-base font-semibold text-gray-900 dark:text-white">
                                        {{ quantity }}
                                    </div>
                                </div>
                            </li>
                            <li class="pt-3 pb-0 sm:pt-4">
                                <div class="flex items-center space-x-4 rtl:space-x-reverse">
                                    <div class="flex min-w-0">
                                        <p class="text-sm font-medium text-gray-900 truncate dark:text-white">
                                            5
                                        </p>
                                    </div>
                                    <div class="flex min-w-0">
                                        <p class="text-sm font-medium text-gray-900 truncate dark:text-white">
                                            Unit Price -
                                        </p>
                                    </div>
                                    <div
                                        class="flex items-center text-base font-semibold text-gray-900 dark:text-white">
                                        {{ unitPrice }}
                                    </div>
                                </div>

                            </li>
                            <li class="pt-3 pb-0 sm:pt-4">
                                <div class="flex items-center space-x-4 rtl:space-x-reverse">
                                    <div class="flex min-w-0">
                                        <p class="text-sm font-medium text-gray-900 truncate dark:text-white">
                                            6
                                        </p>
                                    </div>
                                    <div class="flex min-w-0">
                                        <p class="text-sm font-medium text-gray-900 truncate dark:text-white">
                                            Total Price -</p>
                                    </div>
                                    <div
                                        class="flex items-center text-base font-semibold text-gray-900 dark:text-white">
                                        {{ totalPrice }}
                                    </div>
                                </div>

                            </li>
                            <li class="pt-3 pb-0 sm:pt-4">
                                <div class="flex items-center space-x-4 rtl:space-x-reverse">
                                    <div class="flex min-w-0">
                                        <p class="text-sm font-medium text-gray-900 truncate dark:text-white">
                                            7
                                        </p>
                                    </div>
                                    <div class="flex min-w-0">
                                        <p class="text-sm font-medium text-gray-900 truncate dark:text-white">
                                            Produce Date -</p>
                                    </div>
                                    <div
                                        class="flex items-center text-base font-semibold text-gray-900 dark:text-white">
                                        {{ (produceDate).slice(0, 10) }}
                                    </div>
                                </div>

                            </li>
                            <li class="pt-3 pb-0 sm:pt-4">
                                <div class="flex items-center space-x-4 rtl:space-x-reverse">
                                    <div class="flex min-w-0">
                                        <p class="text-sm font-medium text-gray-900 truncate dark:text-white">
                                            8
                                        </p>
                                    </div>
                                    <div class="flex min-w-0">
                                        <p class="text-sm font-medium text-gray-900 truncate dark:text-white">
                                            Expiry Date -</p>
                                    </div>
                                    <div
                                        class="flex items-center text-base font-semibold text-gray-900 dark:text-white">
                                        {{ (expiryDate).slice(0, 10) }}
                                    </div>
                                </div>

                            </li>
                            <li class="pt-3 pb-0 sm:pt-4">
                                <div class="flex items-center space-x-4 rtl:space-x-reverse">
                                    <div class="flex min-w-0">
                                        <p class="text-sm font-medium text-gray-900 truncate dark:text-white">
                                            9
                                        </p>
                                    </div>
                                    <div class="flex min-w-0">
                                        <p class="text-sm font-medium text-gray-900 truncate dark:text-white">
                                            Shelf -</p>
                                    </div>
                                    <div
                                        class="flex items-center text-base font-semibold text-gray-900 dark:text-white">
                                        {{ shelf }}
                                    </div>
                                </div>

                            </li>

                        </ul>

                    </section>
                </div>
            </div>
        </div>
    </div>
</template>

<style scoped>
.disabled-button {
    background-color: gray;
    color: white;
    outline-color: none;
}
</style>
