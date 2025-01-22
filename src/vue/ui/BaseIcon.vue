<script setup>
defineProps({
  name: {
    type: String,
    required: true,
  },
  bs: {
    type: Boolean,
    default: false,
  },
});
</script>

<template>
  <i
    v-if="bs"
    :class="`bi-${name}`"
  />
  <svg
    v-else
    class="icon"
  >
    <use :xlink:href="`#${name}`" />
  </svg>
</template>

<style scoped>

</style>
