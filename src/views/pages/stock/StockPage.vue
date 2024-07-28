<script setup>
import BaseHead from '../../../components/BaseHead.vue';
import Table from '../../../components/EasyTable.vue';
import { useToast } from "vue-toast-notification"
import { onMounted, ref, computed, watch } from 'vue'
import { useSupplierStore } from "../../../store/stock/supplier"
import { storeToRefs } from "pinia";
import { usePurchaseStore } from "../../../store/stock/stock"
import { useRouter } from 'vue-router'
const stock_store = usePurchaseStore()
const supplier_store = useSupplierStore()
var { addStock, fetchAllStocks, fetchAllMedicines } = usePurchaseStore()
const { purchases, message, hasError, status, medicines } = storeToRefs(stock_store)
const { suppliers } = storeToRefs(supplier_store)
const { fetchAllSuppliers } = supplier_store
const toast = useToast()
const router = useRouter();

function routeToDetailsPage(item) {
    router.push({
        path: "/:stocks/stock-detail",
        params: {
            stockId: item._id,
        },
        query: {
            supplierId: item.supplierId.fullName,
            medicineId: item.medicineId.medicineName,
            invoiceNumber: item.invoiceNumber,
            quantity: item.quantity,
            unitPrice: item.unitPrice,
            totalPrice: item.totalPrice,
            produceDate: item.produceDate,
            expiryDate: item.expiryDate,
            shelf: item.shelf,
            status: item.paymentStatus
        }
    })
}
const tableHeader = ["No", 'supplierID',
    'medicine',
    "qty X Price ",
    "total",
    'produceDate',
    'expiryDate',
    "status",
    "action"
];

const stock = ref({
    currentId: '',
    supplierId: '',
    medicineId: '',
    batchNo: '',
    shelf: '',
    produceDate: '',
    expiryDate: '',
    paidAmount: 0,
    quantity: 0,
    unitPrice: 0,
})
var showButton = ref(true)
//baseHeade
var open = ref(true)
const displayList = () => open.value = true
const displayShow = () => open.value = false
const pageName = "Stock "
const subtotal = ref(0);
const credit = ref(0)
const total = ref(0);
const calculateTotal = () => {
    subtotal.value = stocksList.value.reduce((acc, product) => acc + (product.unitPrice * product.quantity), 0);
    total.value = subtotal.value;
    credit.value = (total.value - stock.value.paidAmount), 0;

};
const isValid = computed(() => {
    return !stock.value.batchNo || !stock.value.expiryDate || !stock.value.medicineId || !stock.value.produceDate || !stock.value.quantity || !stock.value.shelf || !stock.value.unitPrice
})
const getSupplier = async (e) => {
    const res = suppliers.value.filter((item) => {
        return item._id === e.target.value
    })
    supplierDetail.value.fullName = res[0].fullName
    supplierDetail.value.phone = res[0].phone
}
var supplierDetail = ref({
    fullName: '',
    phone: '',
})




const getMedicine = async (e) => {
    const res = medicines.value.filter((item) => {
        return item._id === e.target.value
    })
    medicineDetail.value.medicineName = res[0].medicineName
    medicineDetail.value.genericName = res[0].genericName
    medicineDetail.value.dosageForm = res[0].dosageForm
    medicineDetail.value.unit = res[0].unit
    medicineDetail.value.brand = res[0].brand
    const unitForm = ref('')
    unitForm.value = medicineDetail.unit
    const dosageFormField = ref('')
    dosageFormField.value = medicineDetail.dosageForm
    return res
}

var medicineDetail = ref({
    medicineName: '',
    unit: '',
    dosageForm: '',
    genericName: '',
    brand: ''
})
const stocksList = ref([]);

