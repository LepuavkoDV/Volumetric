<script>
/* eslint-disable */
export default {
  methods: {
    currentLanguage(lang) {
      if (this.language === lang) {
        return 'active-lang';
      }
      return ' ';
    },
    setLanguage(lang) {
      this.language = lang;
    },
  }
}
</script>

<template>
  <div class="float-right lang-switcher">
    <a v-on:click.prevent="setLanguage('ru')" v-bind:class="currentLanguage('ru')">ru</a> <i class="far fa-circle"></i> <a v-on:click.prevent="setLanguage('ua')" v-bind:class="currentLanguage('ua')">ua</a> <i class="far fa-circle"></i> <a v-on:click.prevent="setLanguage('en')" v-bind:class="currentLanguage('en')">en</a>
  </div>
</template>
