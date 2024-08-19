<script setup>
const props = defineProps({
  foo: {
    type: String,
    required: true,
  },
  bar: {
    type: Array,
    default() {
      return [];
    },
  },
});
</script>

<template>
  <div>
    <p>Пример Vue-приложения</p>
    <p>Props:</p>
    <pre>{{ props }}</pre>
  </div>
</template>

<style scoped>

</style>
