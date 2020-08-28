<template>
  <!-- START MAIN -->
  <main id="__app_main">
    <header id="__app_header">
      <h1>News Collector</h1>
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
    // Data for the app
    return {
      all_results: [], // All results from API's formatted in a standard way
      guardianapi_results: [], // Guardian News API results
      newsapi_results: [], // Newsapi.org API results
      search_term: "", // User inputed search term
      selected_article: null // User selected search term, passed up from components
    };
  },
  methods: {
    api: function(source, api_url, key) {
      // This function is used to retireve data from the correct API
      fetch(api_url + encodeURIComponent(this.search_term) + key) // Pass in the needed items for the fetch request && encode the search term
        .then(request => request.json()) // Grab the returned JSON
        .then(response => {
          // Pass the returned data into the correct result array
          if (source === "guardian_api") {
            this.guardianapi_results = response.results;
          } else if (source === "news_api") {
            this.newsapi_results = response.articles;
          }
        });
    },
    api_call: function(api) {
      if (api === "guardian_api") {
        // Set the correct URL and API Key
        const guardian_url = "https://content.guardianapis.com/search?q=";
        const guardian_key = "&api-key=" + API_KEYS.guardian_api;

        // Call the API
        this.api(api, guardian_url, guardian_key);
      } else if (api === "news_api") {
        // Set correct URL and API Key
        const news_url = "https://newsapi.org/v2/everything?q=";
        const news_key = "&apiKey=" + API_KEYS.news_api;

        // Call the API
        this.api(api, news_url, news_key);
      }
    }
  },
  computed: {},
  mounted() {}
};
</script>

<style></style>
