/**
 * Created by Shiro on 2017/6/8.
 */
export default [{
  path: '/',
  component: resolve => {
    require(['./components/Home.vue'], resolve);
  },
  children: [
    {
      path: '',
      component: resolve => {
        require(['./components/Menu.vue'], resolve);
      }
    },
    {
      path: 'introduction',
      component: resolve => {
        require(['./components/Introduction.vue'], resolve);
      }
    },
    {
      path: 'summary',
      component: resolve => {
        require(['./components/InfoSummary.vue'], resolve);
      }
    },
    {
      path: 'study',
      component: resolve => {
        require(['./components/Study.vue'], resolve);
      }
    },
    {
      path: 'live',
      component: resolve => {
        require(['./components/Live.vue'], resolve);
      }
    },
    {
      path: 'daily',
      component: resolve => {
        require(['./components/Daily.vue'], resolve);
      }
    },
    {
      path: 'play',
      component: resolve => {
        require(['./components/Play.vue'], resolve);
      }
    },
    {
      path: 'socreQuery',
      component: resolve => {
        require(['./components/ScoreQuery.vue'], resolve);
      }
    },
    {
      path: 'result',
      component: resolve => {
        require(['./components/Result.vue'], resolve);
      }
    },
    {
      path: 'scoreChart',
      component: resolve => {
        require(['./components/ScoreChart.vue'], resolve);
      }
    }
  ]
}];
