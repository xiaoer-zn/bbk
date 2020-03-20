// main.js是项目的入口文件，项目中所有的页面都会加载main.js,所以main.js,主要有三个作用：
// 1.实例化Vue。
// 2.放置项目中经常会用到的插件和CSS样式。例如： 网络请求插件:axios和vue-resource、图片懒加载插件：vue-lazyload
// 3.存储全局变量。例如（用于的基本信息）

// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import ElementUI from 'element-ui'

// 默认样式
import 'element-ui/lib/theme-chalk/index.css'

Vue.config.productionTip = false
Vue.use(ElementUI)

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
