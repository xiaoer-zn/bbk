<template>
  <div class="left-nav">
    <ul>
      <li>
        <!-- <i> 定义与文本中其余部分不同的部分，并把这部分文本呈现为斜体文本。

<i> 标签被用来表示科技术语、其他语种的成语俗语、想法、宇宙飞船的名字等等。 -->
        <i class="icon iconfont icon-goumai"></i>
        <div>收银</div>
      </li>
      <li>
        <i class="icon iconfont icon-dianpu"></i>
        <div>店铺</div>
      </li>
      <li>
        <i class="icon iconfont icon-hanbao"></i>
        <div>商品</div>
      </li>
      <li>
        <i class="icon iconfont icon-huiyuanqia"></i>
        <div>会员</div>
      </li>
      <li>
        <i class="icon iconfont icon-zuanshi"></i>
        <div>统计</div>
      </li>
      <li>
        <i class="icon iconfont icon-gongnengjianyi"></i>
        <div>设置</div>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: 'leftNav',
  data () {
    return {}
  }
}
</script>

<style lang="">
.left-nav {
  color:#fff;
  font-size: 10px;
  height: 100%;
  background-color: #1d8ce0;
  float: left;
  width: 5%;
}
.iconfont {
  font-size: 24px;
}

.left-nav ul {
  padding: 0px;
  margin: 0px;
}

.left-nav li {
  /* 列表标记 */
  list-style: none;
  /* 文本对齐方式 */
  text-align: center;
  border-bottom: 1px solid #20a0ff;
  padding: 10px;
}
</style>
