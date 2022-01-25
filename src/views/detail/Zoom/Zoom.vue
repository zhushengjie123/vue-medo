<template>
  <div class="spec-preview">
    <img :src="skuImageList[0].imgUrl" ref="img" />
    <div class="event" @mousemove="handler"></div>
    <div class="big">
      <img :src="skuImageList[0].imgUrl" ref="big"/>
    </div>
    <!-- 遮罩层 -->
    <div class="mask" ref="mask"></div>
  </div>
</template>

<script>
export default {
  name: "Zoom",
  props: ["skuImageList"],
  mounted() {
    this.$bus.$on("getId", (id) => {
      console.log(id);
    });
  },
  methods: {
    handler(e) {
      let mask = this.$refs.mask;
      let img = this.$refs.img;
      let big=this.$refs.big
      // 获取遮罩层的位置，鼠标所在位置减去遮罩层的一半宽或高
      let left = e.offsetX - mask.offsetWidth / 2;
      let top = e.offsetY - mask.offsetHeight / 2;
      let imgwidth = img.offsetWidth;
      let imgHeight = img.offsetHeight;
      // 实时改变遮罩层的位置，并当位置超出时调整位置
      if (left < 0) left = 0;
      if (top < 0) top = 0;
      if (left + mask.offsetWidth > imgwidth)
        left = imgwidth - mask.offsetWidth;
      if (top + mask.offsetHeight > imgHeight)
        top = imgHeight - mask.offsetHeight;
      mask.style.left = left + "px";
      mask.style.top = top + "px";
      // 调整二倍放大图的位置同步
      //因为是二倍图，所以鼠标每往右移动1像素，对应的图像就应往左偏移2像素
      big.style.left=-2*left + "px";
       big.style.top = -2*top + "px";
    },
  },
};
</script>

<style lang="less">
.spec-preview {
  position: relative;
  width: 400px;
  height: 400px;
  border: 1px solid #ccc;

  img {
    width: 100%;
    height: 100%;
  }

  .event {
    width: 100%;
    height: 100%;
    position: absolute;
    top: 0;
    left: 0;
    z-index: 998;
  }

  .mask {
    width: 50%;
    height: 50%;
    background-color: rgba(0, 255, 0, 0.3);
    position: absolute;
    left: 0;
    top: 0;
    display: none;
  }

  .big {
    width: 100%;
    height: 100%;
    position: absolute;
    top: -1px;
    left: 100%;
    border: 1px solid #aaa;
    overflow: hidden;
    z-index: 998;
    display: none;
    background: white;

    img {
      width: 200%;
      max-width: 200%;
      height: 200%;
      position: absolute;
      left: 0;
      top: 0;
    }
  }

  .event:hover ~ .mask,
  .event:hover ~ .big {
    display: block;
  }
}
</style>