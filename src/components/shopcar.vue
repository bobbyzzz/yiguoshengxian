<template>
  <div class="box">
    <div class="top">
      <div class="top1">
        登录可同步购物车内商品
        <button @click="toLogin">登录</button>
      </div>
      <div class="top2">
        全场满100元包邮，还差
        <span>100</span>
        元包邮
      </div>
    </div>
    <div class="nogoods" v-if="isShow">
      <div class="icon-box"></div>
      <p>购物车空空的，快去逛逛吧！</p>
      <div class="btn">
        <button @click="toGoshop">去逛逛</button>
      </div>
    </div>
    <!-- 内容 -->
    <div class="cart-product" v-else>
      <table>
        <tbody>
          <div class="delete">
            <p>清空购物车</p>
            <van-icon name="delete" @click="getDeleteData" />
          </div>
          <tr v-for="(items,indexs) in listData" :key="indexs">
            <div class="td-check">
              <van-checkbox
                @click="singleSelect(indexs)"
                v-model="items.cheack"
                checked-color="#07c160"
              ></van-checkbox>
            </div>
            <div class="tr-img">
              <img :src="items.listData.SmallPic" alt />
              <div>
                <td class="td-product">
                  <div class="product-info">{{items.listData.CommodityName}}</div>
                </td>
                <td class="td-price">
                  <p class="red-text">￥{{items.listData.SellPrice}}</p>
                </td>
              </div>
            </div>

            <!-- 步进器 -->
            <div class="jinbu">
              <td class="td-do">
                <a href="javascript:;" class="product-delete" @click="deleteOneProduct(indexs)">
                  <van-icon name="delete" />
                </a>
              </td>
              <td class="td-num">
                <div class="product-num">
                  <button
                    href="javascript:;"
                    class="num-reduce num-do"
                    @click="reduce(indexs)"
                    :disabled="items.listData.State===1"
                  >-</button>
                  <p>{{items.listData.State}}</p>
                  <button
                    href="javascript:;"
                    class="num-add num-do"
                    @click="add(indexs)"
                    :disabled="items.listData.State===20"
                  >+</button>
                </div>
              </td>
            </div>
          </tr>
        </tbody>
      </table>
    </div>

    <!-- 猜你喜欢 -->
    <div class="guess">
      <div class="tirle">
        <van-divider :style="{ color: '#5e5e5e', borderColor: 'black', padding: '0 1.25rem' }">猜你喜欢</van-divider>
      </div>
      <div class="list">
        <ul>
          <li v-for="(item,index) in sortListData" :key="index" @click="toList(item)">
            <div class="one">
              <div class="img">
                <img :src="item.SmallPic" alt />
              </div>
              <div class="text">
                <h2 class="elli2">{{item.CommodityName}}</h2>
                <p>
                  <strong class="red">
                    ￥
                    <b>{{item.SellPrice}}</b>
                  </strong>
                </p>
              </div>
              <div class="btn" @click.stop="toButton(item)">
                <button></button>
              </div>
            </div>
          </li>
        </ul>
      </div>
    </div>

    <!-- 最后一行统计 -->
    <div class="cart-product-info">
      <div class="check-box">
        <van-checkbox @click="checkedss" v-model="checked" checked-color="#07c160"></van-checkbox>
      </div>
      <div class="info-num">
        <a href="javascript:;" class="product-total">
          合计（不含运费）:
          <span>￥{{num}}</span>
        </a>
        <div href="javascript:;" @click="toLogin" class="btn-buy">去结算({{allNumber}})</div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      sortListData: "",
      checked: true,
      isShow: true,
      listData: "",
      num: 0,
      allNumber:0
    };
  },

  methods: {
    getData() {
      this.$axios
        .get("https://mock.yonyoucloud.com/mock/2164/shopcar/shopcarList")
        .then(res => {
          // console.log(res.data.Data.CommodityList);
          this.sortListData = res.data.Data.CommodityList;
        });
    },
    reduce(indexs) {
      this.listData[indexs].listData.State -= 1;
       this.getTotal()
    },
    add(indexs) {
      this.listData[indexs].listData.State += 1;
       this.getTotal()
    },

    //获取本地存储的购物车数据
    numberData() {
      var list2Data = JSON.parse(sessionStorage.getItem("cmts1") || "");
      if (list2Data != "") {
        this.listData = list2Data;
        // console.log(list2Data);
        for (var i = 0; i < this.listData.length; i++) {
          this.listData[i].cheack = true;
        }
        // console.log(this.listData)
        if (list2Data != "") {
          this.isShow = false;
        } else {
          this.isShow = true;
        }
      } else {
        this.listData = "";
      }
    },
    singleSelect(indexs) {
      let flag = true;
      this.listData[indexs].cheack = !this.listData[indexs].cheack;
      this.$set(this.listData, indexs, this.listData[indexs]);
      for (var i = 0; i < this.listData.length; i++) {
        if (this.listData[i].cheack) {
          flag = true;
        } else {
          flag = false;
          break;
        }
      }
      this.checked = flag;
      this.getTotal()
    },
    checkedss() {
      this.checked = !this.checked;
      for (var i = 0; i < this.listData.length; i++) {
        if (this.checked) {
          this.listData[i].cheack = true;
        } else {
          this.listData[i].cheack = false;
        }
      }
      this.getTotal()
    },
    toGoshop() {
      this.$router.push("/home");
    },
    toLogin() {
      this.$router.push("/login");
    },
    toList(e) {
      // console.log(e);
      // 存储详情页数据到本地
      var comment = { user2: e };
      var listData = JSON.parse(sessionStorage.getItem("cmts2") || "[]");
      listData.unshift(comment);
      //重新保存最新的用户信息
      sessionStorage.setItem("cmts2", JSON.stringify(listData));
      this.$emit("func2");
      this.$router.push("/sortCar");
    },
    toButton(e) {
      // console.log(e);
      // 存储购物车数据到本地
      var comment1 = { listData: e };
      var list1Data = JSON.parse(sessionStorage.getItem("cmts1") || "[]");
      list1Data.unshift(comment1);
      //重新保存最新的用户信息
      sessionStorage.setItem("cmts1", JSON.stringify(list1Data));
      this.$emit("func1");
      this.$toast("添加成功");
      setTimeout(function() {
        location.reload();
      }, 1000);
    },

    getDeleteData() {
      sessionStorage.removeItem("cmts1");
      this.$toast("删除成功");
      setTimeout(function() {
        location.reload();
      }, 1000);
    },

    // 全选与取消全选
    selectProduct(_isSelect) {
      //遍历listData,全部取反
      if (this.listData != "") {
        for (var i = 0; i < this.listData.length; i++) {
          this.listData[i].select = !_isSelect;
        }
      }
    },

    //删除选中的产品
    deleteProduct() {
      if (this.listData != "") {
        this.listData = this.listData.filter(function(items) {
          return !items.select;
        });
      }
      this.getTotal()
    },

    //删除单条产品
    deleteOneProduct(indexs) {
      if (this.listData != "") {
        //根据索引删除listData的记录
        this.listData.splice(indexs, 1);

        //删除单条产品的本地缓存
        var delListData = [];
        delListData = JSON.parse(sessionStorage.getItem("cmts1"));
        sessionStorage.removeItem("cmts1");
        delListData.splice(indexs, 1);
        sessionStorage.setItem("cmts1", JSON.stringify(delListData));
        this.$toast("删除成功");
      }
      this.getTotal()
    },
    getTotal() {
      // if (this.listData != "") {
      //   // 获取list中select为true的数据
      //   var _proList = this.listData.filter(function(val) {
      //       return val.select;
      //     }),
      //     totalPrice = 0;
      //   for (var x = 0; x < this.listData.length; x++) {
      //     // 总价累加

      //     totalPrice +=
      //       this.listData[x].listData.State *
      //       this.listData[x].listData.SellPrice;
      //   }
      //   // 选择产品的件数就是_proList.lenth，总价就是totalPrice
      //   return {
      //     totalNum: this.listData.length,
      //     totalPrice: totalPrice.toFixed(2)
      //   };
      // } else {
      //   // 获取list中select为true的数据
      //   for (var i = 0; i < 1; i++) {
      //     // 总价累加
      //     totalPrice = 0;
      //   }
      //   // 选择产品的件数就是_proList.lenth，总价就是totalPrice
      //   return {
      //     totalNum: 0,
      //     totalPrice: totalPrice.toFixed(2)
      //   };
      // }
      let money = 0;
      let numbers = 0
      this.listData.forEach(element => {
        // console.log(element)
        if (element.cheack) {
          money += element.listData.State * element.listData.SellPrice;
          numbers +=element.listData.State
        }
      });
      // console.log(money);
      this.num = money.toFixed(2);
      this.allNumber = numbers
    }
  },
  computed: {
    // 检测是否全选
    // isSelectAll() {
    //   if (this.listData != "") {
    //     //如果listData中每一条数据的select都为true,就返回true,否则返回false
    //     return this.listData.every(function(val) {
    //       return val.select;
    //     });
    //   }
    // },
    // 获取总价和产品总数
  },

  created() {
    this.getData();
    this.numberData();
    this.getTotal();
  }
};
</script>

<style scoped>
@import "../static/css/shopcar.css";
@import "../static/css/shopthing.css";
</style>
