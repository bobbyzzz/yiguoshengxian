<template>
  <div>
    <div class="dahuzhi">
      <div class="flex">
        <img :src="childsData.PictureUrl" alt />
        <p class="io">{{childsData.EfruitArticleTitle}}</p>
        <span class="shenghojia">{{childsData.OtherCategoryName}}</span>
        <span class="zir">
          <i class="icon icon5"></i>
          <p>上海</p>
        </span>
        <div class="sws">
          <img :src="childsData.AuthorPicture" alt />
          <span class="span">{{childsData.Author}}</span>
          <span class="time-new">{{childsData.PublishedTimed}}</span>
        </div>
      </div>

      <div class="p">
        <p>{{childsData.text}}</p>
        <img style="width:100%;" :src="childsData.PictureUrl1" alt />
        <p>{{childsData.text1}}</p>
        <img style="width:100%;" :src="childsData.PictureUrl2" alt />
        <p>{{childsData.text2}}</p>
        <p id="hoe">{{childsData.number}}</p>
        <span id="ido">{{childsData.title1}}</span>
        <p>{{childsData.text3}}</p>
        <img style="width:100%;" :src="childsData.PictureUrl3" alt />
        <p>{{childsData.text4}}</p>
        <p id="hoe">{{childsData.number1}}</p>
        <span id="ido">{{childsData.title2}}</span>
        <p>{{childsData.text5}}</p>
        <img style="width:100%;" :src="childsData.PictureUrl4" alt />
        <p>{{childsData.text6}}</p>
        <p id="hoe">{{childsData.number2}}</p>
        <span id="ido">{{childsData.title3}}</span>
        <p>{{childsData.text7}}</p>
        <img style="width:100%;" :src="childsData.PictureUrl5" alt />
        <p>{{childsData.text8}}</p>
      </div>
    </div>
    <!-- 相关商品 -->
    <div class="footButton">
      <van-icon name="like-o" />
      <!-- <button class="change" @click="loadRelationCommoditList(0);">相关商品</button> -->
      <van-button type="primary" @click="showPopup" v-if="isShow" class="you">相关商品</van-button>
      <van-button type="primary" @click="showPopup" v-else class="wu">相关商品</van-button>
      <van-popup v-model="show1" class="wuci" >无此商品出售</van-popup>
      <van-popup v-model="show" position="bottom" :style="{ height: '50%' }">
        <div>
          <p class="txtTitle">相关商品（1件）</p>
          <div
            class="footButton-txt"
            v-for="(items,indexs) in xiangGuan"
            :key="indexs"
            @click="footButton(items)"
          >
            <img :src="items.SmallPic" alt />
            <div class="footButton-title">
              <div class="footButton-l-title">
                <p>{{items.CommodityName}}</p>
                <p>￥{{items.OriginalPrice}}</p>
              </div>
              <van-icon name="arrow" />
            </div>
          </div>
        </div>
      </van-popup>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      value: 0,
      show: false,
      show1: false,
      isShow: true,
      childsData: "",
      commodityListData: "",
      xiangGuan: ""
    };
  },
  methods: {
    showPopup() {
      this.show = true;
    },
    getDaot() {
      var childList = JSON.parse(sessionStorage.getItem("key2") || "[]");
      this.childsData = childList[0].data.Childs;
      // console.log(this.childsData);

      //相关商品数据
      // this.commodityListData = childList[0].data.Childs.CommodityList[0]
      //  console.log(this.commodityListData)
    },
    showPopup() {
      var childsDataList = this.childsData.CommodityList;
      this.xiangGuan = childsDataList;
      // console.log(childsDataList)
      if (childsDataList == "") {
        this.show1 = true;
        this.isShow = false;
      } else {
        this.show = true;
        this.isShow = true;
      }
    },
    getColor() {
       var childsDataList = this.childsData.CommodityList;
      if (childsDataList == "") {
        this.isShow = false;
      } else {
        this.isShow = true;
      }
    },
    footButton(e) {
      // console.log(e);
      this.$router.push({ path: "/sortCar" });
      this.carData1 = e;
      var comment2 = { user2: this.carData1 };
      var list2 = JSON.parse(sessionStorage.getItem("cmts2") || "[]");
      list2.unshift(comment2);
      sessionStorage.setItem("cmts2", JSON.stringify(list2));
      this.$emit("func2");
    }
  },
  created() {
    this.getDaot();
    this.getColor();  
  }
};
</script>
<style scoped>
@import "../static/css/jinlu.css";
</style>
