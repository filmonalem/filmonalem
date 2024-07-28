<script setup>
const token = localStorage.getItem('token');

</script>

<template>
  <div id="app">
    <component :is="!token ? 'BaseMaster' : 'DefaultPage'" />
  </div>
</template>
