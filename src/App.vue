<template>
  <div class="container-fluid dashboard" id="app">
    <router-view/>
    <div class="row about align-items-center">
        <div class="col-md-12">
          <a href="https://github.com/LepuavkoDV/Volumetric" title="https://github.com/LepuavkoDV/Volumetric"><i class="fab fa-github"></i></a>
        </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'App',
};
</script>

<style lang="scss">
@import './assets/sass/app.scss';
</style>
