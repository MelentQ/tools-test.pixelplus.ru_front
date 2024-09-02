<script setup>
import Select from 'primevue/select';
import { reactive } from 'vue';

const props = defineProps({
  cities: {
    type: Array,
    required: true,
  },
});

const state = reactive({
  region: '',
});
</script>

<template>
  <form class="form" @submit.prevent>
    <Select
      v-model="state.region"
      :options="props.cities"
      filter
      required
      option-label="label"
      option-value="value"
      placeholder="Регион продвижения"
    />
    <button type="submit">
      Отправить
    </button>
  </form>
</template>

<style scoped>

</style>
