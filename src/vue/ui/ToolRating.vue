<script setup>
import Rating from 'primevue/rating';
import { ref } from 'vue';

const props = defineProps({
  label: {
    type: String,
    default: 'Рейтинг инструмента',
  },
  value: {
    type: Number,
    default: 0,
  },
  votes: {
    type: Number,
    default: 0,
  },
});

const value = ref(Math.round(props.value));
</script>

<template>
  <div class="rating">
    <div class="rating__label">
      {{ props.label }}
    </div>
    <Rating
      v-model="value"
      readonly
    />
    <div v-if="props.votes" class="rating__votes">
      ({{ props.value }}, {{ props.votes }} оценок)
    </div>
  </div>
</template>

<style scoped>

</style>
