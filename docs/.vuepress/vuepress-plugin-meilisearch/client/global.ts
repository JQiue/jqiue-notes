import { ref } from 'vue';
import { Hits } from 'meilisearch';

export let query = ref('');
export let modalVisible = ref(false);
export let canHide = ref(true);
export let currentIndex = ref(0);
export let currentHitUrl = ref();
export let isLoading = ref(true);
export let hits = ref<Hits>([]);

export const showModal = () => {
  modalVisible.value = true;
};
export const hideModal = () => {
  if (canHide.value) {
    modalVisible.value = false;
  }
};
