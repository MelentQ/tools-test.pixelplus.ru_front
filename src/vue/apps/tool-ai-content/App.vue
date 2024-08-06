<script setup>
import Select from 'primevue/select';
import { ref } from 'vue';

const props = defineProps({
  models: {
    type: Array,
    required: true,
  },
  defaultModel: {
    type: String,
    required: true,
  },
});

const aiModel = ref(props.defaultModel);
</script>

<template>
  <Select
    v-model="aiModel"
    :options="props.models"
    option-label="label"
    option-value="value"
    placeholder="Модель"
  />
</template>

<style scoped>

</style>
