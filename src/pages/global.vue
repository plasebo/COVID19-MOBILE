<template>
  <f7-page name="global">
    <!-- Top Navbar -->
    <f7-navbar>
      <f7-nav-left>
        <f7-link icon-ios="f7:menu" icon-aurora="f7:menu" icon-md="material:menu" panel-open="left"></f7-link>
      </f7-nav-left>
      <f7-nav-title sliding>Worldwide stats</f7-nav-title>
      <f7-nav-right>
        <f7-link
          icon-ios="f7:menu"
          icon-aurora="f7:menu"
          icon-md="material:menu"
          panel-open="right"
        ></f7-link>
      </f7-nav-right>
      <f7-nav-title-large sliding>Worldwide stats</f7-nav-title-large>
    </f7-navbar>

    <f7-block>
      <f7-block-title
        medium
        class="text-align-center no-margin-bottom"
        style="margin-top: 4em;"
      >Today statistics</f7-block-title>
      <summary-component countryToFetch="all" />
    </f7-block>
    <!-- <f7-block>
      <world-map-component />
    </f7-block> -->
    <f7-block>
      <f7-block-title medium class="text-align-center no-margin">Trend</f7-block-title>
      <daily-component countryToFetch="all" />
    </f7-block>
  </f7-page>
</template>
<script>
import SummaryComponent from "@/components/Summary.vue";
// import WorldMapComponent from "@/components/WorldMap.vue";
import DailyComponent from "@/components/TrendDaily.vue";

export default {
  components: {
    SummaryComponent,
    DailyComponent,
    // WorldMapComponent
  },
  data() {
    return {};
  },
  methods: {},
  mounted() {
    this.$f7ready(f7 => {});
  }
};
</script>
