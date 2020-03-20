<template>
  <div class="pos">
    <el-row>
      <!-- 左侧部分 -->
      <el-col :span="7" class="pos-order" id="order-list">
        <!-- tabs -->
        <el-tabs>
          <!-- 标签页标题  -->
          <el-tab-pane label="点餐">
            <!-- table -->

            <!-- data对象数组  boeder边框 show-summary合计行-->
            <!-- <el-table :data="tableData" border show-summary style="width: 100%"> -->

            <el-table :data="tableData" border style="width: 100%">
              <!-- prop对应键名获取值 lable表格列名 -->
              <el-table-column prop="goodsName" label="商品"></el-table-column>

            <!-- 自己控制文本框 -->
              <el-table-column  label="量" width="60">
                <template slot-scope="scope">
                  <input type="text"  style="width:20px"  v-model='scope.row.count' @blur='change(scope.row)'>
                </template>
              </el-table-column>

              <!-- <el-table-column  label="量" width="50">
                <template slot-scope="scope">
                  <input type="text"  style="width:20px"  :value='scope.row.count' @blur='change(scope.row)'>
                </template>
              </el-table-column> -->

              <el-table-column prop="price" label="金额" width="70"></el-table-column>

              <!-- fixed固定列 -->
              <el-table-column label="操作" width="120" fixed="right">
                <template slot-scope="scope">
                  <el-button type="text" size="big" @click='add(scope.row)'>+1</el-button>
                  <el-button type="text" size="big" @click='del1(scope.row)'>-1</el-button>
                  <el-button type="text" size="big" @click='del(scope.row)'>删除</el-button>
                </template>
              </el-table-column>
            </el-table>
            <!-- 结账 -->
            <div class='totalDiv'>
              <small>数量：</small> {{totalCount}} &nbsp;&nbsp;&nbsp;&nbsp; <small>金额：</small> {{totalMoney}} 元
            </div>

            <!-- 自己 计算属性计算金额 -->
            <div class='totalDiv'>
              <small>数量：</small> {{totalCount1}} &nbsp;&nbsp;&nbsp;&nbsp; <small>金额：</small> {{totalMoney1}} 元
            </div>
            <div class="div-btn">
              <el-button type="warning">挂单</el-button>
              <el-button type="danger" @click='delTotal'>删除</el-button>
              <el-button type="success" @click='checkout'>结账</el-button>
            </div>
          </el-tab-pane>
          <el-tab-pane label="挂单">挂单</el-tab-pane>
          <el-tab-pane label="外卖">外卖</el-tab-pane>
        </el-tabs>
      </el-col>

      <!-- 产品部分 -->
      <el-col :span="17">
        <div class="often-goods">
          <div class="title">常用商品</div>
          <div class="often-goods-list">
            <ul>
              <li v-for='goods in oftenGoods' :key='goods.id' @click='add(goods)'>
                <span>{{goods.goodsName}}</span>
                <span class="o-price">￥{{goods.price}}</span>
              </li>
            </ul>
          </div>
        </div>
        <!-- 下半面 -->
        <div class="goods-type">
          <el-tabs>
            <el-tab-pane label="汉堡">
              <div>
                <ul class='cookList'>
                    <li v-for="goods in type0Goods" :key='goods.goodsId' @click='add(goods)'>
                        <span class="foodImg"><img :src="goods.goodsImg" width="100%"></span>
                        <span class="foodName">{{goods.goodsName}}</span>
                        <span class="foodPrice">￥{{goods.price}}</span>
                    </li>
                </ul>
              </div>
            </el-tab-pane>
            <el-tab-pane label="小食">
              <div>
                <ul class='cookList'>
                    <li v-for="goods in type1Goods" :key='goods.goodsId' @click='add(goods)'>
                        <span class="foodImg"><img :src="goods.goodsImg" width="100%"></span>
                        <span class="foodName">{{goods.goodsName}}</span>
                        <span class="foodPrice">￥{{goods.price}}</span>
                    </li>
                </ul>
              </div>
            </el-tab-pane>
            <el-tab-pane label="饮料">
              <div>
                <ul class='cookList'>
                    <li v-for="goods in type2Goods" :key='goods.goodsId' @click='add(goods)'>
                        <span class="foodImg"><img :src="goods.goodsImg"></span>
                        <span class="foodName">{{goods.goodsName}}</span>
                        <span class="foodPrice">￥{{goods.price}}</span>
                    </li>
                </ul>
              </div>
            </el-tab-pane>
            <el-tab-pane label="套餐">
              <div>
                <ul class='cookList'>
                    <li v-for="goods in type3Goods" :key='goods.goodsId' @click='add(goods)'>
                        <span class="foodImg"><img :src="goods.goodsImg" width="100%"></span>
                        <span class="foodName">{{goods.goodsName}}</span>
                        <span class="foodPrice">￥{{goods.price}}</span>
                    </li>
                </ul>
              </div>
            </el-tab-pane>
          </el-tabs>
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import axios from 'axios'
export default {
  name: 'pos',
  data () {
    return {
      tableData: [],
      oftenGoods: [],
      type0Goods: [],
      type1Goods: [],
      type2Goods: [],
      type3Goods: [],
      totalCount: 0,
      totalMoney: 0
    }
  },
  created () {
    // 常用商品
    axios.get('https://www.fastmock.site/mock/0bf6a5bae7eab8507e44b56191ddff36/vuepos/oftenGoods')
      .then(res => {
        // console.log(res)
        this.oftenGoods = res.data.oftenGoods
      })
      .catch(() => {
        alert('网络错误，不能访问')
      })
      // 商品列表
    axios.get('https://www.fastmock.site/mock/0bf6a5bae7eab8507e44b56191ddff36/vuepos/typeGoods')
      .then(res => {
        // console.log(res)查看一下内容再决定
        this.type0Goods = res.data.data[0]
        this.type1Goods = res.data.data[1]
        this.type2Goods = res.data.data[2]
        this.type3Goods = res.data.data[3]
      })
  },
  // js DOM操作设置页面，因为element是虚拟dom 操作不了 生命周期
  mounted () {
    var orderHeight = document.body.clientHeight
    document.getElementById('order-list').style.height = orderHeight + 'px'
  },
  methods: {
    getAllMoney () {
      // 注意这里
      this.totalMoney = 0
      this.totalCount = 0
      if (this.tableData) {
        // 对每一项运行给定函数，没有返回值
        this.tableData.forEach(item => {
          this.totalCount += item.count
          this.totalMoney = this.totalMoney + (item.price * item.count)
        })
      }
    },
    add (goods) {
      // 商品是否存在于订单列表，根据判断写业务逻辑
      let isHave = false
      for (let i = 0; i < this.tableData.length; i++) {
        // console.log(this.tableData[i].goodsId)
        if (this.tableData[i].goodsId == goods.goodsId) {//eslint-disable-line
          isHave = true // 存在
        }
      }
      if (isHave) {
      // 存在就进行数量添加
        let arr = this.tableData.filter(item => {
          // eslint-disable-next-line eqeqeq
          return item.goodsId == goods.goodsId
        })
        // console.log(arr) // arr算新对象 有属性【0】有proto【1】
        arr[0].count++
      } else {
        // 这种方式是因为导入的数据没有count属性
        let newGoods = {goodsId: goods.goodsId, goodsName: goods.goodsName, price: goods.price, count: 1}
        this.tableData.push(newGoods)
      }
      this.getAllMoney()
    },
    del (goods) {
      let idex = this.tableData.findIndex(item => {
        // eslint-disable-next-line eqeqeq
        return item.goodsId == goods.goodsId
      })
      this.tableData.splice(idex, 1)
      this.getAllMoney()
    },
    del1 (goods) {
      let arr = this.tableData.filter(item => {
        // eslint-disable-next-line eqeqeq
        return item.goodsId == goods.goodsId
      })
      if (arr[0].count > 1) {
        arr[0].count--
      } else {
        this.del(goods)
        arr[0].count = 0
      }
      // 不更新count的话console.log(arr[0].count)// 仍然是1
      this.getAllMoney()
    },
    delTotal () {
      // this.tableData = [];
      this.tableData.splice(0, this.tableData.length)
      this.totalCount = 0
      this.totalMoney = 0
    },
    // message组件 系统提醒
    checkout () {
      // eslint-disable-next-line eqeqeq
      if (this.totalCount != 0) {
        this.delTotal()
        this.$message({
          message: '结账成功,请快速备餐',
          type: 'success'
        })
      } else {
        this.$message.error('当前并未选择任何商品')
      }
    },
    change (goods) {
      let arr = this.tableData.filter(item => {
        // eslint-disable-next-line eqeqeq
        return item.goodsId == goods.goodsId
      })
      // console.log(goods)
      // console.log(typeof (goods.count))
      //  !!!!! arr[0].count=goods.count
      var num = parseInt(goods.count)
      arr[0].count = num
      console.log(arr[0].count)
      this.getAllMoney()
    }

  },
  computed: {
    // eslint-disable-next-line vue/return-in-computed-property
    totalCount1 () {
      // var count = 0
      // if (this.tableData) {
      //   // 对每一项运行给定函数，没有返回值
      //   this.tableData.forEach(item => {
      //     count += item.count
      //   })
      //   return count
      // }
      return this.tableData.reduce((pre, cur) => {
        return pre + cur.count
      }, 0)
    },
    totalMoney1 () {
      let money = 0
      if (this.tableData) {
        this.tableData.forEach(item => {
          money += item.price * item.count
        })
        return money
      }
    }
  }
}
</script>

