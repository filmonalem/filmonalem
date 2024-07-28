<script setup>
import { ref } from "vue"
var displaySales = ref(true);
const isOpen = () => {
    displaySales.value = !displaySales.value;
}
const routes = ref([

    {
        name: "Report",
        path: "/sales/report",
        icon: "hi-document-report",
    },
    {
        name: "Customer",
        path: "/sales/customer",
        icon: "hi-document-report",
    },

    {
        name: "Sales",
        path: "/sales/sales",
        icon: "fc-sales-performance",
    },
    {
        name: "DailySales",
        path: "/sales/daily-sales",
        icon: "fc-calendar"
    }
])
</script>
<template>
    <div class="   m-0 ">
        <div class="  pl-1 m-0 ">
            <div class="flex flex-row">
                <h6 @click="isOpen" class="   hover:text-black py-1  text-gray-600  "
                    :class="{ 'text-primary': displaySales }">
                    Sales
                    <span class="pl-16   ">
                        <icon class="w-3 px-5 space-x-2.5" name="bi-chevron-down" v-if="!displaySales" />
                        <icon class="w-6 px-5 space-x-2" name="bi-chevron-right" v-if="displaySales" />
                    </span>
                </h6>
            </div>

            <!--  links  -->
            <ul v-if="!displaySales">
                <li v-for="x in routes"
                    class=" mt-1 flex w-full h-full  hover:rounded-r-full hover:bg-purple-400   text-sm text-slate-600">
                    <router-link router-link="w-full" active-class="link-active w-full" :to="x.path"
                        class=" text-black">
                        <div class="flex gap-1 items-center w-full px-4 ">
                            <icon class="w-6" :name="x.icon" />
                            <span class="ml-1 truncate flex-1">{{ x.name }}</span>
                        </div>
                    </router-link>
                </li>
            </ul>
        </div>
    </div>
</template>