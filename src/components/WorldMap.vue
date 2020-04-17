<template>
  <div class="chartWrapper">
    <content-loader :is-loading="isLoading" @refresh-data="renderMap">
      <template v-slot:content>
        <f7-block>
        <f7-row>
          <f7-col width="100" class="rel">
          <trend :data="trendData" class="trend"
          :gradient="['#fbc02d', '#f9a825', '#f57f17']" 
          auto-draw smooth></trend>
          <trend :data="trendDeathData" class="trend" style="height:500px;"
          :gradient="['#d32f2f', '#c62828', '#b71c1c']" 
          auto-draw smooth></trend>
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
import ECharts from 'vue-echarts';
import 'echarts/lib/chart/map'
import 'echarts/lib/component/geo'
import 'echarts/lib/component/tooltip'
import 'echarts/lib/component/legend'
import 'echarts/lib/component/title'
import 'echarts/map/js/world'
import 'zrender/lib/svg/svg'

import ContentLoader from "@/components/ContentLoader";
import moment from "moment";
const apiServiceCovid = new APIServiceCovid();
export default {
  name: "WorldMap",
  components: {
    ContentLoader,
    'v-chart': ECharts
  },
  data() {
    return {
      isLoading: true,
      trendData: [],
      trendDeathData: [],
      chartOptions: {
        color: ['#ef6c00', '#b71c1c', '#119e47'],
        title: {
            text: '',
            textStyle: {
              fontFamily: 'Poppins'
            }
        },
        tooltip: {
          trigger: 'axis',
          axisPointer: [{
            type: 'shadow'
          }],
        },
        legend: {
          data: ['Positive cases', 'Death', 'Recovered']
        },
        grid: {
          top: '10%',
          left: '1%',
          right: '5%',
          bottom: '10%',
          containLabel: true
        },
        xAxis: {
            type: 'category',
            boundaryGap: false,
            scale: false,
            splitArea: {
              show: false
            },
            splitLine: {
              show: false
            },
            axisLine: { 
              show: false
            },
            axisLabel : {
              show: true,
              formatter: function (value, index) {
                  return moment(value).format("DD/MM")
              },
            },
            data: []
        },
        yAxis: {
            type: 'value',
            boundaryGap: false,
            scale: false,
            splitArea: {
                show: false
            },
            axisLine: { 
              show: true
            },
        },
        dataZoom: [
        {
          type: 'slider',
          xAxisIndex: 0,
          start: 84,
          end: 100
        },
        ],
        series: [{
          name: 'Positive cases',
          type: 'bar',
          label: {
            show: true,
            position: 'outside'
          },
          data: [],
        }, 
        {
          name: 'Death',
          type: 'bar',
          stack: 'one',
          label: {
            show: false,
          },
          data: []
          
        },
        {
          name: 'Recovered',
          type: 'bar',
          stack: 'one',
          label: {
            show: false,
          },
          data: []
          
        },
        ]
      }
    }
  },
  methods: {
    renderMap() {
      this.isLoading = true;
      (this.chartData = []),
        apiServiceCovid.fetchHistory(this.countryToFetch)
          .then(data => {
            if (this.countryToFetch !== 'all') {
              this.chartOptions.xAxis.data = Object.keys(data.timeline.cases);
              this.chartOptions.series[0].data = Object.values(data.timeline.cases);
              this.chartOptions.series[1].data = Object.values(data.timeline.deaths);
              this.chartOptions.series[2].data = Object.values(data.timeline.recovered);
              this.trendData = Object.values(data.timeline.cases);
              this.trendDeathData = Object.values(data.timeline.deaths);
            } else {
              this.chartOptions.xAxis.data = Object.keys(data.cases);
              this.chartOptions.series[0].data = Object.values(data.cases);
              this.chartOptions.series[1].data = Object.values(data.deaths);
              this.chartOptions.series[2].data = Object.values(data.recovered);
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
    this.renderMap();
  }
};
</script>

<style scoped>
</style>
