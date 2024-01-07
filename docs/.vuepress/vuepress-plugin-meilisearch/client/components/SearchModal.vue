<template>
  <div class="modal" v-if="modalVisible" @keyup.down="() => currentIndex++" @mouseleave="handleMouseLeave">
    <Honeycomb v-if="isLoading"></Honeycomb>
    <div v-else style="flex: 1; display: flex; flex-direction: column;  align-items: center;">
      <div :class="{ result: true, active: index == currentIndex }" v-for="(hit, index) in hits" :key="index"
        @mouseenter="handleMouseEnter(hit, index)" @click="handleClick(hit)">
        <span v-html="markKeyword(hit.hierarchy_lvl1)"></span>|
        <a :href="hit.url" v-html="markKeyword(hit.hierarchy_lvl2 ?? hit.hierarchy_lvl1)"> </a>
        <p class="content" v-html="markKeyword(hit.content)"></p>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import Honeycomb from './Honeycomb.vue';
import keywordMark from 'keyword-mark';
import { MeiliSearch } from 'meilisearch'
import { ref, watch } from 'vue';
import { currentIndex, modalVisible, query, isLoading, hits, canHide } from '../global';

const client = new MeiliSearch({
  host: 'https://search.jinqiu.wang',
  apiKey: '@QQ.wjq21',
})

let index = ref('jinqiu-wang');

const handleChange = async () => {
  await new Promise((resolve) => setTimeout(resolve, 500));
  const result = await client.index(index.value).search(query.value);
  isLoading.value = false;
  hits.value = result.hits;
}

const handleMouseEnter = (hit, index: number) => {
  canHide.value = false;
  currentIndex.value = index;
}

const handleMouseLeave = () => {
  canHide.value = true;
}

const handleClick = (hit) => {
  const url = hit.url;
  location.href = url;
}

watch(query, () => {
  handleChange();
})

function markKeyword(content: string) {
  return keywordMark(content, query.value, {
    tag: 'strong',
    ignoreCase: true,
    // handle(match: string) {
    //   return match;
    // }
  })
}
</script>

<style scoped lang="scss">
$shadow: .3rem .3rem .6rem var(--greyLight-2),
  -.2rem -.2rem .5rem var(--white);
$inner-shadow: inset .2rem .2rem .5rem var(--greyLight-2),
  inset -.2rem -.2rem .5rem var(--white);

*,
*::before,
*::after {
  margin: 0;
  padding: 0;
  box-sizing: inherit;
}

.modal {
  box-sizing: border-box;
  overflow: auto;
  position: fixed;
  display: flex;
  flex-direction: column;
  top: 100%;
  right: 0;
  width: 556px;
  height: 356px;
  padding: 10px 10px;
  background-color: #E4EBF5;
  z-index: 999;
  border-radius: 0.25rem;
}

.result {
  text-align: center;
  width: 516px;
}

.active {
  opacity: 0.8;
  background-color: green;
}

.content {
  font-size: 0.8rem;
  width: 516px;
  overflow: hidden;
}

@media screen and (max-width: 719px) {
  .modal {
    width: 100vw;
    left: 0;
    right: 0;
    margin: 0 !important;
  }

  .result {
    width: 96vw;
  }

  .content {
    font-size: 0.8rem;
    width: 96vw;
    overflow: hidden;
  }
}
</style>