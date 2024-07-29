<script setup>
import { computed, ref, onMounted } from "vue"
import Table from "../../../components/EasyTable.vue"
import BaseHead from '../../../components/BaseHead.vue';
import { useAccountsStore } from "../../../store/configuration/account"
import { storeToRefs } from 'pinia'
import { useToast } from "vue-toast-notification"

const accountStore = useAccountsStore()
var { addAccount,
    fetchAllAccounts,
    fetchAllActiveAccount,
    fetchAllInactiveUsersAccount,
    deactivateAccount } = accountStore;
const { accounts, hasError, message, status } = storeToRefs(accountStore)

const tableHeader = ["No", "First Name", "Sex", "Email", "Status", "Action"]
const account = ref({
    currentId: "",
    firstName: "",
    middleName: "",
    lastName: "",
    sex: "",
    email: "",
    phone: "",
    role: "".toLowerCase(),
    userName: "",
    password: "",
});

var showButton = ref(true)
const toast = useToast()
const searchInput = ref("")
var open = ref(true)
const displayList = () => open.value = true
const displayShow = () => open.value = false
const pageName = "Account"
const isValid = computed(() => {
    return !account.value.firstName || !account.value.middleName || !account.value.lastName || !account.value.sex ||
        !account.value.email || !account.value.phone || !account.value.userName || !account.value.password
})


const createAccount = async () => {
    const formData = {
        currentId: account.value.currentId,
        firstName: account.value.firstName,
        middleName: account.value.middleName,
        lastName: account.value.lastName,
        sex: account.value.sex,
        email: account.value.email,
        phone: account.value.phone,
        role: account.value.role,
        userName: account.value.userName,
        password: account.value.password
    }
    await addAccount(formData).then(() => {
        toast.open({

            message: hasError.value || message.value,
            position: "top",
            type: status.value === 201 ? "success" : "error"
        })
    })
}

const deactivate = async (id) => {
    await deactivateAccount(id).then(() => {
        toast.open({

            message: hasError.value || message.value,
            position: "top",
            type: status.value === 201 ? "success" : "error"
        })
    })
}
const perPageOptions = [5, 10, 25, 50, 100];

let currentPage = ref(1);
let itemsPerPage = ref(perPageOptions[0]);

//filter
const filterData = computed(() => {

    if (searchInput.value.trim() === '') {
        return accounts.value
    } else {

        return accounts.value.filter((account) => account.firstName.toLowerCase().includes(searchInput.value.toLowerCase())
        );
    }

})
//pagination

const paginatedUsers = computed(() => {
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
    fetchAllAccounts()
    fetchAllInactiveUsersAccount()
    fetchAllActiveAccount()
})
</script>

<template>
    <div>
        <header class="ml-2  ">
            <BaseHead @show-form="displayShow" button-text="cerateAccount" @show-list="displayList"
                button-text1="accountList" :Header="pageName" />
        </header>
        <div className="w-full flex justify-center m-1 my-3">
            <div className=" flex-grow overflow-auto md:w-3/4 w-full" v-if="open">
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
                <Table :headers="tableHeader">
                    <tr v-for="(account, index) in paginatedUsers" :key="index"
                        class="bg-none rounded-2xl hover:bg-slate-200">
                        <td>{{ index + 1 }}</td>
                        <td>{{ account.firstName }}</td>
                        <td>{{ account.sex }}</td>
                        <td>{{ account.email }}</td>
                        <td>
                            <span :class="{ 'text-green-500': account.active, 'text-red-500': !account.deactivate }">
                                {{ account.active ? 'Active' : 'Inactive' }}
                            </span>
                        </td>
                        <td>
                            <a class=" text-center font-medium text-red-400 hover:text-red-700 hover:underline"
                                @click="deactivate(account._id)">Deactivate</a>
                        </td>
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
        <div v-if="!open" class="flex flex-col flex-grow mx-2">
            <div class="item-center grid grid-col-1   md:grid-cols-4 gap-4">


                <FormKit v-model="account.firstName" validation="required" type="text" label="First Name" />

                <FormKit v-model="account.middleName" validation="required" type="text" label="Middle Name" />
                <FormKit v-model="account.lastName" validation="required" type="text" label="Last Name" />

                <FormKit v-model="account.email" validation="required|email" type="email" label="Email" />
                <FormKit v-model="account.phone" validation="required|phone" type="number" label="Phone" />
                <div class="flex flex-col px-1 rounded-sm  ">
                    <label class="font-semibold text-slate-600 " for="">Role</label>
                    <select
                        class=" h-8  px-2 py-1 appearance-none border border-slate-300 w-full bg-slate-50 rounded   focus:outline-none focus:ring-0 focus:shadow-none"
                        v-model="account.role" @change="select">
                        <option disabled="true">choose role</option>
                        <option>manager</option>
                        <option>casher</option>
                        <option>pharmacist</option>

                    </select>
                </div>
                <div class="px-1  flex-col  rounded-sm flex " @change="select">
                    <label class="font-semibold text-slate-600 ">Sex</label>
                    <select
                        class="appearance-none h-8  px-2 py-1 border border-slate-300 w-full bg-slate-50 rounded   focus:outline-none focus:ring-0 focus:shadow-none"
                        v-model="account.sex">
                        <option disabled="true">choose sex </option>
                        <option>Male </option>
                        <option>Female</option>

                    </select>
                </div>
                <FormKit v-model="account.userName" validation="required" type="text" label="User Name" />
                <FormKit v-model="account.password" validation="required|password" type="password" label="Password" />

            </div>
            <button :disabled="isValid" v-if="showButton" :class="{ 'disabled-button': isValid }" @click="createAccount"
                class="bg-purple-500 outline outline-offset-2 hover:outline-purple-500 block hover:bg-purple-700 md:w-28 w-full text-white font-semibold rounded-lg px-2 py-1 mt-2">
                create
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
</template>

<style scoped>
.disabled-button {
    background-color: gray;
    color: white;
    outline-color: none;
}
</style>