<template>
  <div class="block" id="app_news_list_container">
    <ul id="app_news_list">
      <news-list-item
        v-for="(article, index) in results"
        :key="index"
        :article="article"
      ></news-list-item>
    </ul>
  </div>
</template>

<script>
// Imports
import newsListItem from "./newsListItems";

// News list component
export default {
  name: "news-list",
  props: ["results"],
  components: {
    "news-list-item": newsListItem
  }
};
</script>

<style></style>
