<template>
  <div class="app-shell">
    <div class="app-view-wrapper">
      <div class="app-view">
        <div class="container fluid" v-if="productData">
          <header>
            <div class="fill-height layout align-center">
              <a class="header-btn" @click="goback">
                <i class="iconfont icon-back"></i>
              </a>
              <div class="placeholder"></div>
              <a class="header-btn share-btn">
                <i class="iconfont icon-share"></i>
              </a>
            </div>
          </header>
          <div class="swiper-container gallery-view">
            <div class="swiper-wrapper">
              <div
                v-for="(imgUrl,index) in galleryView"
                :key="index"
                class="swiper-slide">
                <img class="img swiper-lazy" :data-src="imgUrl">
                <div class="swiper-lazy-preloader"></div>
              </div>
            </div>
            <div class="swiper-pagination"></div>
          </div>
          <div class="overview">
            <div class="goods-name ui-flex align-center justify-start">{{titleView.name}}</div>
            <div class="goods-brief" v-html="titleView.product_desc"></div>
            <div class="goods-price layout align-end justify-start">
              <div class="price cur-price">{{selectedGood.price}}</div>
              <div class="price origin-price" v-show="selectedGood.market_price>selectedGood.price">{{selectedGood.market_price}}</div>
            </div>
          </div>
          <div class="product-section more">
            <div class="border-top-1px ui-flex align-start justify-start J_linksign-customize">
              <div class="title">促销</div>
              <div class="flex pt1-2x">
                <div class="ui-flex align-center justify-start act-icon mb2x">
                  <div class="icon-desc border-1px">{{canJoinActs.type_desc}}</div>
                  <div class="icon-title">{{canJoinActs.title}}</div>
                </div>
              </div>
            </div>
          </div>
          <div class="product-section more mt2x padding-16-32" @click="showMask=true,showSKU=true">
            <div class="ui-flex align-start justify-start J_linksign-customize">
              <div class="title">已选</div>
              <div class="flex">
                <div class="info">{{selectedGood.name}} x{{selectedGood.buyNumber}}</div>
              </div>
            </div>
          </div>
          <div class="product-section more padding-16-32">
            <div class="border-top-1px ui-flex align-start justify-start J_linksign-customize">
              <div class="title">送至</div>
              <div class="flex">
                <div class="info">
                  <span class="mr1x">珠海市 香洲区</span>
                  <span class="on">有现货</span>
                </div>
              </div>
            </div>
          </div>
          <div class="product-section padding-16-32">
            <div class="border-top-1px ui-flex align-center justify-start J_linksign-customize service-policy-list">
              <div
                v-for="(list,index) in selectedGood.service_refound_policy_list.list"
                :key="index"
                class="flex service-policy-item">
                <img :src="list.img_url" class="mr1x img-icon">
                <span class="fsc1">{{list.item_name}}</span>
              </div>
            </div>
          </div>
          <div class="comment-view space-top">
            <a href="/comment/list/2181500027" class="comment-info border-bottom-1px box-flex align-center justify-space-between entry-more">
              <div class="comment-count">用户评价({{commentView.detail.comments_total}})</div>
              <div class="comment-degree">
                {{commentView.detail.satisfy_per}}%
                <span>满意</span>
              </div>
            </a>
            <MiComment :comment="commentView.list[0]" />
          </div>
          <div class="description-view space-top">
            <div class="tab-header">
              <div class="tab-header-inner border-bottom-1px box-flex align-center">
                <a
                  v-for="(desc,index) in descTabsView"
                  :key="index"
                  class="flex"
                  :class="descTabsViewIndex==index?'on':''"
                  @click="descTabsViewIndex=index">{{desc.name}}</a>
              </div>
            </div>
            <div class="tab-view">
              <div
                v-show="descTabsViewIndex==index"
                v-for="(desc,index) in descTabsView"
                :key="'desc'+index"
                class="tab-item">
                <section v-for="(showDesc,index) in desc.showTabContent" :key="'showDesc'+index">
                  <div class="desc-img-box">
                    <img :src="showDesc.plainView.img">
                  </div>
                </section>
                <section v-show="desc.showMore" v-for="(showDesc,index) in desc.moreTabContent" :key="'moreDesc'+index">
                  <div class="desc-img-box">
                    <img :src="showDesc.plainView.img">
                  </div>
                </section>
                <a v-show="!desc.showMore" class="show-all-desc" @click.stop="desc.showMore=true">查看全部图文详情 &gt;</a>
              </div>
            </div>
          </div>
          <MiRecommend :id="id"/>
        </div>

        <footer>
          <div class="fill-height layout align-center">
            <router-link :to="{name:'home'}" class="footer-btn">
              <i class="iconfont icon-home"></i>
              <span>首页</span>
            </router-link>
            <router-link :to="{name:'cart'}" class="footer-btn">
              <i class="iconfont icon-cart"></i>
              <span>购物车</span>
            </router-link>
            <div class="action-box flex" @click="showMask=true,showSKU=true">
              <a class="btn buy-btn">加入购物车</a>
            </div>
          </div>
        </footer>

        <div class="ui-mask" v-show="showMask"></div>
        <MiSKU
          :showSKU="showSKU"
          :productData="productData"
          @close="closeSKU"
          @selectSKU="selectSKU"/>
      </div>
    </div>
  </div>
