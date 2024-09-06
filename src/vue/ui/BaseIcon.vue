<script setup>
const props = defineProps({
  name: {
    type: String,
    required: true,
  },
});
</script>

<template>
  <svg class="icon">
    <use :xlink:href="`#${props.name}`" />
  </svg>
</template>

<style scoped>

</style>
