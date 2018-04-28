<script>
/* eslint-disable */
import LangSwitcher from './../lang/LangSwitcher';
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
  computed: {
    fCalcTotalVolume: function () {
      var tbTotalVolume = 0;
      for (var i = 0; i < this.list.length; ++i) {
        tbTotalVolume = tbTotalVolume + this.list[i].volume;
      }
      return tbTotalVolume;
    }
  },
  components: {
    LangSwitcher,
  },
  methods: {
    addEntry() {
      let volume = {
        diameter: this.diameter,
        length: this.length,
        amount: this.amount,
        volume: this.calculateVolume(),
      }
      this.list.push(volume);
      this.diameter = this.length = this.amount = null;
    },
    calculateVolume() {
      const pi = 3.1415;
      let radius = (this.diameter/2) / 100;
      let r2 = Math.pow(radius, 2);
      let vol = pi * r2 * this.length;
      return vol * this.amount;
    },
    print() {
      var data=document.getElementById('printMe').innerHTML;
      var myWindow = window.open('', '', 'height=400,width=600');
      myWindow.document.write('<html><head><title></title>');
      myWindow.document.write('<link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.1.0/css/bootstrap.min.css" integrity="sha384-9gVQ4dYFwwWSjIDZnLEWnxCjeSWFphJiwGPXr1jddIhOegiu1FwO5qRGvFXOdJZ4" crossorigin="anonymous">');
      myWindow.document.write('<style>@page{margin: 20mm 10mm;}</style>');
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
    reset() {
      this.list = [];
    },
  },
};
</script>

<template>
  <div class="row align-items-center volumetric-container">
    <div class="col-md-6 offset-md-3">
      <div class="card">
        <div class="card-header">
          <h5 class="card-title"><i class="fas fa-calculator"></i>&nbsp;<span v-lang.title></span></h5>
        </div>
        <div class="card-body">
          <form v-on:submit.prevent="addEntry()">
            <div class="form-group">
              <label for="diameter"><span v-lang.diameterLabel></span></label>
              <input type="number" class="form-control" id="diameter" aria-describedby="diameterHelp" v-model="diameter" min="1" required>
              <small id="diameterHelp" class="form-text text-muted"></small>
            </div>
            <div class="form-group">
              <label for="length"><span v-lang.lengthLabel></span></label>
              <input type="number" class="form-control" id="length" v-model="length" min="1" step="0.1" required>
            </div>
            <div class="form-group">
              <label for="amount"><span v-lang.amountLabel></span></label>
              <input type="number" class="form-control" id="amount" v-model="amount" min="1" required>
            </div>
            <button type="submit" class="btn btn-primary"><i class="fas fa-archive"></i>&nbsp;<span v-lang.submit></span></button>
            <button v-if="list.length > 0" class="btn btn-danger float-right" v-on:click.prevent="reset"><i class="fas fa-undo"></i>&nbsp;<span v-lang.reset></span></button>
          </form>
          <div id="printMe" class="resultsTable" v-if="list.length > 0">
            <table class="table table-responsive-md">
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
                <tr class="table-primary">
                  <td colspan="2"></td>
                  <td><span v-lang.total></span>:</td>
                  <td>{{fCalcTotalVolume.toFixed(3)}}</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
        <div class="card-footer">
          <button v-if="list.length > 0" class="btn btn-outline-primary btn-sm" v-on:click.prevent="print"><i class="fas fa-print"></i>&nbsp;<span v-lang.print></span></button>
          <LangSwitcher></LangSwitcher>
        </div>
      </div>
    </div>
  </div>
</template>