</template>

<script>
import fetch from '@/api/fetch.js'
import Swiper from 'swiper'
import 'swiper/dist/css/swiper.min.css'
import MiComment from '@/components/MiComment.vue'
import MiRecommend from '@/components/MiRecommend.vue'
import MiSKU from '@/components/MiSKU.vue'

export default {
  components: {
    MiComment,
    MiRecommend,
    MiSKU
  },
  data () {
    return {
      productData: null,
      galleryView: null, // 轮播数据
      titleView: null, // 轮播图下方描述数据
      canJoinActs: null, // 促销数据
      commentView: null,
      descTabsView: null, // 概述下面的图片数据
      descTabsViewIndex: 0,
      id: '',
      showMask: false, // 遮罩层
      showSKU: false,
      selectedGood: null,
      detailSwiper: null
    }
  },
  beforeRouteEnter (to, from, next) {
    if (from.name) {
      fetch('productView', {
        commodity_id: to.params.id
      }).then(res => {
        next(vm => vm.setProductData(res, to.params.id))
      })
    } else {
      next(vm => vm.getProductData())
    }
  },
  created () {
    this.id = this.$route.params.id
  },
  destroyed () {
    if (Array.isArray(this.detailSwiper)) {
      this.detailSwiper.forEach(item => {
        item.destroy()
      })
    } else {
      this.detailSwiper.destroy()
    }
  },
  methods: {
    getProductData () {
      this.$fetch('productView', {
        commodity_id: this.$route.params.id
      }).then(res => {
        this.setProductData(res, this.$route.params.id)
      })
    },
    setProductData (res, id) {
      this.$NProgress.done()
      this.id = id
      let data = res.data
      let viewContent = data.view_content
      let descTabsView = viewContent.descTabsView.descTabsView
      descTabsView.forEach(item => {
        let tabContent = item.tabContent
        if (tabContent.length > 3) {
          item.showTabContent = tabContent.slice(0, 3)
          item.moreTabContent = tabContent.slice(3)
        } else {
          item.showTabContent = tabContent
        }
        item.showMore = false
      })
      this.productData = data
      this.galleryView = viewContent.galleryView.galleryView
      this.titleView = viewContent.titleView.titleView
      this.canJoinActs = this.titleView.canJoinActs[0]
      this.commentView = viewContent.commentView.commentView
      this.selectedGood = data.goods_info.find(item => {
        return item.goods_id == data.default_goods_id
      })
      console.log('selected', this.selectedGood)
      this.descTabsView = descTabsView
     // swiper是基于dom的，所以用nextTick保证Dom更新完成后再初始化swiper
      this.$nextTick(() => {
        this.detailSwiper = new Swiper('.swiper-container', {
          pagination: {
            el: '.swiper-pagination'
          },
          loop: true,
          lazy: { // 轮播预加载
            loadPrevNext: true
          }
        })
      })
    },
    closeSKU () {
      this.showMask = false
      this.showSKU = false
    },
    selectSKU (val) {
      this.selectedGood = val
    }
  }
}
</script>

<style scoped>
.app-view {
  box-sizing: border-box;
  padding-bottom: 52px;
  z-index: 2;
}
.container {
  position: relative;
  height: 100%;
  overflow-x: hidden;
  overflow-y: auto;
  -webkit-overflow-scrolling: touch;
  background: #efefef;
  margin-right: auto;
  margin-left: auto;
  -webkit-flex-basis: 100%;
  flex-basis: 100%;
}
.container.fluid {
  max-width: 100%;
  width: 100%;
}
header {
  height: 50px;
  background: transparent;
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  z-index: 10;
}
.fill-height {
  height: 100%;
}

header .header-btn {
  display: block;
  width: 32px;
  height: 32px;
  margin: 0 10px;
  color: #ddd;
  background: rgba(0,0,0,.6);
  border-radius: 50%;
}
header .iconfont {
  font-size: 18px;
  line-height: 32px;
}
header .placeholder {
  flex: 1;
}
.container .gallery-view {
  background: #ccc;
  width: 100%;
  height: 412px;
  position: relative;
}
.container .gallery-view .img {
  display: block;
  width: 375px;
  height: 412px;
  max-width: 100%;
  max-height: 100%;
  position: absolute;
}
.swiper-pagination {
  position: absolute;
  bottom: 10px;
  left: 0;
  width: 100%;
  text-align: center;
  z-index: 10;
}
.container .overview {
  background: #fff;
  text-align: left;
  padding: 10px 16px 0;
}
.container .overview .goods-name {
  font-size: 18px;
  line-height: 28px;
}
.container .overview .goods-brief {
  font-size: 14px;
  line-height: 18px;
  color: rgba(0,0,0,.54);
}
.container .overview .goods-price {
  padding: 10px 0;
  align-items: center;
}
.container .overview .goods-price .cur-price {
  color: #ff6700;
  font-size: 24px;
  font-weight: 700;
}
.container .overview .goods-price .origin-price {
  margin-left: 8px;
  color: rgba(0,0,0,.54);
  font-size: 12px;
  text-decoration: line-through;
}

