
<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import BaseHead from '../../../components/BaseHead.vue';
const router = useRouter();
const product = ref('');
const unitPrice = ref(0);
const quantity = ref(0);
const discount = ref(0);
const items = ref([]);
const subtotal = ref(null);
const discountAmount = ref(null);
const total = ref(null);

function routeToSalesPage() {
    router.push({ path: "/:sales/sales/" })
}

const addItem = () => {
    if (product.value && unitPrice.value > 0 && quantity.value > 0) {
        items.value.push({
            product: product.value,
            unitPrice: unitPrice.value,
            quantity: quantity.value
        });
        product.value = '';
        unitPrice.value = 0;
        quantity.value = 0;
    }
};

const removeItem = (index) => {
    items.value.splice(index, 1);
};

const calculateTotal = () => {
    subtotal.value = items.value.reduce((acc, item) => acc + (item.unitPrice * item.quantity), 0);
    discountAmount.value = (subtotal.value * discount.value) / 100;
    total.value = subtotal.value - discountAmount.value;
};
const pageName = "Invoice "

const printInvoice = () => {
    window.print();
};
</script>


<template>
    <div class="w-full h-full">
        <header>
            <BaseHead :Header="pageName" />
        </header>
        <div class="max-w-full mx-auto p-6 bg-white rounded-md shadow-md">
            <div class="flex  flex-auto justify-between">
                <div class="">
                    <button @click="printInvoice"
                        class="bg-purple-500 outline outline-offset-2 hover:outline-purple-500 hover:bg-purple-700 text-white px-4 py-2 rounded-md">
                        Print</button>
                </div>
                <div class="flex justify-end ">
                    <button @click="routeToSalesPage"
                        class="bg-purple-500 outline outline-offset-2 hover:outline-purple-500  hover:bg-purple-700 py-2 px-2  text-white  md:w-36 rounded ">
                        Sales Page
                    </button>
                </div>
            </div>
            <div className="flex w-full justify-end mt-2 h-screen text-gray-700">
                <div className="lg:flex-row md:flex sm:flex-col  w-full ">


                    <div className="flex md:w-4/5 w-full justify-end  border-r border-gray-300">
                        <div class="flex-grow overflow-auto md:w-3/4 w-full">
                            <div className="lg:flex-row md:flex sm:flex-col  w-full ">

                                <h3 class="text-lg font-semibold mb-2 px-2">Items :</h3>
                                <ul>
                                    <li v-for="(item, index) in items" :key="index" class="mb-2 px-2 gap-4 font-semibold">
                                        <span>{{ item.product }} - ${{ item.unitPrice }} x {{ item.quantity }}</span>
                                        <button @click="removeItem(index)" class="text-red-500 ml-2">Remove</button>
                                    </li>
                                </ul>
                            </div>
                            <div class="mt-4 px-2">
                                <button @click="calculateTotal"
                                    class="bg-green-500 text-white px-4 py-2 outline outline-offset-2 hover:outline-green-500 hover:bg-green-700 rounded-md">Calculate
                                    Total</button>
                            </div>
                            <div class="mt-4" v-if="total !== null">
                                <p class="text-lg font-semibold">Subtotal: ${{ subtotal }}</p>
                                <p class="text-lg font-semibold">Discount: ${{ discountAmount }}</p>
                                <p class="text-lg font-semibold">Total: ${{ total }}</p>
                            </div>
                        </div>
                    </div>
                    <div className="flex md:flex-row sm:flex-row flex-shrink-0 md:w-1/4 w-full py-1 pl-4">
                        <div className="flex w-full py-1 border-b border-gray-300 ">
                            <div className="flex flex-col flex-grow mx-2">

                                <div class="mb-4">
                                    <label class="block text-sm font-medium text-gray-700">Product:</label>
                                    <input v-model="product" type="text" class="mt-1 p-2 border rounded-md w-full">
                                </div>
                                <div class="mb-4">
                                    <label class="block text-sm font-medium text-gray-700">Unit Price:</label>
                                    <input v-model="unitPrice" type="number" class="mt-1 p-2 border rounded-md w-full">
                                </div>
                                <div class="mb-4">
                                    <label class="block text-sm font-medium text-gray-700">Quantity:</label>
                                    <input v-model="quantity" type="number" class="mt-1 p-2 border rounded-md w-full">
                                </div>
                                <div class="mb-4">
                                    <label class="block text-sm font-medium text-gray-700">Discount (%):</label>
                                    <input v-model="discount" type="number" class="mt-1 p-2 border rounded-md w-full">
                                </div>
                                <div class="mb-4">
                                    <button @click="addItem"
                                        class="bg-blue-500 outline outline-offset-2 hover:outline-blue-500 text-white px-4 py-2 rounded-md">Add
                                        Item</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>