<template>
    <div class="box">
            <van-tabs v-model="activeName" type="line">
                <van-tab title="销量" name="a">
                     <div class="show" v-show="isShow">
                         <img src="//img07.yiguoimg.com/d/web/180315/013111/212501/noting@3x.png" alt="">
                       <p> 抱歉，无此商品</p>
                    </div>
                    <div class="boxList" v-for="(item, index) in list[0]" :key="index" @click="toCar(item)">
                        <div class="img-l">
                            <img :src="item.SmallPic">
                        </div>
                        <div class="info-r">
                            <p class="info-title">{{item.CommodityName}}</p>
                            <p class="txt">{{item.SubTitle}}</p>
                            <i class="label">{{item.PromotionTag}}</i>
                            <p class="price">
                                <span class="priceRed">￥{{item.SellPrice}}</span>
                                <span class="standard">￥{{item.OriginalPrice}}</span>
                                <span class="num">{{item.Spec}}</span>
                                <span class="add" @click.stop="addCar(item)"></span>
                            </p>
                        </div>
                    </div>
                </van-tab>
                <van-tab title="新品" name="b">
                   <div class="show" v-show="isShow">
                         <img src="//img07.yiguoimg.com/d/web/180315/013111/212501/noting@3x.png" alt="">
                       <p> 抱歉，无此商品</p>
                    </div>
                     <div class="boxList" v-for="(item, index) in list[1]" :key="index">
                        <div class="img-l">
                            <img :src="item.SmallPic">
                        </div>
                        <div class="info-r">
                            <p class="info-title">{{item.CommodityName}}</p>
                            <p class="txt">{{item.SubTitle}}</p>
                            <i class="label">{{item.PromotionTag}}</i>
                            <p class="price">
                                <span class="priceRed">￥{{item.SellPrice}}</span>
                                <span class="standard">￥{{item.OriginalPrice}}</span>
                                <span class="num">{{item.Spec}}</span>
                                <span class="add" @click.stop="addCar(item)"></span>
                            </p>
                        </div>
                    </div>
                </van-tab>
                <van-tab title="价格" name="c">
                     <div class="show" v-show="isShow">
                         <img src="//img07.yiguoimg.com/d/web/180315/013111/212501/noting@3x.png" alt="">
                       <p> 抱歉，无此商品</p>
                    </div>
                     <div class="boxList" v-for="(item, index) in list[2]" :key="index">
                        <div class="img-l">
                            <img :src="item.SmallPic">
                        </div>
                        <div class="info-r">
                            <p class="info-title">{{item.CommodityName}}</p>
                            <p class="txt">{{item.SubTitle}}</p>
                            <i class="label">{{item.PromotionTag}}</i>
                            <p class="price">
                                <span class="priceRed">￥{{item.SellPrice}}</span>
                                <span class="standard">￥{{item.OriginalPrice}}</span>
                                <span class="num">{{item.Spec}}</span>
                                <span class="add" @click.stop="addCar(item)"></span>
                            </p>
                        </div>
                    </div>
                </van-tab>
            </van-tabs>
            <div class="option">
                 <p class="num" @click="toShopCar"></p>
                 <p class="top" v-show="isShow1" @click="toTop"></p>
                 <!-- <a href="#" class="top" v-show="isShow1"></a> -->
            </div>
    </div>
</template>
<script>
export default {
    data() {
        return {
            activeName: 'a',
            ChildsArr:'',
            list:[],
            isShow:false,
            isShow1:false,
            carData:[],
            carData1:[]
        };
  },
  methods:{
      //存数据到详情页
    toCar(e){
        this.$router.push({path:'/sortCar'})
        this.carData1 = e
        var comment2 = {user2:this.carData1}
        var list2 = JSON.parse(sessionStorage.getItem("cmts2") || '[]')
        list2.unshift(comment2)
        sessionStorage.setItem('cmts2',JSON.stringify(list2))
        this.$emit('func2')
    },
    //存数据到购物车
    addCar(e){
        // console.log(e)
        this.carData = e
        var comment1 = {listData:this.carData}
        var list1 = JSON.parse(sessionStorage.getItem("cmts1") || '[]')
        list1.unshift(comment1)
        sessionStorage.setItem('cmts1',JSON.stringify(list1))
        this.$emit('func1')
        this.$toast("添加购物车成功");
    },
    toShopCar(){
        this.$router.push({path:'/shopCar'})
    },
    getData(){
        var list = JSON.parse(sessionStorage.getItem("cmts") || '[]')
        this.list = list[0].user
        // console.log(this.list)
        if(this.list==''){
            this.isShow = true;
        }
    },
    scrollToTop() { 
        　　var scrollTop = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop;
        // 　　console.log(scrollTop) 
                if(scrollTop>100){
                     this.isShow1 = true;
                }else{
                    this.isShow1 = false
                }
        },
    toTop(){
        if(document.documentElement.scrollTop){
            document.documentElement.scrollTop = 0
        }else{
            document.body.scrollTop = 0
        }
    }
  },
    mounted () {
        window.addEventListener('scroll', this.scrollToTop)
    },
  created(){
        this.getData()
        this.scrollToTop()
        // this.addCar(),
        this.toTop()
  }
}
</script>
<style scoped>
@import '../static/css/sortAll.css';
</style>