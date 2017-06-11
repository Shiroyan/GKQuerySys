<template>
  <div>
    <swiper loop auto :aspect-ratio="400/800" :list="demo_list" :show-dots="false" style="position: relative; z-index: 1">
    </swiper>
    <div>
      <search @on-focus="isShowMask=true" @on-cancel="isShowMask=false" @on-submit="onSubmit()"
              :class="{active : isShowMask}" v-model="searchContent" ref="search"></search>
      <masker fullscreen v-show="isShowMask" style="position: relative; z-index: 1;"></masker>
    </div>
    <transition name="fade">
      <keep-alive>
        <router-view></router-view>
      </keep-alive>
    </transition>
    <toast v-model="isShowTip" type="text" position="middle" width="15em">{{searchTip}}</toast>
  </div>
</template>
<script>
  import { store } from '../store';
//
//  let img1Url = require('../assets/1.jpg');
//  let img2Url = require('../assets/2.jpg');
//
//  const baseList = [{
//    url: 'http://www.bilibili.com',
//    img: img1Url,
//    title: 'first'
//  }, {
//    url: 'http://www.baidu.com',
//    img: img2Url,
//    title: 'second'
//  }];

  export default {
    data() {
      return {
        demo_list: [],
        isShowMask: false,
        searchContent: '',
        searchTip: '',
        isShowTip: false,
      }
    },
    methods: {
      onSubmit(){
        if(this.searchContent == ''){
            this.searchTip = '搜索内容不能为空！';
            this.isShowTip = true;
        }
        else {
          this.httpApi.search.get({'content': this.searchContent}).then(response => {
            let head = response.body.head;
            let data = response.body.data;
            if(head.status == 'success') {
              store.setSearchResultAction(data);
              this.$refs.search.cancel();
              router.push('result');
            }
            else {
              this.searchTip = ' _(:з)∠)_好像没有你想要的内容，或者换个关键词试试看~';
              this.isShowTip = true;
            }
          })
        }
      }
    },
    created() {
      this.httpApi.init.get().then(response => {
        let head = response.body.head;
        let data = response.body.data;
        if (head.status == 'success') {
          let tempList = [];
          for (let temp of data) {
            let item = {};
            item.url = temp.intro_url;
            item.img = temp.intro_pic;
            item.title = temp.intro_title;
            tempList.push(item);
          }
          this.demo_list = tempList;
        } else {
          console.log(head.extroInfo);
        }
      })
    },
    name: 'Home'
  }
</script>
<style scpoed>
  .menu {
    text-align: center;
  }
  .fade-enter-active,
  .fade-leave-active {
    transition: opacity .5s
  }
  .fade-enter,
  .fade-leave-active {
    opacity: 0
  }

  .active {
    position: relative;
    z-index: 2;
  }
</style>
