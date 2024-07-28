<script setup>
import { computed, onMounted, ref } from 'vue';
import BaseHead from '../../../components/BaseHead.vue';
import Table from '../../../components/EasyTable.vue';
import { useCustomersStore } from "../../../store/configuration/customer"
import { storeToRefs } from 'pinia'
import { useSalesStore } from '../../../store/sales/sales';
import { useToast } from "vue-toast-notification"
var { addSale, fetchAllSales, fetchAllMedicine } = useSalesStore()
const salesStore = useSalesStore()
const { sales, medicines, message, hasError, isLoading } = storeToRefs(salesStore)
const customerStore = useCustomersStore()
const { customers } = storeToRefs(customerStore)
const { fetchAllCustomers } = customerStore
const sale = ref({
    currentId: '',
    customerId: '',
    medicineId: '',
    quantity: 0,
    unitPrice: 0,
    paidAmount: '',
})

const getCustomer = async (e) => {
    const result = customers.value.filter((item) => {
        return item._id === e.target.value
    })
    console.log(result[0].fullName)
    customerDetail.value.fullName = result[0].fullName
    customerDetail.value.phone = result[0].phone
    customerDetail.value.tinNumber = result[0].tinNumber
    return result
}
var customerDetail = ref({
    fullName: '',
    phone: '',
    tinNumber: ''
})
const tableHeader = ["No", "product", "customerId", "Qty", "Price", "Total", "Action"]

var showButton = ref(true)
//baseHeade
var open = ref(true)
const displayList = () => open.value = true
const displayShow = () => open.value = false
const pageName = "Sales "
const toast = useToast()
const btn1 = 'create sales'

const createSale = async () => {
    const formData = {
        customerId: customerId.value,
        salesList: salesList.value
    }
    await addSale(formData).then(() => {
        toast.open({
            message: message.value || hasError.value,
            position: "top",
            type: status.value === 201 ? "success" : "error"
        })
    })
}

const isValid = computed(() => {
    return !sale.value.customerId || !sale.value.medicineId || !sale.value.quantity || !sale.value.unitPrice
})
const subtotal = ref(null);
const discountAmount = ref(null);
const total = ref(null);
const calculateTotal = () => {
    subtotal.value = salesList.value.reduce((acc, item) => acc + (item.unitPrice * item.quantity), 0);
    discountAmount.value = (subtotal.value * discount.value) / 100;
    total.value = subtotal.value - discountAmount.value;
};
const discount = ref(0);
const currentDate = new Date().toUTCString().slice(0, 12)
const removeItem = (index) => {
    salesList.value.splice(index, 1);
};
const salesList = ref([]);
const customerId = ref('')
const submitForm = () => {
    const totalPrice = unitPrice.value * quantity.value;

    const initialValues = {
        customerId: sale.value.customerId,
        medicineId: sale.value.medicineId,
        unitPrice: sale.value.unitPrice,
        quantity: sale.value.quantity,
        totalPrice: totalPrice,
        paymentMethod: sale.value.paymentMethod
    }
    const res = salesList.value.some((item) => {
        return item.medicineId == initialValues.medicineId
    })
    if (res) {
        return toast.open({
            message: 'medicine is all ready on list',
            position: 'top',
            type: 'success'
        })

    }
    salesList.value.push(initialValues);
    sale.value = {}
};

const printInvoice = () => {
    window.print();
};
onMounted(() => {
    fetchAllCustomers()
    fetchAllSales()
    fetchAllMedicine()

})
</script>

