<script setup>
import Select from 'primevue/select';
import { ref } from 'vue';

const props = defineProps({
  cities: {
    type: Array,
    required: true,
  },
});

const region = ref('');
</script>

<template>
  <Select
    v-model="region"
    :virtual-scroller-options="{ itemSize: 30.8 }"
    :options="props.cities"
    filter
    option-label="label"
    option-value="value"
    placeholder="Регион продвижения"
  />
</template>

<style scoped>

</style>
