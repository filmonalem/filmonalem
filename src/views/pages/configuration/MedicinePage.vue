<script setup>
import BaseHead from '../../../components/BaseHead.vue';
import { useUnitsStore } from '../../../store/configuration/unit'
import { useCategoriesStore } from '../../../store/configuration/category'
import { useMedicinesStore } from '../../../store/configuration/medicine'
import Table from '../../../components/EasyTable.vue';
import { storeToRefs } from 'pinia'
import { useToast } from "vue-toast-notification"
import { onMounted, ref, computed } from 'vue'
var { addMedicine, fetchAllMedicines, latestMedicine } = useMedicinesStore()
const medicineStore = useMedicinesStore()
const categoryStore = useCategoriesStore()
const unitStore = useUnitsStore()
const { fetchAllUnit } = unitStore
const { medicines, message, hasError, status } = storeToRefs(medicineStore)
const { categories } = storeToRefs(categoryStore)
const { units } = storeToRefs(unitStore)
const { fetchAllCategory } = categoryStore
const toast = useToast()

const tableHeader = ["No", "medicineName", "Generic Name", "Brand", "Category", "Unit", "Country", "dosageForm", "Action"];

const medicine = ref({
    currentId: '',
    categoryId: '',
    medicineName: '',
    genericName: '',
    brand: '',
    country: '',
    dosageForm: '',
    unit: '',
    usage: '',
})
var showButton = ref(true)
//baseHeade
var open = ref(true)

const displayList = () => open.value = true
const displayShow = () => open.value = false

const pageName = "Medicine "

const createMedicine = async () => {
    const formData = {
        currentId: medicine.value.currentId,
        categoryId: medicine.value.categoryId,
        medicineName: medicine.value.medicineName,
        genericName: medicine.value.genericName,
        brand: medicine.value.brand,
        // country: medicine.value.country,
        // dosageForm: medicine.value.dosageForm,
        unit: medicine.value.unit,
        // usage: medicine.value.usage,
    }
    await addMedicine(formData).then(() => {
        toast.open({
            message: hasError.value || message.value,
            position: "top",
            type: status.value === 201 ? "success" : "error"
        })
    })
}

const select = async (e) => {
    medicine.value.currentId = e.target.value
}
const isValid = computed(() => {
    return !medicine.value.brand || !medicine.value.categoryId || !medicine.value.country || !medicine.value.dosageForm || !medicine.value.genericName ||
        !medicine.value.medicineName || !medicine.value.unit || !medicine.value.usage
})
const editMedicine = async (id) => {
    showButton = false
    const result = medicines.value.filter((item) => item._id === id)
    medicine.value.currentId = result[0]._id
    medicine.value.categoryId = result[0].categoryId
    medicine.value.brand = result[0].brand
    medicine.value.country = result[0].country
    medicine.value.dosageForm = result[0].dosageForm
    medicine.value.genericName = result[0].genericName
    medicine.value.medicineName = result[0].medicineName
    medicine.value.unit = result[0].unit
    medicine.value.usage = result[0].usage

}
const updateMedicine = async () => {
    const initialData = {
        _id: medicine.value.currentId,
        categoryId: medicine.value.categoryId,
        brand: medicine.value.brand,
        country: medicine.value.country,
        dosageForm: medicine.value.dosageForm,
        genericName: medicine.value.genericName,
        medicineName: medicine.value.medicineName,
        unit: medicine.value.unit,
        usage: medicine.value.usage
    }
    await latestMedicine(initialData).then(() => {

        toast.open({
            message: message.value || hasError.value,
            position: "top",
            type: status.value === 201 ? "success" : "error"
        })
    })

    medicine.value = {}
}
let searchInput = ref("")
const perPageOptions = [5, 10, 25, 50, 100];

let currentPage = ref(1);
let itemsPerPage = ref(perPageOptions[0]);
const filterData = computed(() => {
    if (searchInput.value.trim() === '') {
        return medicines.value
    } else {
        const resultFiltered = medicines.value.filter((medicine) => {
            return medicine.medicineName.toLowerCase().includes(searchInput.value.toLowerCase())
        })
        return resultFiltered
    }
})
const paginatedMedicine = computed(() => {
    const startIndex = (currentPage.value - 1) * itemsPerPage.value;
    const endIndex = startIndex + itemsPerPage.value;
    return filterData.value.slice(startIndex, endIndex);
});

const totalPages = computed(() => {
    return Math.ceil(filterData.value.length / itemsPerPage.value);
});

function nextPage() {
    currentPage.value++;
}

function prevPage() {
    currentPage.value--;
}
onMounted(() => {
    fetchAllMedicines()
    fetchAllCategory()
    fetchAllUnit()


})
</script>

