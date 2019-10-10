
<template>
  <div class="box">
      <div class="header">
          <van-search v-model="value" placeholder="请输入搜索关键词" show-action shape="round" @search="onSearch">
              <div slot="action">搜索</div>
          </van-search>
      </div>
      <div class="content">
         <div class="nav">
            <van-sidebar v-model="item.CategoryId" v-for="(item,index) in sortList" :key="index">
              <van-sidebar-item :title='item.CategoryName' @click="test(item.Childs)" v-on:click="addClass(index)" v-bind:class="{ active:index==current}"/>
            </van-sidebar>
         </div>
          <div class="show_catiner">
            <ul>
                <li>
                  <div class="centerBox">
                    <a href="#" v-for="(show_item,indexs) in Childs" :key="indexs" @click="toOther(show_item.Childs)">
                      <img :src="show_item.PictureUrl" alt="">
                      <p>{{show_item.CategoryName}}</p>
                    </a>
                  </div>
                </li> 
            </ul>
         </div>
      </div>
  </div>
</template>
<script>
export default {
  data(){
    return{
      value:'',
      onSearch:'',
      sortList:'',
      Childs:'',
      current:0
    }
  },
  methods:{
     getSortdata() {
      this.$axios.get('https://mock.yonyoucloud.com/mock/2164/sort/sortList').then(res=>{
        this.sortList = res.data.Data.CategoryList
       for(let i=0; i< this.sortList.length; i++){
          this.Childs =  this.sortList[i].Childs
          return this.Childs
       }
      })
    },
      test(e){
      this.Childs = e
    },
      addClass(index){ 
        this.current=index;
    },
    toOther(e){
      this.Childs = e
      this.$router.push({path:'/sortAll'})
      var comment = {user:this.Childs}
      var list = JSON.parse(sessionStorage.getItem("cmts") || '[]')
      list.unshift(comment)
      sessionStorage.setItem('cmts',JSON.stringify(list))
      // this.user = this.content = ''
      this.$emit('func')
    }
  },


  created(){
    this.getSortdata()
  },
}
</script>>

<style scoped>
@import '../static/css/sort.css';
</style>
