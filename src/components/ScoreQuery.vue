<template>
  <div style="margin-top: 2rem;">

    <popup-picker class="text" :title="'生源地'" :data="provinces" v-model="province"></popup-picker>
    <popup-picker v-show="province != ''" class="text" :title="'录取批次'" :data="recruitTypes"
                 v-model="recruitType"></popup-picker>
    <popup-picker v-show="province != ''" class="text" :title="'科目类别'" :data="subjectTypes"
                  v-model="subjectType"></popup-picker>
    <popup-picker v-show="province != '' && subjectType != ''" class="text" :title="'学院'" :data="colleges"
                  v-model="college"></popup-picker>

    <div class="btn">
      <x-button type="primary" rel="queryScore" @click.native="onSubmit()" style="font-size: 1rem"
                :show-loading="false">查询
      </x-button>
    </div>
    <hr style="border:1px solid #ddd; margin: 1rem 2rem">
    <toast v-model="isShowTip" type="text" position="middle" width="15em">{{searchTip}}</toast>
    <bottom-btn></bottom-btn>
  </div>
</template>
<script>
  import {PopupPicker, XButton, Toast} from 'vux';
  import BottomBtn from './BottomBtn.vue';
  import HttpApi from  '../httpApi';
  import {store} from '../store';
  const placeholder = '';
  export default {
    components: {
      PopupPicker,
      XButton,
      BottomBtn,
      Toast
    },
    data(){
      return {
        provinces: [['', '广东','安徽', '新疆','江西', '湖南','辽宁', '福建', '陕西', '黑龙江', '河南', '云南', '内蒙古', '重庆', '湖北', '四川', '贵州', '山东', '吉林', '海南', '广西', '河北', '浙江', '江苏', '山西', '甘肃',
        ]],
        subjectTypes: [['', '文史', '理工']],

        province: [placeholder],
        subjectType: [placeholder],
        college: [placeholder],
        recruitType: [placeholder],

        isShowTip: false,
        searchTip: ''
      }
    },
    watch: {
      province(newVal, oldVal) {
        if (newVal != oldVal || this.province == '') {
          this.subjectType = [placeholder];
          this.college = [placeholder];
          this.recruitType = [placeholder];
        }
      },
      subjectType(newVal, oldVal) {
        if (newVal != oldVal) {
          this.college = [placeholder];
        }
      }
    },
    computed: {
      colleges() {
        let colleges = [];
//        广东 文 & 理
        let both1 = ['人文学院', '传播学院', '外国语学院', '师范学院', '心理与社会学院', '法学院', '管理学院', '经济学院'];
//        广东 理科
        let scienceColleges1 = ['计算机与软件学院','信息工程学院', '光电工程学院', '化学与环境工程学院', '医学院', '土木工程学院', '建筑与城市规划学院', '数学与统计学院',
          '机电与控制工程学院（含轨道交通学院）', '材料学院', '深圳职业技术学院', '物理与能源学院', '生命与海洋科学学院', '电子科学与技术学院', '艺术设计学院'];
//        外省文科
        let artColleges2 = ['外国语学院', '法学院'];
//        外省理科
        let scienceColleges2 = ['计算机与软件学院','信息工程学院', '光电工程学院', '化学与环境工程学院', '医学院', '土木工程学院', '建筑与城市规划学院', '数学与统计学院', '新疆双语预科班', '机电与控制工程学院（含轨道交通学院）',
          '材料学院', '物理与能源学院', '生命与海洋科学学院', '电子科学与技术学院',  '师范学院'];
//        外省文 & 理
        let both2 = ['人文学院', '传播学院', '心理与社会学院', '管理学院', '经济学院'];
        if (this.province == '广东' && this.subjectType != '') {
          if (this.subjectType == '文史') {
            colleges.push(['',].concat(both1));
          }
          else {
            colleges.push(['',].concat(both1, scienceColleges1));
          }
        } else if (this.province != '' && this.subjectType != '') {
          if (this.subjectType == '文史') {
            colleges.push([''].concat(artColleges2, both2));
          }
          else {
            colleges.push([''].concat(scienceColleges2, both2));
          }
        }
        return colleges;
      },
      recruitTypes() {
        let recruitTypes = [['', '一本']];
        //  广东录取批次
        let typeGD = [['', '一本', '二本市内', '二本市外', '贫困专项']];
        //  新疆录取批次
        let typeXJ = [['', '汉语言（喀什定向）', '双语实验班']];
        //  西藏录取批次
        let typeXZ = [['', '汉族', '少数民族']];


        switch (this.province[0]) {
          case '广东':
            recruitTypes = typeGD;
            break;
          case '新疆':
            recruitTypes = typeXJ;
            break;
          case '西藏':
            recruitTypes = typeXZ;
            break;
        }
        return recruitTypes;
      }
    },
    methods: {
      onSubmit(){
        let province = this.province[0];
        let college = this.college[0];
        let subjectType = this.subjectType[0];
        let recruitType = this.recruitType[0];
//        console.log(province, college, subjectType);
        if (province != '' && college != '' && subjectType != '' && recruitType != '') {
          this.$vux.loading.show({
            text: '搜索中',
            position: 'absolute',
          });
          this.httpApi.scoreQuery.get({
            "province": province,
            "college": college,
            "subject_type": subjectType,
            "recruit_type": recruitType,
          }).then(response => {
            this.$vux.loading.hide();
            let head = response.body.head;
            let data = response.body.data;
            if (head.status == 'success') {
//              console.log('Query Result: ', response.body);
              store.setScoreQueryResultAction(data);
              router.push('/scoreChart');
            }
            else {
              if (head.errorcode === 203) {
                this.searchTip = '系统异常';
              }
              else if (head.errorcode === 204) {
                this.searchTip = ' 本地区近年暂无考生报考，录取分数请参考其他省份 ';
              }
              else if (head.errorcode === 205) {
                this.searchTip = ' 非常抱歉，你所查询的学院近年在该地区暂无人报考，请查询别的学院或更换批次 ';
              }
              this.isShowTip = true;
            }

          }, errorResponse => {
            console.log(errorResponse);
          })
        }
        else {
          this.searchTip = '请选择生源地, 批次, 科目类别, 学院';
          this.isShowTip = true;
        }
      }
    }
  }
</script>
<style scoped>
  .btn {
    box-sizing: border-box;
    padding: 1.2rem;
  }

  .text {
    font-size: 0.8rem;
  }
</style>
