<template>
<f7-app :params="f7params">

  <!-- Left panel with cover effect-->
  <f7-panel left cover theme-dark>
    <f7-view>
      <f7-page>
        <f7-navbar title="Navigation"></f7-navbar>
        <!-- <f7-block>Credits to:</f7-block> -->
        <f7-list>
          <f7-list-button>
            <f7-link color="white" tab-link="#view-mu" text="Mauritius"></f7-link>    
          </f7-list-button>
          <f7-list-button>
            <f7-link color="white" tab-link="#view-global" text="Worldwide stats"></f7-link>
          </f7-list-button>
          <f7-list-button>
            <f7-link color="white" tab-link="#view-country" text="By country"></f7-link>
          </f7-list-button>
          <f7-list-item header="Ress ou lakaz" title="Stay home, stay safe">
            <f7-icon f7="checkmark_seal_fill"></f7-icon>
          </f7-list-item>
        </f7-list>
      </f7-page>
    </f7-view>
  </f7-panel>


  <!-- Right panel with reveal effect-->
  <f7-panel right reveal theme-dark>
    <f7-view>
      <f7-page>
        <f7-navbar title="Credits"></f7-navbar>
        <!-- <f7-block>Credits to:</f7-block> -->
        <f7-list>
          <f7-list-item link="https://github.com/novelcovid/api" external header="Live tracker" title="NovelCovid" after="API">
          </f7-list-item>
          <f7-list-item link="https://github.com/mathdroid" external header="Country list" title="Mathdroid" after="API">
          </f7-list-item>
          <f7-list-item link="https://mns.mu" external header="Company" title="Mauritius Network Services Ltd.">
          </f7-list-item>
          <f7-list-item header="Developer" title="Shane Permalloo">
            <f7-icon f7="person_alt_circle_fill"></f7-icon>
          </f7-list-item>
          <f7-list-item header="Made with love" title="in Moris">
            <f7-icon f7="heart_circle_fill"></f7-icon>
          </f7-list-item>
          <f7-list-item header="Ress ou lakaz" title="Stay home, stay safe">
            <f7-icon f7="checkmark_seal_fill"></f7-icon>
          </f7-list-item>
        </f7-list>
      </f7-page>
    </f7-view>
  </f7-panel>

  <!-- Views/Tabs container -->
  <f7-views tabs class="safe-areas">

    <!-- Tabbar for switching views-tabs -->
    <f7-toolbar tabbar labels bottom>
      <f7-link tab-link="#view-mu" tab-link-active icon-ios="f7:house_fill" icon-aurora="f7:house_fill" icon-md="material:home" text="Mauritius"></f7-link>
      <f7-link tab-link="#view-global" icon-ios="f7:chart_pie_fill" icon-aurora="f7:chart_pie_fill" icon-md="material:pie_chart" text="Worldwide stats"></f7-link>
      <f7-link tab-link="#view-country" icon-ios="f7:map_fill" icon-aurora="f7:map_fill" icon-md="material:map" text="By country"></f7-link>
    </f7-toolbar>

    <!-- Your main view/tab, should have "view-main" class. It also has "tab-active" class -->
    <f7-view id="view-mu" name="Mauritius" main tab tab-active url="/"></f7-view>

    <!-- Catalog View -->
    <f7-view id="view-global" name="Worldwide stats" tab url="/global/"></f7-view>

    <!-- Settings View -->
    <f7-view id="view-country" name="Country" tab url="/country/"></f7-view>

  </f7-views>

</f7-app>
</template>
<script>

  import routes from '../js/routes.js';

  export default {
    data() {
      return {
        // Framework7 Parameters
        f7params: {
          name: 'Covid19-MU', // App name
          theme: 'auto', // Automatic theme detection
          // App root data
          data: function () {
            return {

            };
          },

          // App routes
          routes: routes,
        },
      }
    },
    methods: {
    },
    mounted() {
      this.$f7ready((f7) => {
        // f7.dialog.alert('Component mounted');
        // Call F7 APIs here
      });
    }
  }
</script>