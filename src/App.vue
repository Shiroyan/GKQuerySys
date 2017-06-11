<template>
  <div id="app">
      <router-view></router-view>
  </div>
</template>
<script>
  export default {
    data(){
      return {}
    }
  }
</script>

<style lang="less">
  @import '~vux/src/styles/reset.less';

  html, body {
    width: 100%;
    /*height: 100%;*/
    /*min-height: 100%;*/
    /*position: fixed;*/
    overflow-x: hidden;
    overflow-y: auto;
  }

  body {
    background-color: #fbf9fe;
  }

  /*定义滚动条高宽及背景 高宽分别对应横竖滚动条的尺寸*/
  ::-webkit-scrollbar {
    width: 0;
    height: 0;
    background-color: #ddd;
  }

  /*定义滚动条轨道 内阴影+圆角*/
  ::-webkit-scrollbar-track {
    -webkit-box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.3);
    border-radius: 0;
    background-color: #F5F5F5;
  }

  // 适配
  // laptop
  html,
  body {
    font-size: 20px;
  }

  // tablet
  @media only screen and (max-width: 768px) {
    html,
    body {
      font-size: 17px;
    }
  }

  // L
  @media only screen and (max-width: 425px) {
    html,
    body {
      font-size: 16px;
    }
  }

  // M
  @media only screen and (max-width: 375px ) {
    html,
    body {
      font-size: 15px;
    }
  }

  // S
  @media only screen and (max-width: 320px) {
    html,
    body {
      font-size: 14px;
    }
  }

</style>
