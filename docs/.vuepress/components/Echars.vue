<template>
  <div>
    <div id="echars"></div>
    <input type="text" v-model="k" />
    <input type="text" v-model="b" />
    <input type="text" v-model="num" />
    <input type="text" v-model="option.dataZoom[0].startValue" />
    <input type="text" v-model="option.dataZoom[0].endValue" />
    <input type="text" v-model="option.dataZoom[1].startValue" />
    <input type="text" v-model="option.dataZoom[1].endValue" />
  </div>
</template>

<script>
export default {
  mounted() {
    import("../public/echarts.min.js").then((echarts) => {
      const box = document.getElementById("echars");
      this.option.series[0].data = this.generateData();
      let myChart = echarts.init(box);
      this.myChart = myChart;
      this.draw();
    });
  },
  data() {
    return {
      myChart: null,
      k: 0,
      b: 0,
      num: 10,
      option: {
        animation: false,
        grid: {
          top: 40,
          left: 50,
          right: 40,
          bottom: 50,
        },
        xAxis: {
          name: "x",
          min: -100,
          max: 100,
          minorTick: {
            show: true,
          },
          minorSplitLine: {
            show: true,
          },
        },
        yAxis: {
          name: "y",
          min: -100,
          max: 100,
          minorTick: {
            show: true,
          },
          minorSplitLine: {
            show: true,
          },
        },
        dataZoom: [
          {
            show: true,
            type: "inside",
            filterMode: "none",
            xAxisIndex: [0],
            startValue: -5,
            endValue: 5,
          },
          {
            show: true,
            type: "inside",
            filterMode: "none",
            yAxisIndex: [0],
            startValue: -5,
            endValue: 5,
          },
        ],
        series: [
          {
            type: "line",
            showSymbol: false,
            clip: true,
            data: null,
          },
        ],
      },
    };
  },
  methods: {
    draw(){
      this.option.series[0].data = this.generateData();
      this.myChart.setOption(this.option);
    },
    generateData() {
      let data = [];
      for (let i = -this.num; i <= this.num; i += 1) {
        data.push([i, this.func(i)]);
      }
      return data;
    },
    func(x) {
      return this.k * x + this.b;
    },
  },
  watch: {
    k() {
      this.draw();
      console.log(this.k);
    },
    b() {
      this.draw();
      console.log(this.k);
    },
  },
};
</script>

<style>
#echars {
  width: 100%;
  height: 400px;
}
</style>