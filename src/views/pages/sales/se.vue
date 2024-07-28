                                    
<script setup>
import { computed, onMounted, ref } from 'vue';
import BaseHead from '../../../components/BaseHead.vue';
import Table from '../../../components/EasyTable.vue';
import { useCustomersStore } from "../../../store/configuration/customer"
import { storeToRefs } from 'pinia'
import { useSalesStore } from '../../../store/sales/sales';
import { useRouter } from 'vue-router';
const router = useRouter();
var { addSale, fetchAllSales } = useSalesStore()
const salesStore = useSalesStore()
const { sales } = storeToRefs(salesStore)
const customerStore = useCustomersStore()
const { customers } = storeToRefs(customerStore)
const { fetchAllCustomers } = customerStore


function routeToInvoicePage() {
    router.push({ path: "/invoice" })
}
const isValid = computed(() => {
    return !sale.value.customerId || !sale.value.drugId || !sale.value.quantity || !sale.value.unitPrice
})
const select = async (e) => {
    sale.value.currentId = e.target.value
}
const tableHeader = ["No", "product", "customerId", "Qty", "Price", "Total", "Action"]

var showButton = ref(true)
//baseHeade
var open = ref(true)
const displayList = () => open.value = true
const displayShow = () => open.value = false
const pageName = "Sales "

const createSale = async () => {
    const formData = {
        currentId: sale.value.currentId,
        customerId: sale.value.customerId,
        drugId: sale.value.drugId,
        quantity: sale.value.quantity,
        unitPrice: sale.value.unitPrice,
        totalPrice: sale.value.totalPrice,
        totalAmount: sale.value.totalAmount,
        paidAmount: sale.value.paidAmount,

    }
    const res = await addSale(formData)
}

const sale = ref({
    customerId: '',
    drugId: '',
    unitPrice: '',
    quantity: '',
    paymentMethod: '',

})

const removeItem = (index) => {
    salesList.value.splice(index, 1);
};
const salesList = ref([]);
const submitForm = () => {
    const totalPayment = unitPrice.value * quantity.value;
    if (drugId.value && unitPrice.value > 0 && quantity.value > 0)
        salesList.value.push({
            customerId: customerId.value,
            drugId: drugId.value,
            unitPrice: unitPrice.value,
            quantity: quantity.value,
            totalPayment: totalPayment,
            paymentMethod: paymentMethod.value
        });

    customerId.value = '';
    drugId.value = '';
    unitPrice.value = 0;
    quantity.value = 0;
    paymentMethod.value = '';
};
onMounted(() => {
    fetchAllCustomers()
    fetchAllSales()
})
</script>
                                    
