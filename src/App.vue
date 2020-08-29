<template>
  <!-- START MAIN -->
  <main id="__app_main">
    <header id="__app_header">
      <h1>News Collector</h1>
    </header>
    <div id="__app_content">
      <section class="w-30" id="app_selector">
        <div class="block">
          <h2>Search for a story</h2>
          <form v-on:submit.prevent="handleSearch">
            <input type="text" v-model="search_term" placeholder="Search" />
            <br />
            <input type="submit" value="search" />
          </form>
        </div>
        <news-list
          v-if="all_results.length > 0"
          :results="all_results"
        ></news-list>
      </section>
      <section class="w-70" id="app_article">
        <div v-if="article_count > 0" class="block">
          <h2>Total articles: {{ article_count }}</h2>
        </div>
        <article-data
          class="block"
          v-if="selected_article"
          :article="selected_article"
        ></article-data>
      </section>
    </div>
  </main>
  <!-- END MAIN -->
</template>

<script>
// Imports
import { API_KEYS } from "./api_keys";
import { eventBus } from "./main";
import newsList from "./components/newsList";
import articleData from "./components/articleData";

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
            this.guardianapi_results = response.response.results;
            this.formatGuardianData();
          } else if (source === "news_api") {
            this.newsapi_results = response.articles;
            this.formatNewsData();
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
    },
    handleSearch: function() {
      // Wipe the results
      this.all_results = [];
      this.guardianapi_results = [];
      this.newsapi_results = [];

      // Call search on Guardian News API
      this.api_call("guardian_api");

      // Call search on News API
      this.api_call("news_api");
    },
    formatGuardianData: function() {
      // Grab and format guardian api data
      // Check if there is any data in guardianapi_results
      if (this.guardianapi_results.length > 1) {
        this.guardianapi_results.forEach(article => {
          // Create article object
          const article_object = {
            source: "Guardian News",
            title: article.webTitle,
            publish_date: new Date(article.webPublicationDate),
            url: article.webUrl
          };

          // Push article data to all_results
          this.all_results.push(article_object);
        });
      }
    },
    formatNewsData: function() {
      // Grab and format news api data
      // Check if there is any data in newsapi_results
      if (this.newsapi_results.length > 1) {
        this.newsapi_results.forEach(article => {
          // Create article object
          const article_object = {
            source: article.source.name,
            title: article.title,
            publish_date: new Date(article.publishedAt),
            url: article.url,
            content: article.content
          };

          // Push article data to all_results
          this.all_results.push(article_object);
        });
      }
    }
  },
  computed: {
    // Count total  articles
    article_count: function() {
      return this.all_results.length;
    }
  },
  mounted() {
    // Check for eventBus data
    eventBus.$on("passArticle", article => {
      this.selected_article = article;
    });
  },
  components: {
    "news-list": newsList,
    "article-data": articleData
  }
};
</script>

<style></style>
