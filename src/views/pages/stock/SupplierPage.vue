<script setup>
import { onMounted, ref, computed } from "vue"
import Table from "../../../components/EasyTable.vue"
import BaseHead from "../../../components/BaseHead.vue";
import { useSupplierStore } from "../../../store/stock/supplier"
import { storeToRefs } from "pinia";
import { useToast } from "vue-toast-notification"

var { addSupplier, fetchAllSuppliers, latestSupplier } = useSupplierStore()
const supplier_store = useSupplierStore()
const tableHeader = ["No", "Full Name", "Sex", " Address", "Phone", "Action"];
const { suppliers, message, hasError, status } = storeToRefs(supplier_store)
const supplier = ref({
    currentId: '',
    fullName: '',
    sex: '',
    phone: '',
    address: ''
})
//baseHeade
const toast = useToast()

const pageName = "Supplier "

const isValid = computed(() => {
    return !supplier.value.fullName || !supplier.value.sex || !supplier.value.phone || !supplier.value.address

})
var showButton = ref(true)

const createSupplier = async () => {
    const formData = {
        fullName: supplier.value.fullName,
        sex: supplier.value.sex,
        phone: supplier.value.phone,
        address: supplier.value.address
    }

    await addSupplier(formData).then(() => {
        toast.open({
            message: hasError.value || message.value,
            position: "top",
            type: status.value === 201 ? "success" : "error"
        })
    })

}
const editSupplier = (id) => {
    showButton = false
    const result = suppliers.value.filter((item) => item._id === id)
    supplier.value.currentId = result[0].currentId
    supplier.value.address = result[0].address
    supplier.value.fullName = result[0].fullName
    supplier.value.phone = result[0].phone
    supplier.value.sex = result[0].sex
}
const updateSupplier = async () => {
    const initialData = {
        _id: supplier.value.currentId,
        address: supplier.value.address,
        fullName: supplier.value.fullName,
        phone: supplier.value.phone,
        sex: supplier.value.sex

    }
    await latestSupplier(initialData).then(() => {

        toast.open({
            message: message.value || hasError.value,
            position: "top",
            type: status.value === 201 ? "success" : "error"
        })
    })
    supplier.value = {}
}

const searchInput = ref("")
const perPageOptions = [5, 10, 25, 50, 100];

let currentPage = ref(1);
let itemsPerPage = ref(perPageOptions[0]);
const filterData = computed(() => {
    if (searchInput.value.trim() === '') {
        return suppliers.value
    } else {
        const resultFiltered = suppliers.value.filter((supplier) => {
            return supplier.fullName.toLowerCase().includes(searchInput.value.toLowerCase())
        })
        return resultFiltered
    }
})



const paginatedSupplier = computed(() => {
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
    fetchAllSuppliers()
})
</script>
<template>
    <div class="ml-2">
        <header>
            <BaseHead :Header="pageName" />
        </header>
        <div className="flex w-full justify-end  h-screen text-gray-700">
            <div className="lg:flex-row md:flex sm:flex-col  w-full ">



                <div className="flex md:w-3/5 w-full flex-grow border-r border-gray-300">
                    <div class="flex-grow overflow-auto md:w-1/2 w-full m-1">
                        <div class="flex gap-4">
                            <div class="relative w-1/3 mb-4 ml-4">
                                <div class="absolute inset-y-0 start-0 flex items-center ps-3.5 pointer-events-none">
                                    <svg class="w-4 h-4 text-gray-500 dark:text-gray-400" aria-hidden="true"
                                        xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                                        <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"
                                            stroke-width="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z" />
                                    </svg>
                                </div>
                                <input type="text" v-model="searchInput" placeholder="search..." class="h-8  px-2 py-1  bg-gray-50   border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-gray-500 focus:border-gray-500 block w-full ps-10 p-2.5 
                         dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-gray-500
                          dark:focus:border-gray-500" />
                            </div>
                            <div class="m-1 mx-2">
                                <label for="itemsPerPage">Items per page:</label>

                                <select v-model="itemsPerPage" class="h-8 px-6 py-1 mx-2 appearance-none border border-slate-300 w-15 bg-slate-50 rounded
                        focus:outline-none focus:ring-0 focus:shadow-none">
                                    <option v-for="option in perPageOptions" :key="option" :value="option">
                                        {{ option }}
                                    </option>
                                </select>
                            </div>
                        </div>
                        <Table :headers="tableHeader">
                            <tr v-for="(supplier, index) in paginatedSupplier " :key="supplier.index"
                                class="hover:bg-slate-200">
                                <td>{{ index + 1 }}</td>
                                <td>{{ supplier.fullName }}</td>
                                <td>{{ supplier.sex }}</td>
                                <td>{{ supplier.address }}</td>
                                <td>{{ supplier.phone }}</td>

                            </tr>
                        </Table>
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
                </div>
                <div className="flex md:flex-row sm:flex-row flex-shrink-0 md:w-1/4 w-full py-1 pl-4">
                    <div className="flex w-full py-0 border-b border-gray-300 ">
                        <div className="flex flex-col flex-grow mx-2">
                            <form>
                                <FormKit v-model="supplier.fullName" validation="required" type="text"
                                    label="Full Name" />
                                <div class="px-1 mt-0 flex-col  rounded-sm flex " @change="select">
                                    <label class="font-semibold text-slate-600 ">Sex</label>
                                    <select
                                        class="h-8  px-6 py-1 appearance-none border border-slate-300 w-full bg-slate-50 rounded   focus:outline-none focus:ring-0 focus:shadow-none"
                                        v-model="supplier.sex">
                                        <option disabled="true">choose sex </option>
                                        <option>Male </option>
                                        <option>Female</option>

                                    </select>
                                </div>
                                <FormKit v-model="supplier.phone" validation="required|phone" type="number"
                                    label="Phone" name="phone" />
                                <FormKit v-model="supplier.address" validation="required" type="text" label="Address"
                                    name="address" />

                            </form>
                            <button :disabled="isValid" v-if="showButton" @click="createSupplier"
                                :class="{ 'disabled-button': isValid }"
                                class="bg-purple-500 outline outline-offset-2 hover:outline-purple-500 block hover:bg-purple-700 md:w-28 w-full text-white font-semibold rounded-lg px-2 py-1 mt-2">
                                create
                            </button>
                            <button v-if="!showButton" @click="updateSupplier"
                                class="bg-yellow-500 outline outline-offset-2 hover:outline-yellow-500 block hover:bg-yellow-700 md:w-28  text-white font-semibold rounded-lg px-2 py-1 mt-2">
                                update
                            </button>
                        </div>
                    </div>
                </div>
            </div>
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
</template>
<style scoped>
.disabled-button {
    background-color: gray;
    color: white;

    outline-color: none;
}
</style>