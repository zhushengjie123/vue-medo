<template>
  <div class="swiper-container" ref="mySwiper">
    <div class="swiper-wrapper">
      <div class="swiper-slide" v-for="slide in skuImageList" :key="slide.id">
        <img :src="slide.imgUrl" @click="addActive(slide.id)" :class="currentId==slide.id?'active':''"/>
      </div>
    </div>
    <div class="swiper-button-next"></div>
    <div class="swiper-button-prev"></div>
  </div>
</template>

<script>
import Swiper from "swiper";
export default {
  name: "ImageList",
  data() {
    return {
      //动态绑定数据，用于点击后添加类名
      currentId:0
    };
  },
  props: ["skuImageList"],
  watch: {
    skuImageList() {
      this.$nextTick(function () {
        //官方的异步处理办法，当然也可以用计时器来代替
        //为什么不能直接在mounted中使用，是因为其要跟在更新数据的操作后使用（一定要在数据更新后操作）
        new Swiper(this.$refs.mySwiper, {
          //  一次性展示数量
          slidesPerView: 3,
          //分组切换数量
          slidesPerGroup: 1,

          // 如果需要前进后退按钮
          navigation: {
            nextEl: ".swiper-button-next",
            prevEl: ".swiper-button-prev",
          },
        });
      });
    },
  },
  methods:{
    addActive(id){
this.currentId=id
this.$bus.$emit('getId',id)
    }
  }
};
</script>

<style lang="less" scoped>
.swiper-container {
  height: 56px;
  width: 412px;
  box-sizing: border-box;
  padding: 0 12px;

  .swiper-slide {
    width: 56px;
    height: 56px;

    img {
      width: 100%;
      height: 100%;
      border: 1px solid #ccc;
      padding: 2px;
      width: 50px;
      height: 50px;
      display: block;

      &.active {
        border: 2px solid #f60;
        padding: 1px;
      }
    }
  }

  .swiper-button-next {
    left: auto;
    right: 0;
  }

  .swiper-button-prev {
    left: 0;
    right: auto;
  }

  .swiper-button-next,
  .swiper-button-prev {
    box-sizing: border-box;
    width: 12px;
    height: 56px;
    background: rgb(235, 235, 235);
    border: 1px solid rgb(204, 204, 204);
    top: 0;
    margin-top: 0;
    &::after {
      font-size: 12px;
    }
  }
}
</style>