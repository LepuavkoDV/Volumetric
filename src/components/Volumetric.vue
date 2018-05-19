<script>
/* eslint-disable */
import LangSwitcher from './../lang/LangSwitcher';
import Round from './../modules/Round';
import PrintPage from './../modules/PrintPage';
import CalculateVolume from './../modules/CalculateVolume';
export default {
  created() {
  },
  data() {
    return {
      list: [],
      decimalPlaces: 3,
      diameter: null,
      length: null,
      amount: null,
      deflectionFactor: 1.1936,
      calculationStandarts: [
        {val: 1.1936, name: 'gost270875'},
        {val: 1.1551, name: 'iso448043'},
        {val: 1, name: 'roundlogs'},
      ]
    }
  },
  computed: {
    fCalcTotalVolume: function () {
      var tbTotalVolume = 0;
      for (var i = 0; i < this.list.length; ++i) {
        tbTotalVolume = tbTotalVolume + this.list[i].volume;
      }
      return Round(tbTotalVolume, this.decimalPlaces);
    },
    fGetCurrentCalculationName: function() {
      let that = this;
      var entry = this.calculationStandarts.find(function(i) {
        return i.val === parseFloat(that.deflectionFactor);
      });
      return this.translate(entry.name);
    },
  },
  components: {
    LangSwitcher,
  },
  methods: {
    createEntry(data) {
      data.volume = Round(CalculateVolume(data), this.decimalPlaces);
      return data;
    },
    addEntryToList() {
      let entry = this.createEntry({
        diameter: this.diameter,
        length: this.length,
        amount: this.amount,
        deflectionFactor: this.deflectionFactor
      });
      this.list.push(entry);
      this.diameter = this.length = this.amount = null;
    },
    recalculateEntriesInList() {
      let recalculatedList = [];
      for (var i = 0; i < this.list.length; ++i) {
        let entry = this.createEntry({
          diameter: this.list[i].diameter,
          length: this.list[i].length,
          amount: this.list[i].amount,
          deflectionFactor: this.deflectionFactor
        });
        recalculatedList.push(entry);
      }
      this.list = recalculatedList;
    },
    resetList() {
      this.list = [];
    },
    print() {
      PrintPage('printMe');
    },
    translateKey: function(key) {
      return this.translate(key);
    }
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
          <form v-on:submit.prevent="addEntryToList()">
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
            <div class="form-group">
              <label for="deflectionFactor"><span v-lang.calculations></span></label>
              <select v-on:change="recalculateEntriesInList" class="form-control" id="deflectionFactor" v-model="deflectionFactor">
                <option v-for="entry in calculationStandarts" :key="entry.val" :value="entry.val">{{translateKey(entry.name)}}</option>
              </select>
            </div>
            <button type="submit" class="btn btn-primary"><i class="fas fa-archive"></i>&nbsp;<span v-lang.submit></span></button>
            <button v-if="list.length > 0" class="btn btn-outline-danger float-right" v-on:click.prevent="resetList"><i class="fas fa-undo"></i>&nbsp;<span v-lang.reset></span></button>
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
                <tr v-for="vol in list" :key="vol.volume">
                  <td>{{vol.diameter}}</td>
                  <td>{{vol.length}}</td>
                  <td>{{vol.amount}}</td>
                  <td>{{vol.volume}}</td>
                </tr>
                <tr class="table-info">
                  <td colspan="2"></td>
                  <td><span v-lang.total></span>:</td>
                  <td>{{fCalcTotalVolume}}</td>
                </tr>
              </tbody>
            </table>
            <div class="calc-info">
              <span v-lang.calculations></span>:&nbsp;{{fGetCurrentCalculationName}}
            </div>
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
