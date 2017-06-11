<template>
    <div>
        <div class="menu">
            <div class="item" style="width:100%;">
                <router-link :to="'/socreQuery'">
                    <masker :opacity="0.3" >
                        <div class="bg" :style="{backgroundImage: 'url('+ 'http://cosdemo-1253322052.cosgz.myqcloud.com/static_img/score_query_bg.bdeb9d0.jpg' + ')'}" style="padding: 1.8rem;"></div>
                        <div slot="content" class="text" style="padding: 2em 2em;">
                            <hr class="divider">
                            <span>分数线查询</span>
                            <hr class="divider">
                        </div>
                    </masker>
                </router-link>
            </div>
            <div class="item" v-for="item in lists">
                <router-link :to="item.path">
                    <masker :opacity="0.4">
                        <div class="bg" :style="{backgroundImage: 'url('+ item.bg + ')'}"></div>
                        <div slot="content" class="text">
                            <hr class="divider">
                            <span>{{item.title}}</span>
                            <hr class="divider">
                        </div>
                    </masker>
                </router-link>
            </div>
        </div>
    </div>
</template>
<script>

//const scoreQueryBg = require('../assets/zhitu-des/score_query_bg.jpg');
//const introBg = require('../assets/menuBg/intro_bg.jpg');
//const liveBg = require('../assets/menuBg/live_bg.jpg');
//const playBg = require('../assets/menuBg/play_bg.jpg');
//const studyBg = require('../assets/menuBg/study_bg.jpg');
//const sumBg = require('../assets/menuBg/sum_bg.jpg');
//const dailyBg = require('../assets/menuBg/daily_bg.jpg');

const lists = [{
    path: '/study',
    bg: 'http://cosdemo-1253322052.cosgz.myqcloud.com/static_img/study_bg.e8029b1.jpg',
    title: '学习专区'
}, {
    path: '/live',
    bg: 'http://cosdemo-1253322052.cosgz.myqcloud.com/static_img/live_bg.9ed57d3.jpg',
    title: '起居出入'
}, {
    path: '/summary',
    bg: 'http://cosdemo-1253322052.cosgz.myqcloud.com/static_img/sum_bg.8a911f9.jpg',
    title: '高考汇总'
}, {
    path: '/daily',
    bg:   'http://cosdemo-1253322052.cosgz.myqcloud.com/static_img/daily_bg.da79518.jpg',
    title: '日常必备'
}, {
    path: '/play',
    bg: 'http://cosdemo-1253322052.cosgz.myqcloud.com/static_img/play_bg.87e5933.jpg',
    title: '吃喝玩乐'
}, {
    path: '/introduction',
    bg: 'http://cosdemo-1253322052.cosgz.myqcloud.com/static_img/intro_bg.611f5bd.jpg',
    title: '基本介绍'
}];

export default {
    data() {
        return {
//            scoreQueryBg: scoreQueryBg,
            lists: lists
        }
    }
}
</script>
<style scoped>
* {
    padding: 0;
    margin: 0;
}
.menu {
    box-sizing: border-box;
    color: #fff;
    width: 100%;
    padding: 0.8rem 0.8rem;
}
span {
    font-size: 0.9rem;
    line-height: 1rem;
}
.text {
    padding: 1.8rem 1rem;
    text-align: center;
    color: #fff;
    /*font-weight: bold;*/
    border-radius: 5px;
}

.item {
    display: inline-block;
    width: 50%;
    padding: 0.2rem 0.5rem;
    margin: 0.2rem 0;
    box-sizing: border-box;
}

.bg {
    padding-bottom: 3.0rem;
    display: block;
    position: relative;
    max-width: 100%;
    height: 2rem;
    background-size: cover;
    background-position: center center;
    background-repeat: no-repeat;
}

.divider {
    border: 1px outset #fff;
}
</style>
