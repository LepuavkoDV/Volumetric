import Vue from 'vue';
import MultiLanguage from 'vue-multilanguage';

Vue.use(MultiLanguage, {
  default: 'ru',
  ru: {
    title: 'Кубатурник',
  },
  en: {
    title: 'Volumetric',
  },
});
