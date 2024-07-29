<script setup>

const props = defineProps({
  headers: {
    type: Array,
    required: true,
  },
});


</script>
<template>
  <div class=" table-container px-4  ">
    <div class=" overflow-x-auto">
      <table
        class="table-fixed  overflow-y-auto border-spacing-y-4 min-w-full divide-y divide-gray-200 text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
        <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
          <tr>
            <th v-for="header in headers" :key="header" class="  text-center border ">
              {{ header }}
            </th>
          </tr>
        </thead>
        <tbody class=" bg-white divide-y divide-gray-200 text-gray-500  hover:bg-gray-50 ">

          <slot></slot>
        </tbody>
      </table>
    </div>
  </div>
</template>
<style>
.table-container {
  @apply border-spacing-y-4 min-w-full divide-y divide-gray-200
}

th {
  @apply py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider
}



tr {
  @apply bg-gray-100;
}

td {
  @apply px-6 py-2 whitespace-nowrap border;
}
</style>
