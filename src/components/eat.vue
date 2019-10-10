<template>
  <div id="app">
    <div class="maybox">
      <van-grid :border="false" :column-num="4">
        <van-grid-item v-for="(item, index) in menulist" :key="index" :to="item.url">
          <van-image class="imgew" :src="item.sutong" />
          <div class="seiz">{{item.name}}</div>
        </van-grid-item>
      </van-grid>
    </div>
    <div class="dahuzhi">
      <van-pull-refresh v-model="isLoading" @refresh="onRefresh">
        <van-tabs v-model="active" @click="getData">
          <van-list v-model="loading" :finished="finished" finished-text="没有更多了" @load="getData">
            <div class="box-fpx" >
              <div class="flex j-between a-center" >
                <div
                  class="flex"
                  style
                  v-for="(item, index) in RspMsg"
                  :key="index"
                  @click="toChilds(item)"
                >
                  <a href="javascript:;">
                    <img :src="item.PictureUrl" alt />
                  </a>
                  <p class="io">{{item.EfruitArticleTitle}}</p>
                  <span class="shenghojia">{{item.OtherCategoryName}}</span>
                  <span class="zir">
                    <i class="icon icon5"></i>
                    {{item.TotalReadNum}}
                  </span>
                  <div class="sws">
                    <img class="img-se" :src="item.AuthorPicture" alt />

                    <span class="span">{{item.Author}}</span>
                    <span class="time-new">{{item.PublishedTimed}}</span>
                  </div>
                </div>
              </div>
            </div>
          </van-list>
        </van-tabs>
      </van-pull-refresh>
    </div>
    <div class="ho">
      <i class="new"></i>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      list: [],
      RspMsg: {},
      Method: {},
      list: [],
      menulist: [
        {
          sutong:
            "http://img13.yiguoimg.com/e/ad/2016/161020/586030925119660372_120x96.png",
          name: "做美食",
          url: "Makdeliciousfood"
        },
        {
          sutong:
            "http://img13.yiguoimg.com/e/ad/2016/161020/586030925119693140_120x96.png",
          name: "涨知识",
          url: "Increaseknowledge"
        },
        {
          sutong:
            "http://img12.yiguoimg.com/e/ad/2016/161020/586030925119725908_120x96.png",
          name: "生活家",
          url: "LivingHome"
        },
        {
          sutong:
            "http://img09.yiguoimg.com/e/ad/2017/170117/586030927703745073_120x96.png",
          name: "爱试吃",
          url: "Eatonatrialbasis"
        }
      ],
      list: [],
      loading: false,
      finished: false,
      active: 0,
      isLoading: false,
      Childs: ""
      // childsList:[],
    };
  },
  methods: {
    onRefresh() {
      setTimeout(() => {
        this.$toast("刷新成功");
        this.isLoading = false;
        this.count++;
      }, 500);
    },
    getData() {
      //  异步更新数据
      setTimeout(() => {
        for (let i = 0; i < 10; i++) {
          this.list.push(this.list.length + 1);
        }
        // 加载状态结束
        this.loading = false;

        // 数据全部加载完成
        if (this.list.length >= 20) {
          this.finished = true;
        }
      }, 500);
    },
    getDaot() {
      this.$axios
        .get(
          "https://mock.yonyoucloud.com/mock/2164/eatHome/eatHomeList"
        )
        .then(res => {
          // console.log(res.data);
          this.RspMsg = res.data.RspData.ArticleList.List;
          // console.log(this.RspMsg);
          // for(let i=0; i< this.RspMsg.length; i++){
          //     this.Childs =  this.RspMsg[i].Childs
          //     return this.Childs
          //  }
        });
    },
    getMineData() {
      this.$axios
        .get(
          "https://www.easy-mock.com/mock/5d5bde2a026db4506db449e0/example/eatTop/eatTopList"
        )
        .then(res => {
          // console.log(res.data);
          this.list = res.data.RspData.data.AdCategory37.Banners;
          // console.log(this.list);
        });
    },
    toChilds(e) {
      // console.log(e)
      var childList = { data: e };
      var childListData = JSON.parse(sessionStorage.getItem("key2") || "[]");
      childListData.unshift(childList);
      sessionStorage.setItem("key2", JSON.stringify(childListData));
      this.$emit("func1");
      this.$router.push("/jinlu");
    }
  },

  created() {
    this.getDaot();
    this.getMineData();
  }
};
</script>
<style scoped>
@import "../static/css/eat.css";
</style>
