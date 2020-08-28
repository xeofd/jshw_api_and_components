<template>
  <!-- START MAIN -->
  <main id="__app_main">
    <header id="__app_header">
      <h1>News Collection</h1>
    </header>
    <div id="__app_content">
      <section id="app_selector"></section>
      <section id="app_article"></section>
    </div>
  </main>
  <!-- END MAIN -->
</template>

<script>
// Imports
import { API_KEYS } from "./API_KEYS";

export default {
  name: "app",
  data() {
    return {
      all_results: [],
      guardian_results: [],
      newsapi_results: [],
      search_term: ""
    };
  },
  methods: {
    api_call: function(api, search_term = null) {}
  },
  computed: {},
  mounted() {}
};
</script>

<style></style>