<template>
    <div>
        <header>
            <BaseHead @show-form="displayShow" @show-list="displayList" :Header="pageName" />
        </header>
        <div v-if="open" className="w-full flex justify-start px-4 my-3">
            <div className=" flex-grow overflow-auto md:w-3/4 w-3/4">

                <Table :headers="tableHeader" class=" mt-2">
                    <tr v-for="(sale, index) in sales" class=" mt-2 bg-none  hover:bg-slate-200">
                        <td>{{ index + 1 }}</td>
                        <td>{{ sale.drugId }}</td>
                        <td>{{ sale.customerId }}</td>
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
                        <button @click="routeToInvoicePage"
                            class="bg-purple-500 hover:bg-purple-700 py-1 px-2 outline text-white  md:w-36 rounded m-1">Invoice
                        </button>
                        <section v-if="stockList.length > 0" className=" py-2">
                            <div className="max-w-2xl mx-auto py-0 md:py-1">
                                <article className="shadow-none  md:rounded-md overflow-hidden">
                                    <div className="md:rounded-b-md  ">
                                        <div className="p-9 border-b border-gray-200">
                                            <div className="space-y-6">
                                                <div className="flex justify-between items-top">
                                                    <div className="space-y-4">
                                                        <div>
                                                            <img className="h-6 object-cover mb-4"
                                                                src="https://cdn.mjwebs.com/sites/mjwebs/mjwebs-logo.png" />
                                                            <p className="font-bold text-lg"> Invoice </p>
                                                            <p> MJWebs </p>
                                                        </div>
                                                        <div>
                                                            <p className="font-medium text-sm text-gray-400"> Billed To </p>
                                                            <p> Tony Stark </p>
                                                            <p> tony@starkindustriesxyz.com </p>
                                                            <p> (02) 1234 1234 </p>
                                                        </div>
                                                    </div>
                                                    <div className="space-y-2">
                                                        <div>
                                                            <p className="font-medium text-sm text-gray-400"> Invoice Number
                                                            </p>
                                                            <p> INV-MJ0001 </p>
                                                        </div>
                                                        <div>
                                                            <p className="font-medium text-sm text-gray-400"> Invoice Date
                                                            </p>
                                                            <p> 31 December 2021 </p>
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
                                                        className="px-6 py-2 text-left font-semibold text-gray-400">
                                                        Item </th>

                                                    <th scope="col" className="py-2 text-left font-semibold text-gray-400">
                                                        Qty x Amount </th>
                                                    <th scope="col" className="py-2 text-left font-semibold text-gray-400">
                                                        Total Price
                                                    </th>
                                                    <th scope="col" className="py-2 text-left font-semibold text-gray-400">
                                                        Action
                                                    </th>
                                                </tr>
                                            </thead>
                                            <tbody className="divide-y divide-gray-200">
                                                <tr v-for="(stock, index) in stockList" :key="index">
                                                    <td className="px-9 py-2 whitespace-nowrap space-x-1 flex items-center">
                                                        <div>

                                                            <p className="text-sm text-gray-400"> {{ stock.medicineId }}</p>
                                                        </div>
                                                    </td>
                                                    <td className="whitespace-nowrap text-gray-600 truncate"> {{
                                                        stock.quantity
                                                    }} x {{ stock.unitPrice }}</td>
                                                    <td className="whitespace-nowrap text-gray-600 truncate">
                                                        {{ stock.totalPrice }}</td>
                                                    <td className="whitespace-nowrap ">
                                                        <v-icon name="bi-trash" label="remove" />
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <!-- <td className="px-9 py-1 whitespace-nowrap space-x-1 flex items-center">
                                                    <div>
                                                        <p> Pym Particles (Pack of 10,000) </p>
                                                        <p className="text-sm text-gray-400"> Redacted Description </p>
                                                    </div>
                                                </td> -->
                                                    <td className="whitespace-nowrap text-gray-600 truncate"></td>
                                                    <td className="whitespace-nowrap text-gray-600 truncate"></td>
                                                </tr>
                                            </tbody>
                                        </table>
                                        <div className="p-9 border-b border-gray-200">
                                            <div className="space-y-3">
                                                <div className="flex justify-between">
                                                    <div>
                                                        <p className="text-gray-500 text-sm"> Subtotal </p>
                                                    </div>
                                                    <p className="text-gray-500 text-sm"> $660,000.00 </p>
                                                </div>
                                                <div className="flex justify-between">
                                                    <div>
                                                        <p className="text-gray-500 text-sm"> Tax </p>
                                                    </div>
                                                    <p className="text-gray-500 text-sm"> $0.00 </p>
                                                </div>
                                                <div className="flex justify-between">
                                                    <div>
                                                        <p className="text-gray-500 text-sm"> Total </p>
                                                    </div>
                                                    <p className="text-gray-500 text-sm"> $660,000.00 </p>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="p-9 border-b border-gray-200">
                                            <div className="space-y-3">
                                                <div className="flex justify-between">
                                                    <button @click="createStock"
                                                        class="text-white bg-purple-700 hover:bg-purple-800 focus:outline-none focus:ring-4 focus:ring-purple-300 font-medium rounded-full text-sm px-5 py-2.5 text-center mb-2 dark:bg-purple-600 dark:hover:bg-purple-700 dark:focus:ring-purple-900">
                                                        pay</button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </article>
                            </div>
                        </section>
                        <table v-if="salesList.length > 0" class="w-full   border border-gray-300">
                            <thead class="text-xs  text-gray-700 uppercase bg-gray-50 dark:text-gray-400">
                                <tr>
                                    <th>Customer ID</th>
                                    <th>Drug ID</th>
                                    <th>Unit Price</th>
                                    <th>Quantity</th>
                                    <th>Total Payment</th>
                                    <th>Payment Method</th>
                                    <th>Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr v-for="(sale, index) in salesList" :key="index">
                                    <td>{{ sale.customerId }}</td>
                                    <td>{{ sale.drugId }}</td>
                                    <td>{{ sale.unitPrice }}</td>
                                    <td>{{ sale.quantity }}</td>
                                    <td>{{ sale.totalPayment }}</td>
                                    <td>{{ sale.paymentMethod }}</td>
                                    <td> <button @click="removeItem(index)" class="text-red-500 ml-2">Remove</button>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                        <div class="flex  justify-end px-4">
                            <button :disabled="isValid" v-if="showButton" @click="createSale"
                                class="bg-blue-500 mt-4 w-full outline outline-offset-2 outline-blue-500 mb-2 hover:bg-blue-700 md:w-36  px-2 text-white font-semibold rounded-lg  py-2 ">
                                pay
                            </button>
                        </div>
                    </div>

                </div>
            </div>

            <div className="flex flex-col md:flex-row sm:flex-row flex-shrink-0 md:w-1/4 w-full py-1 pl-4">
                <div className="flex w-full py-1 border-b border-gray-300 ">
                    <div className="flex flex-col flex-grow mx-2">

                        <form @submit.prevent="submitForm">

                            <div class="px-1  flex-col  rounded-sm flex " @change="select">
                                <label class="font-semibold text-slate-600 ">drug</label>
                                <select id="drugId"
                                    class="appearance-none border border-slate-300 w-full bg-slate-50 rounded   focus:outline-none focus:ring-0 focus:shadow-none"
                                    v-model="sale.drugId">
                                    <option disabled="true">choose drug name</option>
                                    <option>sample</option>
                                    <option v-for="item in drugs" :key="item" :value="item._Id">{{ item.drug }}
                                    </option>
                                </select>
                            </div>
                            <div class="flex flex-col px-1 rounded-sm  " @change="select">
                                <label class="font-semibold text-slate-600 ">customer</label>
                                <select id="customerId"
                                    class="appearance-none border border-slate-300 w-full bg-slate-50 rounded  text-black focus:outline-none focus:ring-0 focus:shadow-none"
                                    v-model="sale.customerId">
                                    <option disabled="true">choose customer name</option>

                                    <option v-for="item in customers" :key="item.customer" :value="item._id">
                                        {{ item.customer }}
                                    </option>
                                </select>
                            </div>
                            <FormKit v-model="sale.unitPrice" id="unitPrice" validation="required|number" type="number"
                                label="Unit price" />
                            <FormKit v-model="sale.quantity" id="quantity" validation="required|number" type="number"
                                label="Quantity" />
                            <div lass="px-1  flex-col  rounded-sm flex " @change="select">
                                <label for="paymentMethod" class="font-semibold text-slate-600 ">Payment Method:</label>
                                <select id="paymentMethod" v-model="sale.paymentMethod" required
                                    class="appearance-none border border-slate-300 w-full bg-slate-50 rounded   focus:outline-none focus:ring-0 focus:shadow-none">
                                    <option value="">Select Payment Method</option>
                                    <option value="credit">Credit Card</option>
                                    <option value="debit">Transfer</option>
                                    <option value="cash">Cash</option>
                                </select>
                            </div>
                            <button type="submit"
                                class="bg-green-500 outline outline-offset-2 outline-green-500 mt-5 block hover:bg-green-700 md:w-36  text-white font-semibold rounded-lg px-2 py-2 ">
                                Add to List
                            </button>
                        </form>
                    </div>
                </div>
            </div>

        </div>
    </div>
    <!-- </div> -->
</template>


  