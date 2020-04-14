<template>
  <div class="chartWrapper">
    <content-loader :is-loading="isLoading" @refresh-data="renderDataChart">
      <template v-slot:content>
        <f7-block>
          <f7-row>
            <f7-col width="100" xsmall="100" medium="50" class="rel">
              <f7-row>
                <f7-col width="100" xsmall="100">
                  <f7-card outline>
                    <f7-card-content>
                      <h3>
                        Confirmed today
                        <f7-chip
                          class="float-right"
                          :text="MUData.todayCases | numeralFormat"
                          media-bg-color="orange"
                        >
                          <f7-icon
                            slot="media"
                            f7="calendar"
                          ></f7-icon>
                        </f7-chip>
                      </h3>
                    </f7-card-content>
                  </f7-card>
                </f7-col>
                <f7-col width="100" xsmall="100" medium="50">
                  <f7-card class="rel" outline>
                    <f7-card-content>
                      <h3 text-color="yellow">
                        Confirmed:
                        <f7-chip
                          class="float-right"
                          :text="MUData.cases | numeralFormat"
                          media-bg-color="yellow"
                        >
                          <f7-icon
                            slot="media"
                            f7="person_2_square_stack"
                          ></f7-icon>
                        </f7-chip>
                        <br />
                        <small>with {{MUData.tests | numeralFormat}} tests</small>
                      </h3>
                      <f7-range
                        color="yellow"
                        disabled
                        :min="0"
                        :max="MUData.cases"
                        :value="MUData.cases"
                      ></f7-range>
                      <trend
                        :data="trendData"
                        class="trendy"
                        :gradient="['#fbc02d', '#f9a825', '#ef6c00']"
                        auto-draw
                        smooth
                      ></trend>
                    </f7-card-content>
                  </f7-card>
                </f7-col>

                <f7-col width="100" xsmall="100" medium="50">
                  <f7-card class="rel" outline>
                    <f7-card-content>
                      <h3 text-color="red">
                        Death
                        <f7-chip
                          class="float-right"
                          :text="MUData.deaths | numeralFormat"
                          media-bg-color="red"
                        >
                          <f7-icon
                            slot="media"
                            f7="multiply"
                          ></f7-icon>
                        </f7-chip>
                        <br />
                        <small>with {{MUData.todayDeaths | numeralFormat}} death today</small>
                      </h3>
                      <f7-range
                        color="red"
                        disabled
                        :min="0"
                        :max="MUData.cases"
                        :value="MUData.deaths"
                      ></f7-range>
                      <trend
                        :data="trendDeathData"
                        class="trendy"
                        :gradient="['#d32f2f', '#c62828', '#b71c1c']"
                        auto-draw
                        smooth
                      ></trend>
                    </f7-card-content>
                  </f7-card>
                </f7-col>

                <f7-col width="100" xsmall="100" medium="50">
                  <f7-card class="rel" outline>
                    <f7-card-content>
                      <h3 text-color="green">
                        Recovered:
                        <f7-chip
                          class="float-right"
                          :text="MUData.recovered | numeralFormat"
                          media-bg-color="green"
                        >
                          <f7-icon
                            slot="media"
                            f7="checkmark_alt"
                          ></f7-icon>
                        </f7-chip>
                      </h3>
                      <f7-range
                        color="green"
                        disabled
                        :label="true"
                        :min="0"
                        :max="MUData.cases"
                        :value="MUData.recovered"
                      ></f7-range>
                    </f7-card-content>
                  </f7-card>
                </f7-col>

                <f7-col width="100" xsmall="100" medium="50">
                  <f7-card class="rel" outline>
                    <f7-card-content>
                      <h3 text-color="gray">
                        Still active
                        <f7-chip
                          class="float-right"
                          :text="MUData.active | numeralFormat"
                          media-bg-color="gray"
                        >
                          <f7-icon
                            slot="media"
                            f7="bed_double"
                          ></f7-icon>
                        </f7-chip>
                        <!-- <br />
                        <small>with {{MUData.critical | numeralFormat}} critical</small> -->
                      </h3>
                      <f7-range
                        color="gray"
                        disabled
                        :min="0"
                        :max="MUData.cases"
                        :value="MUData.active"
                      ></f7-range>
                    </f7-card-content>
                  </f7-card>
                </f7-col>

                <f7-col width="100" xsmall="100">
                  <h4
                    class="text-align-center"
                  >Last updated on: {{MUData.updated | moment("dddd, Do MMMM YYYY")}}</h4>
                </f7-col>
              </f7-row>
            </f7-col>

            <f7-col width="100" xsmall="100" medium="50" class="rel">
              <trend
                :data="trendData"
                class="trend"
                :gradient="['#fbc02d', '#f9a825', '#f57f17']"
                auto-draw
                smooth
              ></trend>
              <trend
                :data="trendDeathData"
                class="trend"
                style="height:500px;"
                :gradient="['#d32f2f', '#c62828', '#b71c1c']"
                auto-draw
                smooth
              ></trend>
              <v-chart :options="chartOptions" autoresize />
            </f7-col>

          </f7-row>
        </f7-block>
      </template>
    </content-loader>
  </div>
