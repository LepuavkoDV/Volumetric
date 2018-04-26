<script>
export default {
  created() {
  },
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
  },
};
</script>

<template>
  <div class="row align-items-center volumetric-container">
    <div class="col">
      <div class="card">
        <div class="card-header">
          <h5 class="card-title"><p v-lang.title></p></h5>
        </div>
        <div class="card-body">
          <form>
            <div class="form-group">
              <label for="exampleInputEmail1">Email address</label>
              <input type="email" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Enter email">
              <small id="emailHelp" class="form-text text-muted">We'll never share your email with anyone else.</small>
            </div>
            <div class="form-group">
              <label for="exampleInputPassword1">Password</label>
              <input type="password" class="form-control" id="exampleInputPassword1" placeholder="Password">
            </div>
            <div class="form-group form-check">
              <input type="checkbox" class="form-check-input" id="exampleCheck1">
              <label class="form-check-label" for="exampleCheck1">Check me out</label>
            </div>
            <button type="submit" class="btn btn-primary">Submit</button>
          </form>
        </div>
        <div class="card-footer">
          <div class="float-right lang-switcher">
            <a v-on:click.prevent="setLanguage('ua')" v-bind:class="currentLanguage('ua')">ua</a> &#9900; <a v-on:click.prevent="setLanguage('ru')" v-bind:class="currentLanguage('ru')">ru</a> &#9900; <a v-on:click.prevent="setLanguage('en')" v-bind:class="currentLanguage('en')">en</a>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
