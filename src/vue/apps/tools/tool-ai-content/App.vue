<script setup>
import Tabs from 'primevue/tabs';
import TabList from 'primevue/tablist';
import Tab from 'primevue/tab';
import TabPanels from 'primevue/tabpanels';
import TabPanel from 'primevue/tabpanel';
import ToolRating from '@/vue/ui/ToolRating.vue';
import BaseIcon from '@/vue/ui/BaseIcon.vue';
import ChatBot from './components/ChatBot.vue';

const props = defineProps({
  rating: {
    type: Object,
    required: true,
  },
  tabs: {
    type: Array,
    required: true,
  },
  defaultTab: {
    type: String,
    required: true,
  },
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
</script>

<template>
  <div class="form-wrapper">
    <BaseIcon name="search" />
    <div class="form-wrapper__content">
      <Tabs
        :value="props.defaultTab"
        :lazy="true"
      >
        <TabList>
          <Tab
            v-for="tab in props.tabs"
            :key="tab.key"
            :value="tab.key"
          >
            {{ tab.name }}
          </Tab>
        </TabList>
        <TabPanels>
          <TabPanel
            v-for="tab in props.tabs"
            :key="tab.key"
            :value="tab.key"
          >
            <ChatBot
              v-if="tab.key === 'chat_bot'"
              :default-model="props.defaultModel"
              :models="props.models"
              :prompt-categories="props.promptCategories"
              :prompts="props.prompts"
            />
          </TabPanel>
        </TabPanels>
      </Tabs>
    </div>
    <div class="form-wrapper__footer">
      <div class="form-wrapper__rating">
        <ToolRating :value="props.rating.value" :votes="props.rating.votes" />
      </div>
    </div>
  </div>
</template>

<style scoped>

</style>