<template>
    <div>
        <header class="m-2 w-full">
            <BaseHead @show-form="displayShow" button-text="createSales" @show-list="displayList"
                button-text1="salesList" :Header="pageName" />
        </header>
        <div v-if="open" className="w-full flex justify-start px-4 my-3">
            <div className=" flex-grow overflow-auto md:w-3/4 w-3/4">
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
                <Table :headers="tableHeader" class=" mt-2">
                    <tr v-for="(sale, index) in sales" class=" mt-2 bg-none  hover:bg-slate-200">
                        <td>{{ index + 1 }}</td>
                        <td>{{ sale.medicineId.medicineName }}</td>
                        <td>{{ sale.customerId.fullName }}</td>
                        <td>{{ sale.quantity }}</td>
                        <td>{{ sale.unitPrice }}</td>
                        <td>{{ sale.totalPayment }}</td>

                        <td>
                            <a class=" text-center font-medium text-green-400 hover:text-green-700 hover:underline"
                                @click="editSale(sale._id)">Edit</a>
                        </td>
                    </tr>
                </Table>
            </div>
        </div>
        <div v-if="!open" className="flex w-full lg:flex-row md:flex flex-col h-screen text-gray-700">
            <div className="lg:flex-row md:flex sm:flex-col  w-full ">


                <div className="flex w-full flex-grow md:border-r border-gray-300">
                    <div class="flex-grow overflow-auto  md:w-1/2 w-full">

                        <section v-if="salesList.length > 0" className=" bg-slate-50 py-1">
                            <div class="flex mx-2 flex-auto justify-between">
                                <div class="">
                                    <button @click="printInvoice"
                                        class="bg-purple-500 outline outline-offset-2 hover:outline-purple-500 hover:bg-purple-700 text-white px-2 py-1 rounded-md">
                                        Print</button>
                                </div>

                            </div>
                            <div className="max-w-2xl mx-auto py-0 md:py-1">
                                <article className="shadow-none  md:rounded-md overflow-hidden">
                                    <div className="md:rounded-b-md  ">
                                        <div className="p-9 border-b border-gray-200">
                                            <div className="space-y-6">
                                                <div className="flex justify-between items-top">
                                                    <div className="space-y-4">
                                                        <div>
                                                            <img className="h-6 object-cover mb-4"
                                                                src="../../../assets/logo.png" />
                                                            <p className="font-bold text-lg"> Invoice </p>
                                                        </div>
                                                        <div v-for="(sale, index) in salesList" :key="index">
                                                            <p className="font-medium text-sm text-gray-400"> To </p>
                                                            <p> {{ customerId }} </p>
                                                            <p> tony@starkindustriesxyz.com </p>
                                                        </div>
                                                    </div>
                                                    <div className="space-y-2">
                                                        <div>
                                                            <p className="font-medium text-sm text-gray-400"> Invoice
                                                                Number
                                                            </p>
                                                            <p> INV-MJ0001 </p>
                                                        </div>
                                                        <div>
                                                            <p className="font-medium text-sm text-gray-400"> Invoice
                                                                Date
                                                            </p>
                                                            <p> {{ currentDate }} </p>
                                                        </div>
                                                        <div>
                                                            <p className="font-medium text-sm text-gray-400"> ABN </p>
                                                            <p> 57 630 182 446 </p>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="p-1 border-b border-gray-200">
                                            <p className="font-medium text-sm text-gray-400"> Note </p>
                                            <p className="text-sm"> Thank you for your order. </p>
                                        </div>
                                        <table className="w-full divide-y divide-gray-200 text-sm">
                                            <thead>
                                                <tr>
                                                    <th scope="col"
                                                        className="py-2 text-left font-semibold text-gray-400">
                                                        Item </th>

                                                    <th scope="col"
                                                        className="py-2 text-left font-semibold text-gray-400">
                                                        Qty x Amount </th>
                                                    <th scope="col"
                                                        className="py-2 text-left font-semibold text-gray-400">
                                                        Total Price
                                                    </th>
                                                    <th scope="col"
                                                        className="py-2 text-left font-semibold text-gray-400">
                                                        Action
                                                    </th>
                                                </tr>
                                            </thead>
                                            <tbody className="divide-y divide-gray-200">
                                                <tr v-for="(sale, index) in salesList" :key="index">
                                                    <td className=" whitespace-nowrap text-gray-600 truncate">
                                                        {{ sale.medicineId }}

                                                    </td>
                                                    <td className="whitespace-nowrap text-gray-600 truncate">
                                                        {{ sale.quantity }} x {{ sale.unitPrice }}</td>
                                                    <td className="whitespace-nowrap text-gray-600 truncate">
                                                        {{ sale.totalPrice }}</td>

                                                    <td className="whitespace-nowrap ">

                                                        <span class=" font-bold mr-5">
                                                            <icon @click="removeItem"
                                                                class="w-3 px-4 space-x-2.5 text-red-500"
                                                                name="md-deleteforever-outlined" />
                                                        </span>
                                                    </td>
                                                </tr>

                                            </tbody>
                                        </table>
                                        <div className="p-9 border-b border-gray-200">
                                            <div className="space-y-3">
                                                <div className="flex justify-between">
                                                    <div>
                                                        <p className="text-gray-500 text-sm"> Subtotal </p>
                                                    </div>
                                                    <p className="text-gray-500 text-sm"> {{ subtotal }} ETB</p>
                                                </div>
                                                <div className="flex justify-between">
                                                    <div>
                                                        <p className="text-gray-500 text-sm"> Total </p>
                                                    </div>
                                                    <p className="text-gray-500 text-sm"> {{ total }} ETB</p>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="p-9 border-b border-gray-200">
                                            <div className="space-y-3">

                                                <div className="flex justify-between">
                                                    <button @click="calculateTotal"
                                                        class="bg-green-500 text-white px-2 py-1 outline outline-offset-2 hover:outline-green-500 hover:bg-green-700 rounded-md">Calculate
                                                        Total</button>
                                                    <button @click="createSale"
                                                        class="text-white bg-purple-700 hover:bg-purple-800 focus:outline-none focus:ring-4 focus:ring-purple-300 font-medium rounded-full text-sm px-5 py-2.5 text-center mb-2 dark:bg-purple-600 dark:hover:bg-purple-700 dark:focus:ring-purple-900">
                                                        pay</button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </article>
                            </div>
                        </section>

                    </div>

                </div>
            </div>

            <div
                className="flex flex-col md:flex-row sm:flex-row flex-shrink-0 md:w-2/4 lg:w-1/4 sm:w-full w-full py-1 pl-4">
                <div className="flex w-full py-1 border-b border-gray-300 ">
                    <div className="flex flex-col flex-grow mx-2">

                        <form @submit.prevent="submitForm">


                            <div class="flex flex-col px-1 rounded-sm  ">
                                <label class="font-semibold text-slate-600 " for="">Medicine</label>
                                <select id="medicineId"
                                    class="h-8  px-2 py-1 appearance-none border border-slate-300 w-full bg-slate-50 rounded   focus:outline-none focus:ring-0 focus:shadow-none"
                                    v-model="sale.medicineId" @change="select">
                                    <option disabled="true">choose medicine name</option>
                                    <option v-for="item in medicines" :key="item" :value="item._id">{{
                                        item.medicineName }}
                                    </option>
                                </select>
                            </div>

                            <div class="flex flex-col px-1 rounded-sm  ">
                                <label class="font-semibold text-slate-600 " for="">Customer</label>
                                <select id="customerId" :disabled="!sale.medicineId"
                                    class="h-8  px-2 py-1 appearance-none border border-slate-300 w-full bg-slate-50 rounded   focus:outline-none focus:ring-0 focus:shadow-none"
                                    v-model="sale.customerId" @change="getCustomer">
                                    <option disabled="true">choose customer name</option>
                                    <option v-for="item in customers" :key="item.customer" :value="item._id">
                                        {{ item.fullName }}
                                    </option>
                                </select>
                            </div>
                            <FormKit :disabled="!sale.customerId" v-model="sale.unitPrice" id="unitPrice"
                                validation="required|number" type="number" label="Unit price" />
                            <FormKit :disabled="!sale.unitPrice" v-model="sale.quantity" id="quantity"
                                validation="required|number" type="number" label="Quantity" />
                            <div lass="px-1  flex-col  rounded-sm flex " @change="select">
                                <label for="paymentMethod" class="font-semibold text-slate-600 ">Payment Method:</label>
                                <select :disabled="!sale.quantity" id="paymentMethod" v-model="sale.paymentMethod"
                                    required
                                    class="h-8 px-6 py-1 appearance-none border border-slate-300 w-full bg-slate-50 rounded   focus:outline-none focus:ring-0 focus:shadow-none">
                                    <option value="">Select Payment Method</option>
                                    <option value="credit">Credit Card</option>
                                    <option value="debit">Transfer</option>
                                    <option value="cash">Cash</option>
                                </select>
                            </div>

                            <div class="flex mx-2 flex-auto justify-between">

                                <button :disabled="isValid" type="submit"
                                    class="text-white bg-green-700 mt-5 block hover:bg-green-800 focus:outline-none focus:ring-4 focus:ring-green-300 font-medium rounded-full text-sm px-5 py-2.5 text-center mb-2 dark:bg-purple-600 dark:hover:bg-purple-700 dark:focus:ring-purple-900">

                                    Add to List
                                </button>

                            </div>
                        </form>
                    </div>
                </div>
            </div>

        </div>
    </div>
</template>