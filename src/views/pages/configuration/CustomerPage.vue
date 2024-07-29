<script setup>
import { useCustomersStore } from '../../../store/configuration/customer';
import { onMounted, ref, computed } from "vue"
import Table from "../../../components/EasyTable.vue"
import BaseHead from '../../../components/BaseHead.vue';
import { storeToRefs } from 'pinia';
import { useToast } from "vue-toast-notification"
var { addCustomer, fetchAllCustomers, latestCustomer } = useCustomersStore()
const useStore = useCustomersStore()
const { customers } = storeToRefs(useStore)
const tableHeader = ["No", "Full Name", "Sex", "Phone", "Tin Number", "Action"];

const toast = useToast()


const customer = ref({
    currentId: '',
    fullName: '',
    sex: '',
    phone: '',
    tinNumber: ''
})
const isValid = computed(() => {
    return !customer.value.fullName || !customer.value.phone || !customer.value.sex
        || !customer.value.tinNumber

})

var showButton = ref(true)
//baseHeade
var open = ref(true)
const displayList = () => open.value = true
const displayShow = () => open.value = false
const pageName = "Customer "



const createCustomer = async () => {
    const formData = {
        fullName: customer.value.fullName,
        phone: customer.value.phone,
        sex: customer.value.sex,
        tinNumber: customer.value.tinNumber
    }

    const result = await addCustomer(formData).then(() => {

        toast.open({
            message: 'Customer Created successfully',
            position: 'top',
            type: 'success'
        })
    })
    customer.value = {}


    console.log(result)

}
const editCustomer = (id) => {
    showButton = false
    const result = customers.value.filter((item) => item._id === id)
    customer.value.currentId = result[0]._id
    customer.value.fullName = result[0].fullName
    customer.value.phone = result[0].phone
    customer.value.sex = result[0].sex
    customer.value.tinNumber = result[0].tinNumber
}
const updateCustomer = async () => {
    const initialData = {
        _id: customer.value.currentId,
        fullName: customer.value.fullName,
        phone: customer.value.phone,
        sex: customer.value.sex,
        tinNumber: customer.value.tinNumber
    }
    const res = await latestCustomer(initialData).then(() => {

        toast.open({
            message: 'Customer Updated successfully',
            position: 'top',
            type: 'success'
        })
    })
    customer.value = {}
}

const searchInput = ref('')
const filterData = computed(() => {
    if (searchInput.value.trim() === '') {
        return customers.value
    } else {
        const filteredResult = customers.value.filter((customer) => {
            return customer.fullName.toLowerCase().includes(searchInput.value.toLowerCase())
        })
        return filteredResult
    }
})

onMounted(() => {
    fetchAllCustomers()
})
</script>
<template>
    <div class="ml-2">
        <header>
            <BaseHead @show-form="displayShow" button-text="createCustomer" @show-list="displayList"
                button-text1="customerList" :Header="pageName" />
        </header>
        <div className="flex w-full justify-end  h-screen text-gray-700">
            <div className="lg:flex-row md:flex sm:flex-col  w-full ">



                <div className="flex md:w-3/5 w-full flex-grow border-r border-gray-300">
                    <div class="flex-grow overflow-auto  md:w-1/2 w-full">
                        <div class="relative w-1/3 mb-6 ml-4">
                            <div class="absolute inset-y-0 start-0 flex items-center ps-3.5 pointer-events-none">
                                <svg class="w-4 h-4 text-gray-500 dark:text-gray-400" aria-hidden="true"
                                    xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                                    <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"
                                        stroke-width="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z" />
                                </svg>
                            </div>
                            <input type="text" v-model="searchInput" placeholder="search..."
                                class="bg-gray-50   border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-gray-500 focus:border-gray-500 block w-full ps-10 p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" />
                        </div>

                        <Table :headers="tableHeader" class="">
                            <tr v-for="(customer, index) in filterData" :key="index"
                                class="bg-none  hover:bg-slate-200">

                                <td>{{ index + 1 }}</td>
                                <td>{{ customer.fullName }}</td>
                                <td>{{ customer.sex }}</td>
                                <td>{{ customer.phone }}</td>
                                <td>{{ customer.tinNumber }}</td>

                                <td>
                                    <a @click="editCustomer(customer._id)"
                                        class=" text-center font-medium text-green-400 hover:text-green-700 hover:underline">Edit</a>


                                </td>
                            </tr>

                        </Table>
                    </div>
                </div>
                <div className="flex md:flex-row sm:flex-row flex-shrink-0 md:w-1/4 w-full py-1 pl-4">
                    <div className="flex w-full py-1 border-b border-gray-300 ">
                        <div className="flex flex-col flex-grow mx-2">
                            <p class="font-bold align-center text-gray-500">create customer</p>
                            <div class="md:text-xs mt-1  text-xs sm:text-xs">
                                <FormKit v-model="customer.fullName" validation="required" type="text"
                                    label="Full Name" />
                                <FormKit v-model="customer.phone" validation="required|phone" type="number"
                                    label="Phone" name="phone" />

                                <div class="px-1  flex-col  rounded-sm flex " @change="select">
                                    <label class="font-semibold text-slate-600 ">Sex</label>
                                    <select
                                        class="appearance-none border border-slate-300 w-full bg-slate-50 rounded   focus:outline-none focus:ring-0 focus:shadow-none"
                                        v-model="customer.sex">
                                        <option disabled="true">choose sex </option>
                                        <option>Male </option>
                                        <option>Female</option>

                                    </select>
                                </div>
                                <FormKit v-model="customer.tinNumber" validation="required" type="number"
                                    label="tinNumber" name="tinNumber" />

                                <button :disabled="isValid" v-if="showButton" @click="createCustomer"
                                    :class="{ 'disabled-button': isValid }"
                                    class="bg-purple-500 h-8 block outline outline-offset-2 outline-purple-500  md:w-36  text-white font-semibold rounded-lg px-2 py-1 mt-6">
                                    create
                                </button>
                                <button v-if="!showButton" @click="updateCustomer"
                                    class="bg-yellow-500 w-full outline outline-offset-2 outline-yellow-500 block hover:bg-yellow-700 md:w-36  text-white font-semibold rounded-lg px-2 py-1 mt-6">
                                    update
                                </button>
                            </div>
                        </div>
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
    outline-color: gray;
}
</style>