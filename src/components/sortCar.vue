<template>
  <div class="product">
    <div class="banner">
      <van-swipe :autoplay="3000" indicator-color="green">
        <van-swipe-item >
          <img v-lazy="list2.SmallPic" />
        </van-swipe-item>
         <van-swipe-item >
          <img v-lazy="list2.SmallPic" />
        </van-swipe-item>
         <van-swipe-item >
          <img v-lazy="list2.SmallPic" />
        </van-swipe-item>
      </van-swipe>
    </div>
    <div class="productInfor">
      <p class="title">{{list2.CommodityName}}</p>
      <p class="subhead">
        <i class="label">{{list2.PromotionTag}}</i>
        <span>{{list2.SubTitle}}</span>
      </p>
      <div class="price">
        <p class="priceIn">
          <span class="priceRed">
            <i>￥</i>{{list2.SellPrice}}
          </span>
          <s class="priceRed" style="font-size:0.14rem;color:#ccc;margin-left:0.1rem">
            <i>￥</i>{{list2.SellPrice}}
          </s>
        </p>
        <p class="area">产地:叙利亚</p>
      </div>
      <div class="sale">
        <div class="saleIn">
          <i class="couponRedemption">促销</i>
          <div class="saleIn-r">
            <div class="saleListOne">
              <i class="label">优惠</i>
              <p class="titlePrice">
                第二件0元
                <span class="txt">满2件减49</span>
              </p>
            </div>
            <div class="saleListTwo">
              <i class="label">优惠</i>
              <p class="titlePrice">
                点击领取优惠券
                <span class="txt">满2件减49</span>
              </p>
            </div>
          </div>
        </div>
      </div>
      <div class="sevenDay">
        <span class="dian"><van-icon name="warning-o
" /></span>
        不支持退货
      </div>
    </div>
    <div class="nrom">
      <div class="nrom-title">
        规格
        <span class="choose">{{list2.Spec}}</span>
      </div>
      <div class="nrom-title num">
        数量
        <span class="change">
          <van-stepper v-model="value" integer/>
        </span>
      </div>
    </div>
    <div class="address">
      <p class="title">送至</p>
      <div class="addressDetail">
        <p class="add">
          <span><van-icon name="location-o" /></span>
          上海 宝山区 宝山区
        </p>
        <p class="info">
          <span>有货</span>
          20:00 后完成订单，预计明日(8月29日)送达
        </p>
      </div>
    </div>
    <div class="evaluate">
      <p class="notxt">暂无评价</p>
    </div>
    <div class="btn">
      <a href="http://app.m.yiguo.com/Aspx/CommodityDetail.aspx?CommodityId=e616de75-0aed-48e4-976e-0047355a6b1a&CityCode=1&Network=wifi">查看图文详情</a>
    </div>
    <div class="footCar">
      <van-goods-action>
        <van-goods-action-icon icon="home-o" text="首页" @click="onClickIcon" />
        <van-goods-action-icon icon="cart-o" text="购物车" @click="onClickshopcar" />
        <van-goods-action-button type="warning" text="加入购物车" @click="onClickButton(list2)" />
      </van-goods-action>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
       value: 1,
       list2:'',
    };
  },
  methods: {
    //获取本地数据
     getData(){
        var list2 = JSON.parse(sessionStorage.getItem("cmts2") || '[]')
        this.list2 = list2[0].user2
    },
     onClickIcon() {
      // Toast('点击图标'); 
       this.$router.push({path:'/home'})

    },
    onClickshopcar(){
       this.$router.push({path:'/shopcar'})
    },
    onClickButton(e) {
      // Toast('点击按钮');
      //  console.log(e)
        this.carData = e
        var comment1 = {listData:this.carData}
        var list1 = JSON.parse(sessionStorage.getItem("cmts1") || '[]')
        list1.unshift(comment1)
        sessionStorage.setItem('cmts1',JSON.stringify(list1))
        this.$emit('func1')
    }
  },
  created(){
    this.getData()
  }
};
</script>
<style scoped>
@import "../static/css/sortCar.css";
</style>