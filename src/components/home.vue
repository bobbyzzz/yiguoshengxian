<template>
  <div>
    <div class="alertBox" v-show="alert">
      <p>请选择你的所在地</p>
      <p>
        <!-- <button >确认</button> -->
        <van-button type="default" @click="checkAddress" color="rgb(183, 183, 183)">确认</van-button>
      </p>
    </div>

    <div class="alertBoxFooter" v-show="alertBoxFooter_show"></div>

    <div class="home_box" v-show="home_box_show">
      <div class="home_header">
        <div class="home_address">
          <van-button type="primary" @click="showPopup">
            {{this.currentArea}}
            <span class="home_arrow">></span>
          </van-button>

          <van-popup v-model="show">
            <van-area
              :area-list="areaList"
              :columns-num="2"
              title="请选择所在地"
              @cancel="cancelAddress"
              @confirm="confirmAddress"
              :item-height="100"
            />
          </van-popup>
        </div>

        <div class="home_search">
          <form action method="post">
            <van-search placeholder="请输入商品名称" background="white" />
          </form>
        </div>
      </div>

      <div class="home_slide">
        <van-swipe v-if="home.templateComponentList[0]" :autoplay="5000" indicator-color="white">
          <van-swipe-item
            v-for="(home_slide_item,home_slide_index) in this.home.templateComponentList[0].carouselPictures"
            :key="home_slide_index"
          >
            <a :href="home_slide_item.hrefValue">
              <img :src="home_slide_item.pictureUrl" alt width="100%" />
            </a>
          </van-swipe-item>
        </van-swipe>
      </div>

      <div class="home_nav" v-if="home.templateComponentList[0]">
        <ul>
          <li
            v-for="(home_nav_item,home_nav_index) in this.home.templateComponentList[0].navComponentList"
            :key="home_nav_index"
          >
            <a
              v-if="home_nav_item.hrefValue.indexOf('http')==-1?home_nav_item.hrefValue=productList_html+home_nav_item.hrefValue:home_nav_item.hrefValue=home_nav_item.hrefValue"
              :href="home_nav_item.hrefValue"
            >
              <img :src="home_nav_item.pictureUrl" alt />
              <p>{{home_nav_item.navName}}</p>
            </a>
          </li>
        </ul>
      </div>

      <div class="home_banner" v-if="home.templateComponentList[0].adPictures[0]">
        <a :href="this.home.templateComponentList[0].adPictures[0].hrefValue">
          <img :src="this.home.templateComponentList[0].adPictures[0].pictureUrl" alt width="100%" />
        </a>
      </div>

      <div class="home_bulletin_content" v-if="home.templateComponentList[0]">
        <img src="../static/img/Home/news.png" alt width="68" class="home_bulletin_content_img" />
        <van-swipe
          style="height: 14px;"
          vertical
          :autoplay="3000"
          :show-indicators="false"
          class="home_bulletin_content_swipe"
        >
          <van-swipe-item
            v-for="(home_bulletin_content_item,home_bulletin_content_index) in this.home.templateComponentList[0].fastReportsList"
            :key="home_bulletin_content_index"
          >
            <a
              :href="home_bulletin_content_item.hrefValue"
            >{{home_bulletin_content_item.fastReportTitle}}</a>
          </van-swipe-item>
        </van-swipe>
      </div>

      <div v-if="home.templateComponentList[1].adPictures[0].pictureUrl">
        <img :src="this.home.templateComponentList[1].adPictures[0].pictureUrl" alt width="100%" />
      </div>

      <div class="productList" v-if="home.templateComponentList[1].commoditysComponentList">
        <ul>
          <div>
            <li
              v-for="(flash_sale_item,flash_sale_index) in this.home.templateComponentList[1].commoditysComponentList"
              :key="flash_sale_index"
            >
              <!-- <a :href="product_html+flash_sale_item.commodityCode"> -->
              <a @click="toSortCar(flash_sale_item)">
                <p>
                  <img :src="flash_sale_item.pictureUrl" alt width="116" />
                  <span class="saleSlogan">{{flash_sale_item.saleSlogan}}</span>
                </p>
                <p class="commodityName">{{flash_sale_item.commodityName}}</p>
                <p>
                  <span class="commodityPrice">￥{{flash_sale_item.commodityPrice}}</span>
                  <a href="javascript:;">
                    <span class="shopcarImg" @click.stop="addShopcar(flash_sale_item)">
                      <img src="../static/img/Home/ksgw.png" alt />
                    </span>
                  </a>
                </p>
              </a>
            </li>
          </div>
        </ul>
      </div>

      <div class="home_recommend" v-if="home1.templateComponentList">
        <img :src="this.home.templateComponentList[2].adPictures[0].pictureUrl" alt />
        <a :href="this.product_html+this.home.templateComponentList[3].adPictures[0].hrefValue">
          <img :src="this.home.templateComponentList[3].adPictures[0].pictureUrl" alt />
        </a>
        <ul>
          <li
            v-for="(home_recommend_item,home_recommend_index) in this.home1.templateComponentList"
            :key="home_recommend_index"
          >
            <a :href="product_html+home_recommend_item.adPictures[0].hrefValue">
              <img :src="home_recommend_item.adPictures[0].pictureUrl" alt />
            </a>
          </li>
        </ul>
      </div>

      <div class="home_group productList" v-if="home2.templateComponentList">
        <ul
          v-for="(home_group_item,home_group_index) in this.home2.templateComponentList"
          :key="home_group_index"
        >
          <a :href="home_group_item.adPictures[0].hrefValue">
            <img :src="home_group_item.adPictures[0].pictureUrl" alt width="100%" />
          </a>
          <div class="gundongtiao" v-if="home_group_item">
            <li
              v-for="(home_group_commoditysComponentList_item,home_group_commoditysComponentList_item_index) in home_group_item.commoditysComponentList"
              :key="home_group_commoditysComponentList_item_index"
            >
              <!-- <a :href="product_html+home_group_commoditysComponentList_item.commodityCode"> -->
              <a @click="toSortCar(home_group_commoditysComponentList_item)">
                <p>
                  <img :src="home_group_commoditysComponentList_item.pictureUrl" alt width="116" />
                  <span class="saleSlogan">{{home_group_commoditysComponentList_item.saleSlogan}}</span>
                </p>
                <p class="commodityName">{{home_group_commoditysComponentList_item.commodityName}}</p>
                <p>
                  <span
                    class="commodityPrice"
                  >￥{{home_group_commoditysComponentList_item.commodityPrice}}</span>
                  <a href="javascript:;">
                    <span
                      class="shopcarImg"
                      @click.stop="addShopcar(home_group_commoditysComponentList_item)"
                    >
                      <img src="../static/img/Home/ksgw.png" alt />
                    </span>
                  </a>
                </p>
              </a>
            </li>
          </div>
        </ul>
      </div>

      <div class="home_group productList" v-if="home3.templateComponentList">
        <ul
          v-for="(home_group_item,home_group_index) in this.home3.templateComponentList"
          :key="home_group_index"
        >
          <a :href="home_group_item.adPictures[0].hrefValue">
            <img :src="home_group_item.adPictures[0].pictureUrl" alt width="100%" />
          </a>
          <div v-if="home_group_item">
            <li
              v-for="(home_group_commoditysComponentList_item,home_group_commoditysComponentList_item_index) in home_group_item.commoditysComponentList"
              :key="home_group_commoditysComponentList_item_index"
            >
              <!-- <a :href="product_html+home_group_commoditysComponentList_item.commodityCode"> -->
              <a @click="toSortCar(home_group_commoditysComponentList_item)">
                <p>
                  <img :src="home_group_commoditysComponentList_item.pictureUrl" alt width="116" />
                  <span class="saleSlogan">{{home_group_commoditysComponentList_item.saleSlogan}}</span>
                </p>
                <p class="commodityName">{{home_group_commoditysComponentList_item.commodityName}}</p>
                <p>
                  <span
                    class="commodityPrice"
                  >￥{{home_group_commoditysComponentList_item.commodityPrice}}</span>
                  <a href="javascript:;">
                    <span
                      class="shopcarImg"
                      @click.stop="addShopcar(home_group_commoditysComponentList_item)"
                    >
                      <img src="../static/img/Home/ksgw.png" alt />
                    </span>
                  </a>
                </p>
              </a>
            </li>
          </div>
        </ul>
      </div>

      <div class="home_group productList" v-if="home4.templateComponentList">
        <ul
          v-for="(home_group_item,home_group_index) in this.home4.templateComponentList"
          :key="home_group_index"
        >
          <a :href="home_group_item.adPictures[0].hrefValue">
            <img :src="home_group_item.adPictures[0].pictureUrl" alt width="100%" />
          </a>
          <div v-if="home_group_item">
            <li
              v-for="(home_group_commoditysComponentList_item,home_group_commoditysComponentList_item_index) in home_group_item.commoditysComponentList"
              :key="home_group_commoditysComponentList_item_index"
            >
              <!-- <a :href="product_html+home_group_commoditysComponentList_item.commodityCode"> -->
              <a @click="toSortCar(home_group_commoditysComponentList_item)">
                <p>
                  <img :src="home_group_commoditysComponentList_item.pictureUrl" alt width="116" />
                  <span class="saleSlogan">{{home_group_commoditysComponentList_item.saleSlogan}}</span>
                </p>
                <p class="commodityName">{{home_group_commoditysComponentList_item.commodityName}}</p>
                <p>
                  <span
                    class="commodityPrice"
                  >￥{{home_group_commoditysComponentList_item.commodityPrice}}</span>
                  <a href="javascript:;">
                    <span
                      class="shopcarImg"
                      @click.stop="addShopcar(home_group_commoditysComponentList_item)"
                    >
                      <img src="../static/img/Home/ksgw.png" alt />
                    </span>
                  </a>
                </p>
              </a>
            </li>
          </div>
        </ul>
      </div>

      <div class="home_bannerLink" v-if="home5.templateComponentList">
        <ul
          v-for="(home_bannerLink_item,home_bannerLink_index) in this.home5.templateComponentList"
          :key="home_bannerLink_index"
        >
          <li
            v-for="(home_bannerLink_commoditysComponentList_item,home_bannerLink_commoditysComponentList_index) in home_bannerLink_item.adPictures"
            :key="home_bannerLink_commoditysComponentList_index"
          >
            <a :href="home_bannerLink_commoditysComponentList_item.hrefValue">
              <img :src="home_bannerLink_commoditysComponentList_item.pictureUrl" alt />
            </a>
          </li>
        </ul>
      </div>

      <div class="home_commodity_box">
        <div class="home_commodityList" v-if="home5.templateComponentList">
          <ul
            v-for="(home_commodityList_item,home_commodityList_index) in this.home5.templateComponentList"
            :key="home_commodityList_index"
          >
            <li
              v-for="(home_commodityList_commoditysComponentList_item,home_commodityList_commoditysComponentList_index) in home_commodityList_item.commoditysComponentList"
              :key="home_commodityList_commoditysComponentList_index"
            >
              <!-- <a :href="product_html+home_commodityList_commoditysComponentList_item.commodityCode"> -->
              <a @click="toSortCar(home_commodityList_commoditysComponentList_item)">
                <div class="home_commodityList_content">
                  <div class="home_commodityList_img">
                    <img :src="home_commodityList_commoditysComponentList_item.pictureUrl" alt />
                  </div>

                  <div class="home_commodityList_info">
                    <div class="home_commodityList_info_title">
                      <p
                        class="commodityName"
                      >{{home_commodityList_commoditysComponentList_item.commodityName}}</p>
                    </div>

                    <div class="home_commodityList_info_brief">
                      <p class="saleSlogan">
                        <span>{{home_commodityList_commoditysComponentList_item.saleSlogan}}</span>
                      </p>
                      <p
                        class="subTitle"
                      >{{home_commodityList_commoditysComponentList_item.subTitle}}</p>
                    </div>

                    <div class="home_commodityList_info_company">
                      <span
                        class="home_commodityList_info_company_price"
                      >￥{{home_commodityList_commoditysComponentList_item.commodityPrice}}</span>
                      <span
                        class="home_commodityList_info_company_num"
                      >{{home_commodityList_commoditysComponentList_item.commoditySpec}}</span>
                      <a href="javascript:;">
                        <span
                          class="shopcarImg"
                          @click.stop="addShopcar(home_commodityList_commoditysComponentList_item)"
                        >
                          <img src="../static/img/Home/ksgw.png" alt />
                        </span>
                      </a>
                    </div>
                  </div>
                </div>
              </a>
            </li>
          </ul>
        </div>

        <div class="home_commodityList" v-if="home6.templateComponentList">
          <ul
            v-for="(home_commodityList_item,home_commodityList_index) in this.home6.templateComponentList"
            :key="home_commodityList_index"
          >
            <li
              v-for="(home_commodityList_commoditysComponentList_item,home_commodityList_commoditysComponentList_index) in home_commodityList_item.commoditysComponentList"
              :key="home_commodityList_commoditysComponentList_index"
            >
              <!-- <a :href="product_html+home_commodityList_commoditysComponentList_item.commodityCode"> -->
              <a @click="toSortCar(home_commodityList_commoditysComponentList_item)">
                <div class="home_commodityList_content">
                  <div class="home_commodityList_img">
                    <img :src="home_commodityList_commoditysComponentList_item.pictureUrl" alt />
                  </div>

                  <div class="home_commodityList_info">
                    <div class="home_commodityList_info_title">
                      <p
                        class="commodityName"
                      >{{home_commodityList_commoditysComponentList_item.commodityName}}</p>
                    </div>

                    <div class="home_commodityList_info_brief">
                      <p class="saleSlogan">
                        <span>{{home_commodityList_commoditysComponentList_item.saleSlogan}}</span>
                      </p>
                      <p
                        class="subTitle"
                      >{{home_commodityList_commoditysComponentList_item.subTitle}}</p>
                    </div>

                    <div class="home_commodityList_info_company">
                      <span
                        class="home_commodityList_info_company_price"
                      >￥{{home_commodityList_commoditysComponentList_item.commodityPrice}}</span>
                      <span
                        class="home_commodityList_info_company_num"
                      >{{home_commodityList_commoditysComponentList_item.commoditySpec}}</span>
                      <a href="javascript:;">
                        <span
                          class="shopcarImg"
                          @click.stop="addShopcar(home_commodityList_commoditysComponentList_item)"
                        >
                          <img src="../static/img/Home/ksgw.png" alt />
                        </span>
                      </a>
                    </div>
                  </div>
                </div>
              </a>
            </li>
          </ul>
        </div>

        <div class="home_commodityList" v-if="home7.templateComponentList">
          <ul
            v-for="(home_commodityList_item,home_commodityList_index) in this.home7.templateComponentList"
            :key="home_commodityList_index"
          >
            <li
              v-for="(home_commodityList_commoditysComponentList_item,home_commodityList_commoditysComponentList_index) in home_commodityList_item.commoditysComponentList"
              :key="home_commodityList_commoditysComponentList_index"
            >
              <!-- <a :href="product_html+home_commodityList_commoditysComponentList_item.commodityCode"> -->
              <a @click="toSortCar(home_commodityList_commoditysComponentList_item)">
                <div class="home_commodityList_content">
                  <div class="home_commodityList_img">
                    <img :src="home_commodityList_commoditysComponentList_item.pictureUrl" alt />
                  </div>

                  <div class="home_commodityList_info">
                    <div class="home_commodityList_info_title">
                      <p
                        class="commodityName"
                      >{{home_commodityList_commoditysComponentList_item.commodityName}}</p>
                    </div>

                    <div class="home_commodityList_info_brief">
                      <p class="saleSlogan">
                        <span>{{home_commodityList_commoditysComponentList_item.saleSlogan}}</span>
                      </p>
                      <p
                        class="subTitle"
                      >{{home_commodityList_commoditysComponentList_item.subTitle}}</p>
                    </div>

                    <div class="home_commodityList_info_company">
                      <span
                        class="home_commodityList_info_company_price"
                      >￥{{home_commodityList_commoditysComponentList_item.commodityPrice}}</span>
                      <span
                        class="home_commodityList_info_company_num"
                      >{{home_commodityList_commoditysComponentList_item.commoditySpec}}</span>
                      <a href="javascript:;">
                        <span
                          class="shopcarImg"
                          @click.stop="addShopcar(home_commodityList_commoditysComponentList_item)"
                        >
                          <img src="../static/img/Home/ksgw.png" alt />
                        </span>
                      </a>
                    </div>
                  </div>
                </div>
              </a>
            </li>
          </ul>
        </div>
      </div>

      <div class="home_palacesImg_box">
        <div class="home_palacesImg home_palacesImg_one" v-if="home8.templateComponentList">
          <ul
            v-for="(home_palacesImg_item,home_palacesImg_index) in this.home8.templateComponentList"
            :key="home_palacesImg_index"
          >
            <p class="home_palacesImg_title">
              <img src="../static/img/Home/palacesImg_icon.png" alt />
              <span>{{home_palacesImg_item.componentBase.customComponentName}}</span>
              <img src="../static/img/Home/palacesImg_icon2.png" alt />
            </p>
            <div v-if="home_palacesImg_item">
              <li
                v-for="(home_palacesImg_commoditysComponentList_item,home_palacesImg_commoditysComponentList_index) in home_palacesImg_item.commoditysComponentList"
                :key="home_palacesImg_commoditysComponentList_index"
              >
                <!-- <a :href="product_html+home_palacesImg_commoditysComponentList_item.commodityCode"> -->
                <a @click="toSortCar(home_palacesImg_commoditysComponentList_item)">
                  <p>
                    <img :src="home_palacesImg_commoditysComponentList_item.pictureUrl" alt />
                    <span
                      class="saleSlogan"
                    >{{home_palacesImg_commoditysComponentList_item.saleSlogan}}</span>
                  </p>
                  <p
                    class="commodityName"
                  >{{home_palacesImg_commoditysComponentList_item.commodityName}}</p>
                  <p>
                    <span
                      class="commodityPrice"
                    >￥{{home_palacesImg_commoditysComponentList_item.commodityPrice}}</span>
                    <span
                      class="commoditySpec"
                    >{{home_palacesImg_commoditysComponentList_item.commoditySpec}}</span>
                    <a href="javascript:;">
                      <span
                        class="shopcarImg"
                        @click.stop="addShopcar(home_palacesImg_commoditysComponentList_item)"
                      >
                        <img src="../static/img/Home/ksgw.png" alt />
                      </span>
                    </a>
                  </p>
                </a>
              </li>
            </div>
          </ul>
        </div>

        <div class="home_palacesImg" v-if="home9.templateComponentList">
          <ul
            v-for="(home_palacesImg_item,home_palacesImg_index) in this.home9.templateComponentList"
            :key="home_palacesImg_index"
          >
            <p class="home_palacesImg_title">
              <img src="../static/img/Home/palacesImg_icon.png" alt />
              <span>{{home_palacesImg_item.componentBase.customComponentName}}</span>
              <img src="../static/img/Home/palacesImg_icon2.png" alt />
            </p>
            <div v-if="home_palacesImg_item">
              <li
                v-for="(home_palacesImg_commoditysComponentList_item,home_palacesImg_commoditysComponentList_index) in home_palacesImg_item.commoditysComponentList"
                :key="home_palacesImg_commoditysComponentList_index"
              >
                <!-- <a :href="product_html+home_palacesImg_commoditysComponentList_item.commodityCode"> -->
                <a @click="toSortCar(home_palacesImg_commoditysComponentList_item)">
                  <p>
                    <img :src="home_palacesImg_commoditysComponentList_item.pictureUrl" alt />
                    <span
                      class="saleSlogan"
                    >{{home_palacesImg_commoditysComponentList_item.saleSlogan}}</span>
                  </p>
                  <p
                    class="commodityName"
                  >{{home_palacesImg_commoditysComponentList_item.commodityName}}</p>
                  <p>
                    <span
                      class="commodityPrice"
                    >￥{{home_palacesImg_commoditysComponentList_item.commodityPrice}}</span>
                    <span
                      class="commoditySpec"
                    >{{home_palacesImg_commoditysComponentList_item.commoditySpec}}</span>
                    <a href="javascript:;">
                      <span
                        class="shopcarImg"
                        @click.stop="addShopcar(home_palacesImg_commoditysComponentList_item)"
                      >
                        <img src="../static/img/Home/ksgw.png" alt />
                      </span>
                    </a>
                  </p>
                </a>
              </li>
            </div>
          </ul>
        </div>

        <div class="home_palacesImg" v-if="home10.templateComponentList">
          <ul
            v-for="(home_palacesImg_item,home_palacesImg_index) in this.home10.templateComponentList"
            :key="home_palacesImg_index"
          >
            <p class="home_palacesImg_title">
              <img src="../static/img/Home/palacesImg_icon.png" alt />
              <span>{{home_palacesImg_item.componentBase.customComponentName}}</span>
              <img src="../static/img/Home/palacesImg_icon2.png" alt />
            </p>
            <div v-if="home_palacesImg_item.commoditysComponentList">
              <li
                v-for="(home_palacesImg_commoditysComponentList_item,home_palacesImg_commoditysComponentList_index) in home_palacesImg_item.commoditysComponentList"
                :key="home_palacesImg_commoditysComponentList_index"
              >
                <!-- <a :href="product_html+home_palacesImg_commoditysComponentList_item.commodityCode"> -->
                <a @click="toSortCar(home_palacesImg_commoditysComponentList_item)">
                  <p>
                    <img :src="home_palacesImg_commoditysComponentList_item.pictureUrl" alt />
                    <span
                      class="saleSlogan"
                    >{{home_palacesImg_commoditysComponentList_item.saleSlogan}}</span>
                  </p>
                  <p
                    class="commodityName"
                  >{{home_palacesImg_commoditysComponentList_item.commodityName}}</p>
                  <p>
                    <span
                      class="commodityPrice"
                    >￥{{home_palacesImg_commoditysComponentList_item.commodityPrice}}</span>
                    <span
                      class="commoditySpec"
                    >{{home_palacesImg_commoditysComponentList_item.commoditySpec}}</span>
                    <a href="javascript:;">
                      <span
                        class="shopcarImg"
                        @click.stop="addShopcar(home_palacesImg_commoditysComponentList_item)"
                      >
                        <img src="../static/img/Home/ksgw.png" alt />
                      </span>
                    </a>
                  </p>
                </a>
              </li>
            </div>
          </ul>
        </div>

        <div class="home_palacesImg" v-if="home11.templateComponentList">
          <ul
            v-for="(home_palacesImg_item,home_palacesImg_index) in this.home11.templateComponentList"
            :key="home_palacesImg_index"
          >
            <p class="home_palacesImg_title">
              <img src="../static/img/Home/palacesImg_icon.png" alt />
              <span>{{home_palacesImg_item.componentBase.customComponentName}}</span>
              <img src="../static/img/Home/palacesImg_icon2.png" alt />
            </p>
            <div v-if="home_palacesImg_item.commoditysComponentList">
              <li
                v-for="(home_palacesImg_commoditysComponentList_item,home_palacesImg_commoditysComponentList_index) in home_palacesImg_item.commoditysComponentList"
                :key="home_palacesImg_commoditysComponentList_index"
              >
                <!-- <a :href="product_html+home_palacesImg_commoditysComponentList_item.commodityCode"> -->
                <a @click="toSortCar(home_palacesImg_commoditysComponentList_item)">
                  <p>
                    <img :src="home_palacesImg_commoditysComponentList_item.pictureUrl" alt />
                    <span
                      class="saleSlogan"
                    >{{home_palacesImg_commoditysComponentList_item.saleSlogan}}</span>
                  </p>
                  <p
                    class="commodityName"
                  >{{home_palacesImg_commoditysComponentList_item.commodityName}}</p>
                  <p>
                    <span
                      class="commodityPrice"
                    >￥{{home_palacesImg_commoditysComponentList_item.commodityPrice}}</span>
                    <span
                      class="commoditySpec"
                    >{{home_palacesImg_commoditysComponentList_item.commoditySpec}}</span>
                    <a href="javascript:;">
                      <span
                        class="shopcarImg"
                        @click.stop="addShopcar(home_palacesImg_commoditysComponentList_item)"
                      >
                        <img src="../static/img/Home/ksgw.png" alt />
                      </span>
                    </a>
                  </p>
                </a>
              </li>
            </div>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import addressInfo from "../static/js/area.js";

