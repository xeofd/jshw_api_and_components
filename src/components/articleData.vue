<template>
  <div class="block">
    <div class="content-title">
      <h2>{{ article.title }}</h2>
      <p>Source: {{ article.source }}</p>
      <p>Published on: {{ article.publish_date }}</p>
      <p>Read this article <a :href="article.url">here</a></p>
    </div>
    <div v-if="article.content" class="content-text">
      <p>{{ article.content }}</p>
    </div>
  </div>
</template>

<script>
export default {
  name: "article-data",
  props: ["article"]
};
</script>

<style></style>