<style scoped>
.pos-order {
  background-color: #f9fafc;
  border-right: 1px solid #c0ccda;
}
.totalDiv{
  background-color: #fff;
  padding: 10px;
  border-bottom: 1px solid #d3dce6;
}
.div-btn {
  margin-top: 10px;
}
.title {
  height: 20px;
  border-bottom: 1px solid #d3dce6;
  background-color: #f9fafc;
  padding: 10px;
}
.often-goods-list ul li {
  list-style: none;
  float: left;
  border: 1px solid #e5e9f2;
  padding: 10px;
  margin: 5px;
  background-color: #fff;
  cursor: pointer;
}
.cookList li:hover,
.often-goods-list ul li:hover{
  background-color: pink;
}
.cookList li:active,
.often-goods-list ul li:active{
  background-color:#e28080;
}
.o-price {
  color: #58b7ff;
}
.goods-type {
  clear: both;
}
.cookList li{
       list-style: none;
       width:23%;
       border:1px solid #E5E9F2;
       height: auot;
       overflow: hidden;
       background-color:#fff;
       padding: 2px;
       float:left;
       margin: 2px;
       /* 光标 */
       cursor: pointer

   }
.cookList li span{

    display: block;
    float:left;
}
.foodImg{
    width: 40%;
    height:100%;
}
.foodName{
    font-size: 16px;
    padding-left: 10px;
    color:brown;

}
.foodPrice{
    font-size: 16px;
    padding-left: 10px;
    padding-top:10px;
}

</style>