export default {
  data() {
    return {
      show: false,
      areaList: addressInfo,
      currentArea: "",
      home: [],
      home1: [],
      home2: [],
      home3: [],
      home4: [],
      home5: [],
      home6: [],
      home7: [],
      home8: [],
      home9: [],
      home10: [],
      home11: [],
      productList_html:
        "https://h5mall.yiguo.com/product/productList.html?CatId=",
      product_html:
        "https://h5mall.yiguo.com/product/product.html?commodityCode=",
      carData: [],
      cmts2: [],
      alert: false,
      home_box_show: false,
      alertBoxFooter_show: false
    };
  },

  methods: {
    showPopup() {
      this.show = true;
    },
    cancelAddress() {
      this.show = false;
    },
    confirmAddress(val) {
      this.show = false;
      this.currentArea = val[1].name;
      sessionStorage.setItem("address", this.currentArea);
    },
    getData() {
      this.$axios
        .get("https://mock.yonyoucloud.com/mock/2164/home/homeList")
        .then(res => {
          this.home = res.data.Data;
          // console.log(this.home)
        });

      this.$axios
        .get("https://mock.yonyoucloud.com/mock/2164/home1/homeList")
        .then(res => {
          this.home1 = res.data.Data;
          // console.log(this.home1)
        });

      this.$axios
        .get("https://mock.yonyoucloud.com/mock/2164/home2/homeList")
        .then(res => {
          this.home2 = res.data.Data;
          // console.log(this.home2)

          for (let i = 0; i < this.home2.templateComponentList.length; i++) {
            let str = this.home2.templateComponentList[i].adPictures[0]
              .hrefValue;
            // if (str.indexOf("http") == -1) {
            //   this.home2.templateComponentList[i].adPictures[0].hrefValue =
            //     this.product_html + str;
            // }
          }
        });

      this.$axios
        .get("https://mock.yonyoucloud.com/mock/2164/home3/homeList")
        .then(res => {
          this.home3 = res.data.Data;
          // console.log(this.home3)
        });

      this.$axios
        .get("https://mock.yonyoucloud.com/mock/2164/home4/homeList")
        .then(res => {
          this.home4 = res.data.Data;
          // console.log(this.home4)
        });

      this.$axios
        .get("https://mock.yonyoucloud.com/mock/2164/home5/homeList")
        .then(res => {
          this.home5 = res.data.Data;
          // console.log(this.home5)
        });

      this.$axios
        .get("https://mock.yonyoucloud.com/mock/2164/home6/homeList")
        .then(res => {
          this.home6 = res.data.Data;
          // console.log(this.home6)
        });

      this.$axios
        .get("https://mock.yonyoucloud.com/mock/2164/home7/homeList")
        .then(res => {
          this.home7 = res.data.Data;
          // console.log(this.home7)
        });

      this.$axios
        .get("https://mock.yonyoucloud.com/mock/2164/home8/homeList")
        .then(res => {
          this.home8 = res.data.Data;
          // console.log(this.home8)
        });

      this.$axios
        .get("https://mock.yonyoucloud.com/mock/2164/home9/homeList")
        .then(res => {
          this.home9 = res.data.Data;
          // console.log(this.home9)
        });

      this.$axios
        .get("https://mock.yonyoucloud.com/mock/2164/home10/homeList")
        .then(res => {
          this.home10 = res.data.Data;
          // console.log(this.home10)
        });
    },
    checkAddress() {
      this.alert = false;
      this.home_box_show = true;
      this.alertBoxFooter_show = false;
      if (sessionStorage.address == null) {
        sessionStorage.setItem("address", this.currentArea);
        // alert('请选择你的所在地')
        this.show = true;
      } else {
        this.show = false;
        this.currentArea = sessionStorage.getItem("address", this.currentArea);
      }
    },
    getAddress() {
      if (sessionStorage.address) {
        this.currentArea = sessionStorage.address;
        this.alertBoxFooter_show = false;
      }
    },
    addShopcar(user) {
      let carDataInfo = {
        listData: user
      };
      this.carData.push(carDataInfo);

      for (var x = 0; x < this.carData.length; x++) {
        this.carData[x].listData.CommodityCode = this.carData[
          x
        ].listData.commodityCode;
        this.carData[x].listData.CommodityName = this.carData[
          x
        ].listData.commodityName;

        this.carData[x].listData.SellPrice = this.carData[
          x
        ].listData.commodityPrice;

        this.carData[x].listData.Spec = this.carData[x].listData.commoditySpec;

        this.carData[x].listData.CommodityId = this.carData[
          x
        ].listData.commodityComponentId;

        this.carData[x].listData.SubTitle = this.carData[x].listData.subTitle;

        this.carData[x].listData.SmallPic = this.carData[x].listData.pictureUrl;

        this.carData[x].listData.State = this.carData[x].listData.state;
      }

      sessionStorage.setItem("cmts1", JSON.stringify(this.carData));
      this.$toast("添加购物车成功");
    },
    toSortCar(user2) {
      let productInfo = {
        user2: user2
      };
      this.cmts2.push(productInfo);

      this.cmts2[0].user2.CommodityCode = this.cmts2[0].user2.commodityCode;

      this.cmts2[0].user2.CommodityName = this.cmts2[0].user2.commodityName;

      this.cmts2[0].user2.SellPrice = this.cmts2[0].user2.commodityPrice;

      this.cmts2[0].user2.Spec = this.cmts2[0].user2.commoditySpec;

      this.cmts2[0].user2.CommodityId = this.cmts2[0].user2.commodityComponentId;

      this.cmts2[0].user2.SubTitle = this.cmts2[0].user2.subTitle;

      this.cmts2[0].user2.SmallPic = this.cmts2[0].user2.pictureUrl;

      sessionStorage.setItem("cmts2", JSON.stringify(this.cmts2));
      this.$router.push("/sortCar");
    },
    initCarData() {
      if (sessionStorage.getItem("cmts1")) {
        var home_carData_newArr = [];
        home_carData_newArr = JSON.parse(sessionStorage.getItem("cmts1"));

        for (let i = 0; i < home_carData_newArr.length; i++) {
          this.carData.push(home_carData_newArr[i]);
        }
        // console.log(this.carData)
      }
    },
    alertCheck() {
      if (sessionStorage.address == null) {
        this.alert = true;
        this.home_box_show = false;
        this.alertBoxFooter_show = true;
      } else {
        this.alert = false;
        this.home_box_show = true;
        this.alertBoxFooter_show = false;
      }
    }
  },
  created() {
    this.initCarData();
    this.getData();
    this.alertCheck();
    this.getAddress();
  }
};
</script>


<style scoped>
@import "../static/css/home.css";
</style>
