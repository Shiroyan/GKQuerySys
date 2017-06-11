<template>
  <div id="score-chart-container">
    <tab active-color="#ff0000" defaultColor="#fff" bar-active-color="#fff" style="background-color: #222"
         v-model="index">
      <tab-item>表格</tab-item>
      <tab-item>折线图</tab-item>
    </tab>
    <swiper :show-dots="false" v-model="index" ref="swiper" height="1500px" :threshold="200" :min-moving-distance="100">
      <swiper-item>
        <div id="table-wrap" style="">
          <div class="table" v-for="table in tables">
            <h3 class="title">{{table.title}}</h3>
            <x-table :cell-bordered="false">
              <thead>
              <tr>
                <td></td>
                <td>2014</td>
                <td>2015</td>
                <td>2016</td>
              </tr>
              </thead>
              <tbody>
              <tr>
                <td>最低排位</td>
                <!--<template v-if="table.minRank && table.minRank.length == 0">
                  <td>-</td>
                  <td>-</td>
                  <td>-</td>
                </template>
                <template v-else>
                </template> -->
                <td v-for="item in table.minRank">{{item == 0 ? '-' : (item * 1000)}}</td>
              </tr>
              <tr>
                <td>控制线</td>
                <td v-for="item in table.ctrlLine">{{item == 0 ? '-': item}}</td>
              </tr>
              <tr>
                <td>最高分</td>
                <td v-for="item in table.max">{{item == 0 ? '-': item}}</td>
              </tr>
              <tr>
                <td>最低分</td>
                <td v-for="item in table.min">{{item == 0 ? '-': item}}</td>
              </tr>
              <tr>
                <td>均控差</td>
                <td v-for="item in table.overLine">{{item == 0 ? '-': item}}</td>
              </tr>
              </tbody>
            </x-table>
          </div>
        </div>
      </swiper-item>
      <swiper-item>
        <div id="chart-wrap" style="overflow-y: auto">
          <p class="tip">
            <span>* 详细信息可点击折线图上的点查看</span>
            <br>
            <span>* 点击下方图例可以隐藏折线及数据</span>
          </p>
          <hr style="border:1px solid #ddd; margin: 1rem 2rem">
          <div>
            <h3 class="title">历年投档分数线</h3>
            <div id="total-chart" class="chart"></div>
          </div>
          <hr style="border:1px solid #ddd; margin: 1rem 2rem">
          <div>
            <h3 class="title">历年专业分数线</h3>
            <div id="major-charts" ref="majorCharts"></div>
          </div>
        </div>
      </swiper-item>

    </swiper>
    <bottom-btn></bottom-btn>
  </div>