<template>
    <div>
        <header class="ml-2">
            <BaseHead @show-form="displayShow" button-text="createMedicine" @show-list="displayList" :Header="pageName"
                button-text1="medicineList" />
        </header>
        <div class="w-full flex justify-start px-4 my-3">
            <div v-if="open" class=" flex-grow relative md:w-3/4 w-3/4">
                <div class="flex gap-4">
                    <div class="relative w-1/3 mb-4 ml-4">
                        <div class="absolute inset-y-0 start-0 flex items-center ps-3.5 pointer-events-none">
                            <svg class="w-4 h-4 text-gray-500 dark:text-gray-400" aria-hidden="true"
                                xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                                <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"
                                    stroke-width="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z" />
                            </svg>
                        </div>
                        <input type="text" v-model="searchInput" placeholder="search..." @click="filterData" class="h-8  px-2 py-1  bg-gray-50   border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-gray-500 focus:border-gray-500 block w-full ps-10 p-2.5 
                         dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-gray-500
                          dark:focus:border-gray-500" />
                    </div>
                    <div class="m-1 mx-2">
                        <label for="itemsPerPage">Items per page:</label>

                        <select v-model="itemsPerPage" class="h-8 px-6 py-1 mx-2 appearance-none border border-slate-300 w-15 bg-slate-50 rounded
                        focus:outline-none focus:ring-0 focus:shadow-none">
                            <option v-for="option in perPageOptions" :key="option" :value="option">{{
                                option }}
                            </option>
                        </select>
                    </div>
                </div>
                <div class="absolute w-full">

                    <Table :headers="tableHeader">
                        <tr v-for="(medicine, index) in paginatedMedicine" :key="medicine.index"
                            class="bg-none  hover:bg-slate-200">
                            <td>{{ index + 1 }}</td>
                            <td>{{ medicine.medicineName }}</td>
                            <td>{{ medicine.genericName }}</td>
                            <td>{{ medicine.brand }}</td>
                            <td>{{ medicine.categoryId.category }}</td>
                            <td>{{ medicine.unit }}</td>
                            <td>{{ medicine.country }}</td>
                            <td>{{ medicine.dosageForm }}</td>
                            <td>
                                <a class=" text-center font-medium text-green-400 hover:text-green-700 hover:underline"
                                    @click="editMedicine(medicine._id)">Edit</a>
                            </td>
                        </tr>
                    </Table>
                </div>
                <div class="flex justify-end">
                    <nav class="inline-flex -space-x-px text-sm  items-center mx-4 mt-4">
                        <button @click="prevPage" :disabled="currentPage === 1"
                            class="flex items-center justify-center px-3 h-8 ms-0 leading-tight text-gray-500 bg-white border border-e-0 border-gray-300 rounded-s-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">Previous</button>
                        <span
                            class="flex items-center justify-center px-3 h-8 leading-tight text-gray-500  border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">Page
                            {{ currentPage }} of {{ totalPages }}</span>
                        <button @click="nextPage" :disabled="currentPage === totalPages"
                            class="flex items-center justify-center px-3 h-8 leading-tight text-gray-500 bg-white border border-gray-300 rounded-e-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">Next</button>

                    </nav>
                </div>
            </div>

            <div v-if="!open" class="  w-full justify-start flex-col  mx-2">
                <form class=" grid grid-col-1   md:grid-cols-3 gap-4">
                    <div class="flex flex-col px-1 rounded-sm  ">
                        <label class="font-semibold text-slate-600 " for="">category</label>
                        <select
                            class="h-8  px-2 py-1 appearance-none border border-slate-300 w-full bg-slate-50 rounded   focus:outline-none focus:ring-0 focus:shadow-none"
                            v-model="medicine.categoryId" @change="select">
                            <option disabled="true">choose category name</option>
                            <option v-for="item in categories" :key="item" :value="item._id">{{ item.category }}
                            </option>
                        </select>
                    </div>
                    <div class="  px-1   flex-col  rounded-sm flex " @change="select">
                        <label class="font-semibold text-slate-600 ">unit</label>
                        <select
                            class="h-8  px-2 py-1 appearance-none border border-slate-300 w-full bg-slate-50 rounded   focus:outline-none focus:ring-0 focus:shadow-none"
                            v-model="medicine.unit">
                            <option disabled="true">choose unit name</option>
                            <option v-for="item in units" :key="item" :value="item.unit">{{ item.unit }} </option>
                        </select>
                    </div>

                    <FormKit v-model="medicine.medicineName" validation="required" type="text" label="Medicine Name" />
                    <FormKit v-model="medicine.genericName" validation="required" type="text" label="Generic Name" />
                    <FormKit v-model="medicine.dosageForm" validation="required" type="text" label="Dosage Form" />
                    <FormKit v-model="medicine.brand" validation="required" type="text" label="Brand" />
                    <FormKit v-model="medicine.country" validation="required" type="text" label="Country" />
                    <FormKit v-model="medicine.usage" validation="required" type="textarea" auto-height label="Usage" />


                </form>

                <button :disabled="isValid" v-if="showButton" @click="createMedicine"
                    :class="{ 'disabled-button': isValid }"
                    class="bg-purple-500 outline outline-offset-2 hover:outline-purple-500 block hover:bg-purple-700 md:w-28 w-full text-white font-semibold rounded-lg px-2 py-1 mt-2">
                    create
                </button>
                <button v-if="!showButton" @click="updateMedicine"
                    class="bg-yellow-500 outline outline-offset-2 hover:outline-yellow-500 block hover:bg-yellow-700 md:w-28  text-white font-semibold rounded-lg px-2 py-1 mt-2">
                    update
                </button>
            </div>

            <div v-if="isLoading === true" class="spinner">
                <div class="text-center">
                    <div role="status">
                        <svg aria-hidden="true"
                            class="inline w-8 h-8 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600"
                            viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path
                                d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                                fill="currentColor" />
                            <path
                                d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                                fill="currentFill" />
                        </svg>
                        <span class="sr-only">Loading...</span>
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