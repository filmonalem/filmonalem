<script setup>
import { ref, watch } from 'vue';

const isVisible = ref(false);
const message = ref('');

const showToast = (msg) => {
    message.value = msg;
    isVisible.value = true;
    setTimeout(() => {
        isVisible.value = false;
    }, 3000); // Adjust the timeout as needed
};

watch(isVisible, (newValue) => {
    if (!newValue) {
        message.value = '';
    }
});
</script>

<template>
    <div v-if="isVisible" class="toaster">
        {{ message }}
    </div>
</template>
  
<style>
.toaster {
    position: fixed;
    bottom: 20px;
    left: 50%;
    transform: translateX(-50%);
    background-color: #333;
    color: slategray;
    padding: 10px 20px;
    border-radius: 5px;
}
</style>