const currentDate = new Date().toUTCString().slice(0, 12)
const removeItem = (index) => {
    stocksList.value.splice(index, 1);
};
const supplierId = ref('')
const paymentStatus = ref('')
//display to invoice
const submitForm = () => {
    const totalPrice = stock.value.unitPrice * stock.value.quantity;

    const initialValues = {
        medicineId: stock.value.medicineId,
        medicineName: medicineDetail.value.medicineName,
        unit: medicineDetail.value.unit,
        batchNo: stock.value.batchNo,
        produceDate: stock.value.produceDate,
        expiryDate: stock.value.expiryDate,
        shelf: stock.value.shelf,
        unitPrice: stock.value.unitPrice,
        quantity: stock.value.quantity,
        totalPrice: totalPrice,
    }
    const res = stocksList.value.some((item) => {
        return item.medicineId == initialValues.medicineId
    })
    if (res) {
        return toast.open({
            message: 'medicine is all ready on list',
            position: 'top',
            type: 'success'
        })

    }
    stocksList.value.push(initialValues);
    stock.value = {}
};

// const getTotal = computed(() => {
//     const prices = purchases?.value.map((item) => item.totalPrice);  // Extract all prices
//     return prices.reduce((sum, price) => sum + price, 0);  // Accumulate prices
// });
console.log(purchases.value);
// const getTotal = computed(() => {
//     let total = 0; // Initialize a variable to store the sum
//     purchases.value.forEach((item) => {
//         total += item.totalPrice; // Add the total price of each item
//     });
//     return total; // Return the total sum
// });
const createStock = async () => {
    const formData = {
        supplierId: supplierId.value,
        products: stocksList.value,
        paymentStatus: paymentStatus.value,
        paidAmount: stock.value.paidAmount
    }
    await addStock(formData).then(() => {
        toast.open({
            message: message.value || hasError.value,
            position: "top",
            type: status.value === 201 ? "success" : "error"
        })
    })

    formData.value = {}
    supplierDetail.value = {}
    medicineDetail.value = {}
    stocksList.value = {}
}

const select = async (e) => {
    stock.value.currentId = e.target.value
}

let searchInput = ref("")


const formatDate = (dateString) => {
    const date = new Date(dateString);
    const day = date.getDate();
    const month = date.getMonth() + 1;
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
}
onMounted(() => {
    fetchAllMedicines()
    fetchAllSuppliers()
    fetchAllStocks()
})
</script>

