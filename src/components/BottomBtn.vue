<template>
  <div>
    <button class="back left" @click="back"><x-icon type="android-arrow-back" size="1.7rem"></x-icon></button>
    <button class="back right" @click="toTop"><x-icon type="android-arrow-up" size="1.7rem"></x-icon></button>
  </div>
</template>

<script>
	export default {
		data(){
			return {
			}
		},
		methods: {
			back(){
//			  router.push('/');
        router.go(-1);
			},
      toTop(){
			    document.body.scrollTop = document.documentElement.scrollTop = 0;
      }
		},
	}
</script>
<style scoped>
	.back {
    position: fixed;
    margin: 1rem 1rem;
    padding: 0.6rem 0.5rem 0.5rem 0.5rem;
    bottom: 0;
    border: 1px solid #ddd;
    box-shadow: 1px 1px 3px #ddd;
    background-color: white;
    height: 3rem;
    width: 3rem;
    border-radius: 3.5rem;
  }
  .left {
    left: 0;
  }
  .right {
    right: 0;
  }
</style>
