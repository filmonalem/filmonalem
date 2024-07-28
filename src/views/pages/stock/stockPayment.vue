<script setup>
import { ref, computed, onMounted } from 'vue';
import BaseHead from '../../../components/BaseHead.vue';
import Table from '../../../components/EasyTable.vue';
import { useStockPaymentStore } from '../../../store/stock/stock.payment'
import { storeToRefs } from "pinia";
import { useToast } from "vue-toast-notification"

const stock_store = useStockPaymentStore()
const toast = useToast()
var { fetchAllStockPaymentList, fetchStockDetails, addPayment } = useStockPaymentStore()
const { purchases, message, hasError, status, purchase } = storeToRefs(stock_store)

const tableHeader = ["No", "invoiceOrder",
    'supplierId',
    'total',
    "paid",
    "credit",
    "status",
    "Action"];
const amountPayed = ref()

const payedBy = ref()
const pageName = " stock payment"
const isPopupOpen = ref(false);

const currentId = ref()
const invoiceOrder = ref()
const isValid = computed(() => { return !amountPayed.value || !payedBy.value })
const openPopup = (item) => {
    isPopupOpen.value = true;
    currentId.value = item._id;
    invoiceOrder.value = item.invoiceOrder;
};
const closePopup = () => {
    isPopupOpen.value = false;
};
const isOpen = ref(false)
const getDetail = (item) => {
    currentId.value = item._id
    isOpen.value = true;
    invoiceOrder.value = invoiceOrder.value
}
const closeDetail = () => {
    isOpen.value = false
}
const createPayment = async () => {
    const formData = {

        id: currentId.value,
        amountPayed: amountPayed.value,
        invoiceOrder: invoiceOrder.value,
        payedBy: payedBy.value,
    }
    await addPayment(formData).then(() => {
        toast.open({
            message: message.value || hasError.value,
            position: "top",
            type: status.value === 201 ? "success" : "error"
        })

    })

    formData.value = {}


}
onMounted(() => {
    fetchAllStockPaymentList()
    fetchStockDetails()
})
</script>
<template>
    <div>
        <header class=" ">
            <BaseHead :Header="pageName" />
        </header>
        <div className=" relative flex justify-end m-1 my-3">
            <div className=" flex-col  w-full">

                <div class="w-full absolute">
                    <Table :headers="tableHeader" class=" mt-2">
                        <tr v-for="(item, index) in purchases" :key="index" class=" mt-2 bg-none  hover:bg-slate-200">
                            <td>{{ index + 1 }}</td>
                            <td>{{ item.invoiceOrder }}</td>
                            <td>{{ item.supplierId.fullName }}</td>
                            <td>{{ item.totalAmount }}</td>
                            <td>{{ item.paidAmount }}</td>
                            <td>{{ item.creditAmount }}</td>
                            <td>
                                <span
                                    :class="{ 'text-green-500': item.status === 'cash', 'text-red-500': item.status === 'credit' }">
                                    {{ item.status }}
                                </span>
                            </td>

                            <td>

                                <span class=" font-bold mr-5">
                                    <icon @click="getDetail(item)" class="w-3 px-4 space-x-2.5 text-blue-500"
                                        name="bi-list-ul" />
                                </span>
                                <span class=" font-bold mr-5" v-if="item.status === 'credit'">
                                    <icon @click="openPopup(item)" class="w-3  px-4 space-x-2.5 text-green-500"
                                        name="co-amazon-pay" />
                                </span>


                            </td>
                        </tr>
                    </Table>
                </div>
            </div>
        </div>
        <div v-if="isPopupOpen" class="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50">
            <div class="relative p-4 w-full max-w-md max-h-full">
                <!-- Modal content -->
                <div class="relative bg-white rounded-lg shadow dark:bg-gray-700">
                    <!-- Modal header -->
                    <div class="flex items-center justify-between p-4 md:p-5 border-b rounded-t dark:border-gray-600">
                        <h3 class="text-xl font-semibold text-gray-900 dark:text-white">
                            Stock Payment </h3>
                        <button type="button" @click="closePopup"
                            class="end-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
                            data-modal-hide="authentication-modal">
                            <svg class="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none"
                                viewBox="0 0 14 14">
                                <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"
                                    stroke-width="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6" />
                            </svg>
                            <span class="sr-only">Close modal</span>
                        </button>
                    </div>
                    <!-- Modal body -->
                    <div class="bg-white p-8 rounded shadow-lg">
                        <div class="mb-4">
                            <label for="amountPayed" class="block text-sm font-medium text-gray-700">Amount
                                Paid:</label>
                            <input v-model="amountPayed" type="number" id="amountPayed" name="amountPayed"
                                class="h-8 px-6 py-1 appearance-none border border-slate-300 w-full bg-slate-50 rounded   focus:outline-none focus:ring-0 focus:shadow-none">
                        </div>



                        <div class="mb-4">
                            <label for="payedBy" class="block text-sm font-medium text-gray-700">PaidBy:</label>
                            <input v-model="payedBy" :disabled="!amountPayed" type="text" id="payedBy" name="payedBy"
                                class="h-8 px-6 py-1 appearance-none border border-slate-300 w-full bg-slate-50 rounded   focus:outline-none focus:ring-0 focus:shadow-none">
                        </div>


                        <div class="flex justify-between">
                            <button @click="closePopup"
                                class="text-white bg-gray-500 hover:bg-gray-800 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded text-sm px-3 py-2 text-center mb-2 dark:bg-gray-600 dark:hover:bg-gray-700 dark:focus:ring-gray-900">Cancel</button>
                            <button @click="createPayment" :disabled="isValid" :class="{ 'disabled-button': isValid }"
                                class="text-white bg-purple-700 hover:bg-purple-800 focus:outline-none focus:ring-4 focus:ring-purple-300 font-medium rounded text-sm px-3 py-2 text-center mb-2 dark:bg-purple-600 dark:hover:bg-purple-700 dark:focus:ring-purple-900">
                                submit</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <!--popup for details-->
        <div v-if="isOpen" class="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50">
            <div class="relative p-2 w-full max-w-xl max-h-full">
                <!-- Modal content -->
                <div class="relative bg-white rounded-lg shadow dark:bg-gray-700">
                    <!-- Modal header -->
                    <div class="flex items-center justify-between p-4 md:p-5 border-b rounded-t dark:border-gray-600">
                        <h3 class="text-xl font-semibold text-gray-900 dark:text-white">
                            Details </h3>
                        <button type="button" @click="closeDetail"
                            class="end-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
                            data-modal-hide="authentication-modal">
                            <svg class="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none"
                                viewBox="0 0 14 14">
                                <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"
                                    stroke-width="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6" />
                            </svg>
                            <span class="sr-only">Close modal</span>
                        </button>
                    </div>
                    <!-- Modal body -->
                    <div class="bg-white p-8 rounded shadow-lg">
                        <Table :headers="tableHeader" class=" mt-2">
                            <tr v-for="(item) in purchase" class=" mt-2 bg-none  hover:bg-slate-200">
                                <td>{{ item.invoiceOrder }}</td>
                                <td>{{ item.supplierId.fullName }}</td>
                                <td>{{ item.totalAmount }}</td>
                                <td>{{ item.paidAmount }}</td>
                                <td>{{ item.creditAmount }}</td>
                                <td>{{ item.status }}</td>

                            </tr>
                        </Table>



                    </div>
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