</template>

<script>
import { APIServiceCovid } from "@/js/APIServiceCovid";
import ECharts from "vue-echarts";
import "echarts/lib/chart/bar";
import "echarts/lib/chart/line";
import "echarts/lib/chart/pie";
import "echarts/lib/component/tooltip";
import "echarts/lib/component/legend";
import "echarts/lib/component/title";
import "echarts/lib/component/dataZoom";

import ContentLoader from "@/components/ContentLoader";
import moment from "moment";
const apiServiceCovid = new APIServiceCovid();
export default {
  name: "SummaryMauritius",
  components: {
    ContentLoader,
    "v-chart": ECharts
  },
  props: {
    'countryToFetch': {
      type: String,
      required: true,
      default: 'Mauritius'
    },
  },
  data() {
    return {
      isLoading: true,
      trendData: [],
      trendDeathData: [],
      MUData: [],
      chartOptions: {
        color: ["#ef6c00", "#b71c1c", "#119e47"],
        title: {
          text: "",
          textStyle: {
            fontFamily: "Poppins"
          }
        },
        tooltip: {
          trigger: "axis",
          axisPointer: [
            {
              type: "shadow"
            }
          ]
        },
        legend: {
          orient: "vertical",
          right: 25,
          top: 25,
          data: ["Cases", "Death", "Recovered"]
        },
        series: [
          {
            type: "pie",
            radius: ["40%", "80%"],
            avoidLabelOverlap: true,
            label: {
              position: "outer",
              alignTo: "none",
              bleedMargin: 5,
              fontSize: "15",
              fontWeight: "normal",
              fontName: "Poppins",
            },
            emphasis: {
              label: {
                show: true,
                fontSize: "15",
                fontWeight: "600",
                fontName: "Poppins"
              }
            },
            labelLine: {
              show: true
            },
            tooltip: {
              trigger: "item",
              formatter: "{b} : {c} ({d}%)"
            },
            selectedMode: "single",
            data: [
              {
                value: null,
                name: "Cases",
                itemStyle: { normal: { color: "#ef6c00" } }
              },
              {
                value: null,
                name: "Death",
                itemStyle: { normal: { color: "#b71c1c" } }
              },
              {
                value: null,
                name: "Recovered",
                itemStyle: { normal: { color: "#119e47" } }
              }
            ]
          }
        ]
      }
    };
  },
  methods: {
    renderDataChart() {
      this.isLoading = true;
      (this.chartData = []),
        apiServiceCovid
          .fetchToday(this.countryToFetch)
          .then(data => {
            this.MUData = data;
            this.chartOptions.series[0].data[0].value = data.cases;
            if (data.deaths != 0) {
              this.chartOptions.series[0].data[1].value = data.deaths;
            }
            if (data.recovered != 0) {
              this.chartOptions.series[0].data[2].value = data.recovered;
            }
            this.renderDataTrendDaily();
          })
          .catch(error => {
            console.error(error);
          })
          .finally(error => {
            this.isLoading = false;
          });
    },
    renderDataTrendDaily() {
      this.isLoading = true;
      (this.chartData = []),
        apiServiceCovid
          .fetchHistory(this.countryToFetch)
          .then(data => {
            if (this.countryToFetch !== 'all') {
              this.trendData = Object.values(data.timeline.cases);
              this.trendDeathData = Object.values(data.timeline.deaths);
            } else {
              this.trendData = Object.values(data.cases);
              this.trendDeathData = Object.values(data.deaths);
            }
          })
          .catch(error => {
            console.error(error);
          })
          .finally(error => {
            this.isLoading = false;
          });
    }
  },
  created() {
    this.renderDataChart();
    this.renderDataTrendDaily();
  }
};
</script>

<style scoped>
</style>
