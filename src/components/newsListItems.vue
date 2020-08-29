<template>
  <li v-on:click="select_article">
    <p>{{ article.title }} - {{ article.source }}</p>
  </li>
</template>

<script>
// Imports
import { eventBus } from "../main";

// News list item component
export default {
  name: "news-list-item",
  data() {
    return {
      selected_article: null
    };
  },
  props: ["article"],
  methods: {
    select_article: function() {
      eventBus.$emit("passArticle", this.article);
    }
  }
};
</script>

<style></style>
