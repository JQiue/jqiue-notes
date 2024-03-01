import { defineClientConfig } from 'vuepress/client';
import Index from './index.vue';

export default defineClientConfig({
  enhance({ app }) {
    app.component('MeiliSearch', Index);
  },
});
