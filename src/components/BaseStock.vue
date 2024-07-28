<script setup>
import { ref } from "vue"
var displayStock = ref(true);
const isOpen = () => {
    displayStock.value = !displayStock.value;
}
const routes = ref([

    {
        name: "Supplier",
        path: "/purchase/supplier",
        icon: "bi-cart-dash",

    },
    {
        name: "Stock",
        path: "/stocks/stock-page",
        icon: "md-store-twotone",
    },
    {
        name: "StockPayment",
        path: "/stocks/stock-Payment",
        icon: "ri-hand-coin-line"
    },
    {
        name: "StockBalance",
        path: "/stocks/stock-balance",
        icon: "md-store-twotone",
    },
    {
        name: "Report",
        path: "/stock/stock-report",
        icon: "hi-document-report",
    },
    {
        name: "DailyPurchase",
        path: "/stocks/daily-purchase",
        icon: "fc-calendar"
    }
])
</script>
<template>
    <div class="   m-0 ">
        <div class="  pl-1 m-0 ">
            <div class="flex flex-row">
                <h6 @click="isOpen" class="   hover:text-black py-1  text-gray-600  "
                    :class="{ 'text-primary': displayStock }">
                    Stock
                    <span class="pl-16   ">
                        <icon class="w-3 px-4 space-x-2.5" name="bi-chevron-down" v-if="!displayStock" />
                        <icon class="w-6 px-4 space-x-2" name="bi-chevron-right" v-if="displayStock" />
                    </span>
                </h6>
            </div>

            <!--  links  -->
            <ul v-if="!displayStock">
                <li v-for="x in routes"
                    class=" mt-1 flex w-full h-full  hover:rounded-r-full hover:bg-purple-400   text-sm text-slate-600">
                    <router-link router-link="w-full" active-class="link-active w-full" :to="x.path"
                        class=" text-black">
                        <div class="flex gap-1 items-center w-full px-2 ">
                            <icon class="w-6" :name="x.icon" />
                            <span class="ml-1 truncate flex-1">{{ x.name }}</span>
                        </div>
                    </router-link>
                </li>
            </ul>
        </div>
    </div>
</template>