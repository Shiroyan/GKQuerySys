<template>
  <div>
    <panel :list="list"></panel>
    <bottom-btn></bottom-btn>
  </div>

</template>

<script>
  import {store} from '../store';
  export default {
    data(){
      return {
        response: store.state,
        list: []
      }
    },
    watch: {
        response: {
            handler: function (newVal, oldVal) {
                this.getList();
            },
            deep: true
        }
    },
//    TODO: 1. 解决跳转back后显示问题
    activated(){
      console.log('Result Activate');
      console.log('Response: ', this.response.searchResult);
      if(!this.response.searchResult) {
          let storageData = window.sessionStorage.getItem('searchResult');

          if(!storageData) {
            console.log('redirect');
            router.push('/');
          }
          else{
              this.response.searchResult = JSON.parse(storageData);
          }
      }
      else {
          this.getList();
      }
    },
    methods: {
        getList(){
          this.list = [];
          for (let temp of this.response.searchResult) {
            let item = {};
            item.src = temp.intro_pic;
            item.title = temp.intro_title;
            item.desc = temp.intro_abstract;
            item.url = temp.intro_url;
            this.list.push(item);
          }
          window.sessionStorage.setItem('searchResult',JSON.stringify(this.response.searchResult));
          console.log('Set sessionStorage item');
        }
    }
  }
</script>