<template>
    <div>
        <header class=" ">
            <BaseHead @show-form="displayShow" button-text="create-stock" @show-list="displayList" :Header="pageName"
                button-text1="stock-list" />
        </header>

        <div v-if="open" className=" relative flex justify-end m-1 my-3">

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
                <div class="flex mt-2 font-semibold text-center text-gray-500 w-1/5 mx-5 ">
                    <p class="text-nowrap"> Total Price:{{ getTotal }}</p>
                </div>
                <div class="w-full absolute">
                    <Table :headers="tableHeader" class=" mt-2">
                        <tr v-for="(item, index) in purchases"
                            class=" mt-2 bg-none  hover:bg-slate-200 overflow-x-auto">
                            <td>{{ index + 1 }}</td>
                            <td>{{ item.supplierId.fullName }}({{ item.supplierId.phone }})</td>
                            <td>{{ item.medicineId.medicineName }}</td>
                            <td>{{ item.quantity }} X {{ item.unitPrice }}</td>
                            <td>{{ item.totalPrice }}</td>
                            <td>{{ formatDate(item.produceDate) }}</td>
                            <td>{{ formatDate(item.expiryDate) }}</td>
                            <td><span
                                    :class="{ 'text-green-500': item.paymentStatus === 'cash', 'text-red-500': item.paymentStatus === 'credit' }">
                                    {{ item.paymentStatus }}
                                </span>
                            </td>
                            <td> <span class=" font-bold mr-5">
                                    <icon @click="routeToDetailsPage(item)" class="w-3 px-4 space-x-2.5 text-blue-500"
                                        name="bi-list-ul" />
                                </span></td>


                        </tr>
                    </Table>

                </div>
            </div>
        </div>
        <div v-if="!open" className="flex w-full lg:flex-row md:flex flex-col h-screen text-gray-700">

            <div
                className="flex justify-start flex-col md:flex-row  flex-shrink-0 md:w-2/4 lg:w-2/4 sm:w-full w-full py-1 pl-4">
                <div className="flex w-full py-1 border-r border-gray-300 ">
                    <div className="flex flex-col flex-grow mx-2">


                        <form class="grid grid-cols-2 gap-2" @submit.prevent="submitForm">
                            <div class="flex flex-col px-1 rounded-sm  ">
                                <label class="font-semibold text-slate-600 " for="">Supplier</label>
                                <select
                                    class="h-8  px-2 py-1 appearance-none border border-slate-300 w-full bg-slate-50 rounded   focus:outline-none focus:ring-0 focus:shadow-none"
                                    v-model="supplierId" @change="getSupplier">
                                    <option disabled="true">choose supplier name</option>
                                    <option v-for="item in suppliers" :key="item" :value="item._id">{{ item.fullName }}
                                    </option>
                                </select>
                            </div>
                            <div class="flex flex-col px-1 rounded-sm  ">
                                <label class="font-semibold text-slate-600 " for="">Medicine</label>
                                <select id="medicineId" :disabled="!supplierId"
                                    class="h-8  px-2 py-1 appearance-none border border-slate-300 w-full bg-slate-50 rounded   focus:outline-none focus:ring-0 focus:shadow-none"
                                    v-model="stock.medicineId" @change="getMedicine">
                                    <option disabled="true">choose medicine name</option>
                                    <option v-for="item in medicines" :key="item" :value="item._id">{{
                                        item.medicineName }}
                                    </option>
                                </select>
                            </div>
                            <div>
                                <label class="font-semibold text-slate-600 " for="">Medicine Unit</label>
                                <input class=" appearance-none h-8 px-2 py-1 border border-slate-300 w-full bg-slate-50
                                rounded focus:outline-none focus:ring-0 focus:shadow-none" :disabled="true"
                                    :value="medicineDetail.unit" type="text" />
                            </div>
                            <div>
                                <label class="font-semibold text-slate-600 " for="">Medicine Brand</label>
                                <input class=" appearance-none h-8 px-2 py-1 border border-slate-300 w-full bg-slate-50
                                    rounded focus:outline-none focus:ring-0 focus:shadow-none" :disabled="true"
                                    :value="medicineDetail.brand" type="text" />
                            </div>
                            <div>
                                <label class="font-semibold text-slate-600 " for="">Medicine Dosage</label>
                                <input class=" appearance-none h-8 px-2 py-1 border border-slate-300 w-full bg-slate-50
                                    rounded focus:outline-none focus:ring-0 focus:shadow-none" :disabled="true"
                                    :value="medicineDetail.dosageForm" type="text" />
                            </div>
                            <FormKit :disabled="!stock.medicineId" v-model="stock.batchNo" validation="required"
                                type="number" label="Batch Number" />

                            <FormKit :disabled="!stock.batchNo" v-model="stock.produceDate" validation="required"
                                type="date" label="Produce Date" />
                            <FormKit :disabled="!stock.produceDate" v-model="stock.expiryDate" validation="required"
                                type="date" label="expiryDate" />
                            <FormKit :disabled="!stock.expiryDate" v-model="stock.quantity" validation="required"
                                type="number" label="Quantity" />
                            <FormKit :disabled="!stock.quantity" v-model="stock.unitPrice" validation="required"
                                type="number" label="Unit Price" />

                            <FormKit :disabled="!stock.unitPrice" v-model="stock.shelf" validation="required"
                                type="number" label="Shelf" />

                            <div class="flex mx-2 flex-auto justify-between">
                                <button type="submit" :disabled="isValid" :class="{ 'disabled-button': isValid }"
                                    class="text-white text-nowrap bg-green-700 mt-5 block hover:bg-green-800 focus:outline-none focus:ring-4 focus:ring-green-300 font-medium rounded-full text-sm px-5 py-2.5 text-center mb-2 dark:bg-purple-600 dark:hover:bg-purple-700 dark:focus:ring-purple-900">

                                    Add to List
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
            <div className="lg:flex-row md:flex sm:flex-col  w-full ">

                <div className="flex justify-end w-full flex-grow md:border-r border-gray-300">
                    <div class="flex-grow overflow-auto  md:w-1/2 w-full">

                        <section v-if="stocksList.length > 0" className=" bg-slate-50 py-1">
                            <div class="flex mx-2 flex-auto justify-between">
                                <div class="">
                                    <button @click="printInvoice"
                                        class="bg-slate-200  hover:outline-slate-300 hover:bg-slate-300 text-black px-2 py-1 rounded-md ">
                                        <span class=" font-bold mr-5">
                                            <icon class="  space-x-2.5 text-gray-600" name="bi-printer" />
                                        </span> Print
                                    </button>
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
                                                            <p className="font-medium text-sm text-gray-400"> To </p>
                                                            <p> {{ supplierDetail.fullName }} </p>
                                                            <p> {{ supplierDetail.phone }} </p>

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

                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <table className="w-full divide-y divide-gray-200 text-sm">
                                            <thead>
                                                <tr>
                                                    <th scope="col"
                                                        className="py-2 text-left font-semibold text-gray-400">
                                                        Product </th>

                                                    <th scope="col"
                                                        className="py-2 text-left font-semibold text-gray-400">
                                                        Unit </th>

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
                                                <tr v-for="(stock, index) in stocksList" :key="index">
                                                    <td className=" whitespace-nowrap text-gray-600 truncate">
                                                        {{ stock.medicineName }}
                                                    </td>
                                                    <td className=" whitespace-nowrap text-gray-600 truncate">
                                                        {{ stock.unit }}
                                                    </td>
                                                    <td className="whitespace-nowrap text-gray-600 truncate">
                                                        {{ stock.quantity }} x {{ stock.unitPrice }}</td>
                                                    <td className="whitespace-nowrap text-gray-600 truncate">
                                                        {{ stock.totalPrice }}</td>
                                                    <td className="whitespace-nowrap ">

                                                        <span class=" font-bold mr-5">
                                                            <icon @click="removeItem"
                                                                class="w-3 px-4 space-x-2.5 text-red-500"
                                                                name="md-deleteforever-outlined" />
                                                        </span>
                                                    </td>
                                                </tr>
                                                <tr>
                                                </tr>
                                            </tbody>
                                        </table>
                                        <div className="p-9 border-b border-gray-200">
                                            <div className="space-y-3">
                                                <div className="flex justify-between">
                                                    <div>
                                                        <p className="text-gray-500 text-sm"> Credit </p>
                                                    </div>
                                                    <p className="text-gray-500 text-sm"> {{ credit }} ETB</p>
                                                </div>
                                                <div className="flex justify-between">
                                                    <div>
                                                        <p className="text-gray-500 text-sm"> Total </p>
                                                    </div>
                                                    <p className="text-gray-500 text-sm"> {{ total }} ETB</p>
                                                </div>
                                            </div>
                                        </div>
                                        <!--payment status-->
                                        <div className="flex flex-col flex-grow mx-2">


                                            <form class="grid grid-cols-2 gap-2">

                                                <div lass="px-1  flex-col  rounded-sm flex " @change="select">
                                                    <label for="paymentStatus"
                                                        class="font-semibold text-slate-600 ">Payment
                                                        status:</label>
                                                    <select id="paymentStatus" @change="select" v-model="paymentStatus"
                                                        required
                                                        class="h-8 px-6 py-1 appearance-none border border-slate-300 w-full bg-slate-50 rounded   focus:outline-none focus:ring-0 focus:shadow-none">
                                                        <option disabled="true">Select Payment Method</option>
                                                        <option value="credit">Credit</option>
                                                        <option value="debit">Transfer</option>
                                                        <option value="cash">Cash</option>
                                                    </select>
                                                </div>
                                                <FormKit v-if="paymentStatus === 'credit'" :disabled="!paymentStatus"
                                                    id="stock.paidAmount" v-model="stock.paidAmount"
                                                    validation="required" type="number" label="Paid Amount" />
                                            </form>
                                        </div>
                                        <div className="p-9 border-b border-gray-200">
                                            <div className="space-y-3">

                                                <div className="flex justify-between">
                                                    <button @click="calculateTotal"
                                                        class="px-3 py-2 text-sm font-medium text-center text-white bg-green-700 rounded-lg hover:bg-green-800 focus:ring-4 focus:outline-none focus:ring-green-300 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800">Calculate
                                                        Total</button>
                                                    <button @click="createStock"
                                                        class="text-white bg-purple-700 hover:bg-purple-800 focus:outline-none focus:ring-4 focus:ring-purple-300 font-medium rounded-full text-sm px-3 py-2 text-center mb-2 dark:bg-purple-600 dark:hover:bg-purple-700 dark:focus:ring-purple-900">
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