.align-end {
  align-items: flex-end;
}
.container .product-section {
  position: relative;
  padding: 10px 16px 0;
  background: #fff;
  border-top: 1px;
  text-align: left;
}

.container .product-section .title {
  width: 41px;
  font-size: 12px;
  color: rgba(0,0,0,.54);
  line-height: 20px;
}

.container .product-section .act-icon {
  position: relative;
  padding-right: 10%;
  white-space: nowrap;
}

.container .product-section .act-icon .icon-desc {
  color: #f56600;
  border-radius: 1px;
  padding: 1.5px 2.5px 0.5px;
  margin: 0 0 0.5px;
  font-size: 8px;
}
.container .product-section .act-icon .icon-desc:before {
  border-color: #f56600;
}

.container .product-section .act-icon .icon-title {
  margin-left: 4.17px;
  font-size: 12px;
  line-height: 20px;
  color: rgba(0,0,0,.87);
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
.more:after {
  content: "";
  position: absolute;
  right: 16px;
  top: 50%;
  width: 8px;
  height: 8px;
  border-left: 1px solid currentColor;
  border-top: 1px solid currentColor;
  transform: translate3d(0,-50%,0) rotate(135deg);
}
.container .product-section.padding-16-32 {
  padding: 8px 16px;
}

.container .product-section .info {
  font-size: 12px;
  color: rgba(0,0,0,.87);
  line-height: 20px;
  padding-right: 10px;
}
.container .product-section .service-policy-item {
  font-size: 12px;
  line-height: 20px;
  margin-right: 10px;
  flex: 0 1 auto;
}
.container .product-section .img-icon {
  height: 10px;
  width: auto;
}

.container .product-section .fsc1 {
  font-size: 10px;
  color: rgba(0,0,0,.54);
}
.container .comment-view {
  text-align: left;
  background: #fff;
}
.space-top {
  margin-top: 8px;
}
.container .comment-view .comment-info {
  padding: 16px 0;
  margin: 0 16px;
  font-size: 12px;
}

.container .comment-view .border-bottom-1px:before {
  border-color: #f4f4f4;
}

.container .comment-view .comment-count,
.container .comment-view .comment-degree span {
  color: rgba(0,0,0,.54);
}
.container .comment-view .comment-degree {
  color: #ff6700;
  text-align: right;
}
.entry-more {
  position: relative;
  padding-right: 20px!important;
}
.entry-more:after {
  content: " ";
  width: 7px;
  height: 7px;
  border-top: 1px solid #ddd;
  border-right: 1px solid #ddd;
  position: absolute;
  top: 50%;
  right: 0;
  margin-top: -3.5px;
  transform: rotate(45deg);
}
.box-flex>*, .box-inline-flex>* {
  flex: 1 1 auto;
}

.container .description-view .tab-header {
  height: 44px;
}
.container .description-view .tab-header-inner {
  height: 44px;
  background: #fff;
  will-change: scroll-position;
}
.container .description-view .tab-header-inner .flex.on {
  color: #ff6700;
}
.container .description-view .tab-header-inner .flex {
  display: block;
  font-size: 13px;
  width: 100%;
  border-right: 1px solid #f4f4f4;
}
.container .description-view .tab-view {
  background: #fff;
}
.container .description-view .tab-view section {
  overflow: hidden;
}
.container .description-view .tab-view img {
  display: block;
  width: 100%;
  vertical-align: middle;
}
.container .description-view .show-all-desc {
  display: block;
  background: #fff;
  line-height: 44px;
  font-size: 13px;
  color: #ff6700;
}

footer {
  height: 52px;
  background: #fff;
  box-shadow: 0 3px 14px 2px rgba(0,0,0,.12);
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  z-index: 1;
}
footer .footer-btn {
  display: block;
  text-decoration: none;
  width: 72px;
  color: rgba(0,0,0,.54);
  border-left: 1px solid #f4f4f4;
  display: flex;
  flex-direction: column;
}
footer .footer-btn:first-child {
  border-left: none;
}
footer .iconfont {
  font-size: 20px;
}
footer .footer-btn span {
  font-size: 11px;
}
footer .action-box .buy-btn {
  height: 52px;
  line-height: 52px;
}
</style>

<style>
.swiper-container-horizontal>.swiper-pagination-bullets .swiper-pagination-bullet {
  margin: 0 5px;
}
.swiper-pagination-bullet-active {
  background: #fff;
}
</style>