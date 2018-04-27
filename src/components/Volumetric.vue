<script>
/* eslint-disable */
export default {
  created() {
  },
  data() {
    return {
      list: [],
      diameter: null,
      length: null,
      amount: null,
    }
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
    calculateVolume() {
      const pi = 3.1415;
      let volume = {
        diameter: this.diameter,
        length: this.length,
        amount: this.amount,
        volume: (pi * (Math.pow((this.diameter/2), 2)/10000) * this.length) * this.amount,
      }
      this.list.push(volume);
      this.diameter = this.length = this.amount = null;
    },
    print() {
      var data=document.getElementById('printMe').innerHTML;
      var myWindow = window.open('', 'Print', 'height=400,width=600');
      myWindow.document.write('<html><head><title>Print</title>');
      myWindow.document.write('<link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.1.0/css/bootstrap.min.css" integrity="sha384-9gVQ4dYFwwWSjIDZnLEWnxCjeSWFphJiwGPXr1jddIhOegiu1FwO5qRGvFXOdJZ4" crossorigin="anonymous">');
      myWindow.document.write('</head><body >');
      myWindow.document.write(data);
      myWindow.document.write('</body></html>');
      myWindow.document.close(); // necessary for IE >= 10
      myWindow.onload=function(){ // necessary if the div contain images
          myWindow.focus(); // necessary for IE >= 10
          myWindow.print();
          myWindow.close();
      }
    },
  },
};
</script>

<template>
  <div class="row align-items-center volumetric-container">
    <div class="col">
      <div class="card">
        <div class="card-header">
          <h5 class="card-title"><span v-lang.title></span></h5>
        </div>
        <div class="card-body">
          <form v-on:submit.prevent="calculateVolume()">
            <div class="form-group">
              <label for="diameter"><span v-lang.diameterLabel></span></label>
              <input type="number" class="form-control" id="diameter" aria-describedby="diameterHelp" v-model="diameter" min="1" required>
              <small id="diameterHelp" class="form-text text-muted"></small>
            </div>
            <div class="form-group">
              <label for="length"><span v-lang.lengthLabel></span></label>
              <input type="number" class="form-control" id="length" v-model="length" min="1" required>
            </div>
            <div class="form-group">
              <label for="amount"><span v-lang.amountLabel></span></label>
              <input type="number" class="form-control" id="amount" v-model="amount" min="1" required>
            </div>
            <button type="submit" class="btn btn-primary"><span v-lang.submit></span></button>
          </form>
          <div id="printMe" class="resultsTable" v-if="list.length > 0">
            <table class="table table-striped">
              <thead>
                <tr>
                  <th><span v-lang.diameterLabel></span></th>
                  <th><span v-lang.lengthLabel></span></th>
                  <th><span v-lang.amountLabel></span></th>
                  <th><span v-lang.volumeLabel></span></th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="vol in list">
                  <td>{{vol.diameter}}</td>
                  <td>{{vol.length}}</td>
                  <td>{{vol.amount}}</td>
                  <td>{{vol.volume.toFixed(3)}}</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
        <div class="card-footer">
          <button v-if="list.length > 0" class="btn btn-outline-primary btn-sm" v-on:click.prevent="print"><span v-lang.print></span></button>
          <div class="float-right lang-switcher">
            <a v-on:click.prevent="setLanguage('ru')" v-bind:class="currentLanguage('ru')">ru</a> &#9900; <a v-on:click.prevent="setLanguage('ua')" v-bind:class="currentLanguage('ua')">ua</a> &#9900; <a v-on:click.prevent="setLanguage('en')" v-bind:class="currentLanguage('en')">en</a>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
