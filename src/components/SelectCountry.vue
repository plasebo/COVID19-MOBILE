<template>
  <div class="selectWrapper">
    <f7-button :class="{'marginHeaderLess': countryCodeSelected !== ''}"
      color="blue"
      fill
      raised
      round
      large
      class="display-inline-block padding-horizontal"
      @click.prevent="displayCascade"
      :disabled="remoteLoading"
    >Choose a country to proceed</f7-button>

    <v-cascade
      filterable
      :data="countryCodeOptions"
      :loading="remoteLoading"
      :scrollable="true"
      :autoFocus="false"
      placeholder="Search for a country"
      v-model="remoteModal"
      noFoundStr="No country found"
      :title="['Choose a country']"
      addClass="cascade-remote"
      @success="changeCountry"
    ></v-cascade>

    <h3 class="toUpperCase" v-if="countryCodeSelected !== ''">Country selected is: <b>{{countryCodeSelected}}</b></h3>
  </div>
</template>

<script>
import { APIServiceCovid } from "@/js/APIServiceCovid";

const apiServiceCovid = new APIServiceCovid();
export default {
  name: "selectCountry",
  components: {},
  data() {
    return {
      remoteModal: false,
      remoteLoading: false,
      isLoading: true,
      countryCodeSelected: "",
      countryCodeOptions: []
    };
  },
  computed: {
  },
  methods: {
    displayCascade() {
      this.countryCodeSelected = '';
      this.$emit("countryselected", "");
      this.remoteModal = true;
    },
    changeCountry(country) {
      this.countryCodeSelected = country.path[0];
      this.$emit("countryselected", country.path[0]);
    },
    fetchCountryData() {
      this.isLoading = true;
      this.countryCodeOptions = [];
      apiServiceCovid
        .fetchCountryList()
        .then(data => {
          let countries = [];
          data.countries.forEach(function(val) {
            let value = val.name.toString().toLowerCase();
            countries.push({
              key: value,
              label: value
            });
          });
          this.countryCodeOptions = countries;
        })
        .then(() => {
          // this.renderChartData();
        })
        .catch(error => {
          console.error(error);
        })
        .finally(() => {
          this.isLoading = false;
        });
    }
  },
  created() {
    this.fetchCountryData();
  }
};
</script>

<style scoped>
</style>
