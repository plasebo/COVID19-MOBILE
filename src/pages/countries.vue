<template>
  <f7-page name="settings">
    <!-- Top Navbar -->
    <f7-navbar>
      <f7-nav-left>
        <f7-link icon-ios="f7:menu" icon-aurora="f7:menu" icon-md="material:menu" panel-open="left"></f7-link>
      </f7-nav-left>
      <f7-nav-title sliding>Stats by country</f7-nav-title>
      <f7-nav-right>
        <f7-link
          icon-ios="f7:menu"
          icon-aurora="f7:menu"
          icon-md="material:menu"
          panel-open="right"
        ></f7-link>
      </f7-nav-right>
      <f7-nav-title-large sliding>Stats by country</f7-nav-title-large>
    </f7-navbar>
    <div class="countryWrapper">
    <f7-block :class="{ selectBlock: !hasCountry }" class="text-align-center">
      <select-component @countryselected="sendValue" @hasselected="checkHasCountry" />
    </f7-block>

    <f7-block v-if="countrySelected !== ''">
      <f7-block-title
        medium
        class="text-align-center no-margin"
      >Today statistics</f7-block-title>
      <summary-component :countryToFetch="countrySelected" />
    </f7-block>
    <f7-block v-if="countrySelected !== ''">
      <f7-block-title medium class="text-align-center no-margin">Trend</f7-block-title>
      <daily-component :countryToFetch="countrySelected" />
    </f7-block>
    </div>
  </f7-page>
</template>
<script>
import SelectComponent from "@/components/SelectCountry.vue";
import SummaryComponent from "@/components/Summary.vue";
import DailyComponent from "@/components/TrendDaily.vue";

export default {
  components: {
    SelectComponent,
    SummaryComponent,
    DailyComponent
  },
  data() {
    return {
      hasCountry: false,
      countrySelected: '',
    };
  },
  methods: {
    checkHasCountry(value) {
      this.hasCountry = value;
    },
    sendValue(value) {
      this.hasCountry = true;
      this.countrySelected = value;
    }
  },
  mounted() {
    this.$f7ready(f7 => {});
  }
};
</script>
