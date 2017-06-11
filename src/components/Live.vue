<template>
  <div>
    <panel :list="list"></panel>
    <bottom-btn></bottom-btn>

  </div>
</template>
<script>
  export default {
    data(){
      return {
        list: []
      }
    },
    created(){
      this.httpApi.live.get().then(response => {
        let head = response.body.head;
        let data = response.body.data;
        if(head.status == 'success'){
          for(let temp of data){
            let item = {};
            item.src = temp.intro_pic;
            item.title = temp.intro_title;
            item.desc = temp.intro_abstract;
            item.url = temp.intro_url;
            this.list.push(item);
          }
        }
        else {

        }
      })
    }
  }
</script>