</template>
<script>
  //  let echarts = require('echarts/lib/echarts');
  //  require('echarts/lib/component/tooltip');
  //  require('echarts/lib/component/toolbox');
  //  require('echarts/lib/chart/line');
  //  require('echarts/lib/chart/bar');
  //  require('echarts/lib/component/legend');
  //  require('echarts/lib/component/title');

  import {store} from '../store';
  import {Tab, TabItem, XTable, SwiperItem} from 'vux';
  export default {
    components: {Tab, TabItem, XTable, SwiperItem},
    beforeRouteEnter(to, from, next) {
      console.log('enter');
      !store.state.scoreQueryResult && router.push('socreQuery');
      next();
    },
    data() {
      return {
        index: 0,
        store: store.state,
        totalTable: {},
        collegesTable: [],
        tables: [],
        province: '',
        totalChart: '',
        initChartOption: {
          color: ['#BD2010', '#E7BA10', '#639629', '#9C55AD'],
          title: {
            text: 'xxx分数线',
            x: 'center',
            top: 0,
            subtext: '点击图表以查看详情',
            textStyle: {
              fontSize: 14,
              color: '#fff',
            },
          },
          tooltip: {
            trigger: 'axis',
            axisPointer: {
              type: 'cross',
            }
          },
          legend: {
            data: ['最高分', '最低分', '控制线', '', '录取人数', '最低排位'],
            bottom: 0,
            left: 'center',
            orient: 'horizontal',
            padding: [0, 0],
            textStyle: {
              color: '#fff',
              fontSize: 10,
            }
          },
          xAxis: {
            type: 'category',
            data: [2014, 2015, 2016],
            axisLabel: {
              textStyle: {
                color: '#fff',
              }
            },
            splitLine: {
              show: false,
            }
          },
          yAxis: [
            {
              type: 'value',
              name: '分数',
              nameTextStyle: {color: '#fff'},
              position: 'left',
              interval: 50,
              min: 400,
              axisLabel: {textStyle: {color: '#fff',}},
              splitLine: {show: false,}
            },
            {
              type: 'value',
              name: '人数',
              nameTextStyle: {color: '#fff', fontSize: 10},
              position: 'right',
              offset: 0,
              nameRotate: 90,
              axisLabel: {textStyle: {color: '#fff',}, rotate: 90, margin: -5},
              splitLine: {show: false,}
            },
            {
              type: 'value',
              name: '×10³名',
              nameRotate: 90,
              nameTextStyle: {color: '#fff', fontSize: 10},
              position: 'right',
              offset: 20,
              axisLabel: {textStyle: {color: '#fff',}, rotate: 90, margin: -5},
              splitLine: {show: false,},
            }
          ],
          series: [
            {
              name: '最高分',
              type: 'line',
              data: [],
            },
            {
              name: '最低分',
              type: 'line',
              data: [],
            },
            {
              name: '控制线',
              type: 'line',
              data: [],
            },
            {
              name: '超出控制线',
              type: 'line',
              data: [],
            },
            {
              name: '录取人数',
              type: 'line',
              color: ['#000088'],
              data: [],
              yAxisIndex: 1,
            },
            {
              name: '最低排位',
              type: 'line',
              color: ['#fff'],
              data: [],
              yAxisIndex: 2,
            }
          ],
        }
      }
    },
    methods: {
      initChart() {
        console.log('init charts');
        this.totalChart = echarts.init(document.getElementById('total-chart'));
      },
      updateChart() {
        console.log('update');
        this.tables = [];
        //  抽取resData数据
        let total = this.store.scoreQueryResult.totalObjArray[0];

        //  先拿到省份信息
        this.province = total.province;
//      投档线数据处理 --begin
        let option = this.handleChartData(total);
        option.title.text = total.province + total.subject_type + '类' + total.total_recruit_type + '历年投档线';
        this.totalChart.setOption(option);

        this.tables.push(this.handleTableData(option));
//        投档线数据处理 --end


//        学院数据处理 -- begin
        let colleges = this.store.scoreQueryResult.majorObjArray;
        this.$refs.majorCharts.innerHTML = '';
        for (let i = 0; i < colleges.length; i++) {
          let college = colleges[i];
          // 创建图容器
          let ele = document.createElement('div');
          ele.className = 'chart';
          ele.id = 'chart-' + i;
          this.$refs.majorCharts.appendChild(ele);
          let chart = echarts.init(document.getElementById('chart-' + i));

          // 设置数据
          let option = this.handleChartData(college);
          option.title.text = college.major + ' ' + '专业历年分数线';
          chart.setOption(option);

          //  重设置title
          this.tables.push(this.handleTableData(option));
//        学院数据处理 --end
        }
      },

      /*
      传入服务器返回对象，把对象中的数据抽离放入chartOption中
      返回option对象
      * */
      handleChartData(data) {
        //  复制initOption对象
        let option = {};
        Object.assign(option, this.initChartOption);

        //  设置Y轴的值
        if (this.province == '西藏') {
          option.yAxis.min = 300;
        }

        let scoreObjArray = data.scoreObjArray;
        let series = option.series;
        //   数据清零
        for (let i = 0; i < series.length; i++) {
          series[i].data = [];
        }
        //   初始化数据
        for (let i = scoreObjArray.length - 1; i >= 0; i--) {
          let item = scoreObjArray[i];
          series[0].data.push(Number(item.max));
          series[1].data.push(Number(item.min));
          series[2].data.push(Number(item.control_line));
          series[3].data.push(Number(item.avg_over_line));
          series[4].data.push(Number(item.recruit_num));

          if (this.province == '广东') series[5].data.push(Number(item.min_rank) / 1000);
        }
        return option;
      },
      /*
      传入之前图处理好的option，把option.series中的data全部拿出来，为table服务
      返回一个对象
       */
      handleTableData(option) {
        let obj = {};
        obj.title = option.title.text;
        obj.max = option.series[0].data;
        obj.min = option.series[1].data;
        obj.ctrlLine = option.series[2].data;
        obj.overLine = option.series[3].data;
        obj.recruitNum = option.series[4].data;
        obj.minRank = option.series[5].data;
        return obj;
      },
    },
    mounted() {
      this.$nextTick(function () {
        console.log('mounted');
        this.initChart();
        this.updateChart();
      })
    },
    watch: {
      store: {
        deep: true,
        handler: function (oVal, nVal) {
          this.initChart();
          this.updateChart();
        }
      }
    }
  }
</script>

<style>
  #score-chart-container {
    height: 100%;
  }

  #chart-wrap,
  #table-wrap{
    box-sizing: border-box;
    padding: 20px 2px;
    height: 100%;
    background-color: #222;
  }
  #table-wrap {
    color: #fff;
  }
  #total-chart {
    margin: 10px auto;
  }

  .chart {
    width: 100%;
    height: 300px;
    margin: 30px auto;
  }

  .tip {
    margin-left: 10px;
    font-size: 10px;
    color: #ddd;
  }
  .table {
    margin-bottom: 30px;
  }
  .title {
    color: #ddd;
    margin-left: 20px;
    margin-bottom: 10px
  }

</style>
