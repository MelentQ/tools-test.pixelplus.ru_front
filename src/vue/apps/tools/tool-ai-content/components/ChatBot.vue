<script setup>
import { ref } from 'vue';
import Select from 'primevue/select';

const props = defineProps({
  models: {
    type: Array,
    required: true,
  },
  defaultModel: {
    type: String,
    required: true,
  },
  promptCategories: {
    type: Array,
    required: true,
  },
  prompts: {
    type: Array,
    required: true,
  },
});

const selectedPromptsCategory = ref('');
const selectedPrompt = ref('');
const aiModel = ref(props.defaultModel);
</script>

<template>
  <form class="form">
    <div class="form__row">
      <Select
        v-model="selectedPromptsCategory"
        :options="props.promptCategories"
        filter
        option-label="name"
        option-value="id"
        placeholder="Категория"
      />
      <Select
        v-model="selectedPrompt"
        :options="props.prompts"
        filter
        option-label="name"
        option-value="id"
        placeholder="Запрос"
      />
    </div>
    <Select
      v-model="aiModel"
      :options="props.models"
      option-label="label"
      option-value="value"
      placeholder="Модель"
    />
  </form>
</template>

<style scoped>

</style>
