<template>
  <!-- 商品分类导航 -->
  <div class="type-nav">
    <div class="container" @mouseenter="showSelect" @mouseleave="unshowSelect">
      <h2 class="all" @mouseenter="itHidden" @mouseleave="itUnHidden">
        全部商品分类
      </h2>
      <nav class="nav">
        <a href="###">服装城</a>
        <a href="###">美妆馆</a>
        <a href="###">超市</a>
        <a href="###">全球购</a>
        <a href="###">闪购</a>
        <a href="###">团购</a>
        <a href="###">有趣</a>
        <a href="###">秒杀</a>
      </nav>
      <transition name="trans">
        <div
          class="sort"
          v-show="show"
          :class="ifHidden"
          @mouseenter="itUnHidden"
        >
          <!-- 事件委派的方式来实现三级路由跳转 -->
          <div class="all-sort-list2" @click="goSearch">
            <div
              class="item"
              v-for="c1 in categoryList.slice(0, 17)"
              :key="c1.categoryId"
            >
              <h3>
                <!-- 下面三个自定义属性name和ID是用来传参的，中间的1ID是用来判断是几级标签 -->
                <a
                  :data-categoryName="c1.categoryName"
                  :data-category1Id="c1.categoryId"
                  >{{ c1.categoryName }}</a
                >
              </h3>
              <div class="item-list clearfix">
                <div
                  class="subitem"
                  v-for="c2 in c1.categoryChild"
                  :key="c2.categoryId"
                >
                  <dl class="fore">
                    <dt>
                      <a
                        :data-categoryName="c2.categoryName"
                        :data-category2Id="c2.categoryId"
                        >{{ c2.categoryName }}</a
                      >
                    </dt>
                    <dd>
                      <em v-for="c3 in c2.categoryChild" :key="c3.categoryId">
                        <a
                          :data-categoryName="c3.categoryName"
                          :data-category3Id="c3.categoryId"
                          >{{ c3.categoryName }}</a
                        >
                      </em>
                    </dd>
                  </dl>
                </div>
              </div>
            </div>
          </div>
        </div>
      </transition>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";
export default {
  name: "typeNav",
  data() {
    return {
      show: true,
      ifHidden: "",
    };
  },
  // 组件挂载完毕发送请求
  mounted() {
    //为了性能优化，即再次进入该页面时请求只发一次，所以将发送请求放在App组件内
    // this.$store.dispatch("home/catagoryList");
    // 进入search模块时隐藏标签目录
    if (this.$route.path != "/home") {
      //当当前路由路径不是home时隐藏标签目录
      this.show = false;
    }
  },
  computed: {
    ...mapState("home", { categoryList: "categoryList" }),
  },
  methods: {
    goSearch(e) {
      //用事件委派+编程式导航实现三级路由跳转
      //出现的问题：事件委派是将所有的子节点都委派给了父节点。
      // 1.点击a标签实现路由跳转，但我们无法知道点击的是不是a标签
      // 解决：在a标签中添加自定义属性，而其他子节点中是没有的
      // 2.即使能够确认点击的是a标签，但无法区分是一级二级还是三级导航
      // 解决：通过e.target获取到并再新增自定义属性判断

      //这里主要是为了性能优化，且为了以后能够在细分标签下做更多的事情否则只需要下面一个if就可以了，因为e.target本身就能拿到点击的标签
      if (e.target.hasAttribute("data-categoryName")) {
        //判断是否是a标签
        let query = {};

        if (e.target.hasAttribute("data-category1Id")) {
          //若是一级标签
          query.categoryName = e.target.getAttribute("data-categoryName");
          query.category1Id = e.target.getAttribute("data-category1Id");
        } else if (e.target.hasAttribute("data-category2Id")) {
          //若是二级标签

          query.categoryName = e.target.getAttribute("data-categoryName");
          query.category2Id = e.target.getAttribute("data-categor2Id");
        } else {
          //若是是三级标签

          query.categoryName = e.target.getAttribute("data-categoryName");
          query.category3Id = e.target.getAttribute("data-category3Id");
        }
        let location={name:'search'}
        location.params = this.$route.params;
        location.query=query
        this.$router.push(
        location);
            //  this.$store.dispatch("search/searchList",query)
      }
    },
    showSelect() {
      this.show = true;
    },
    unshowSelect() {
      if (this.$route.path != "/home") {
        //当当前路由路径不是home时隐藏标签目录
        this.show = false;
      }
      this.ifHidden = "hidden";
    },
    itHidden() {
      //加上hidden类名动态添加隐藏属性为了文字能够随着动画展开缓慢显示
      this.ifHidden = "hidden";
    },
    itUnHidden() {
      this.ifHidden = "";
    },
  },
};
</script>

<style lang="less" scoped>
.type-nav {
  border-bottom: 2px solid #e1251b;
  .container {
    width: 1200px;
    margin: 0 auto;
    display: flex;
    position: relative;

    .all {
      width: 210px;
      height: 45px;
      background-color: #e1251b;
      line-height: 45px;
      text-align: center;
      color: #fff;
      font-size: 14px;
      font-weight: bold;
    }

    .nav {
      a {
        height: 45px;
        margin: 0 22px;
        line-height: 45px;
        font-size: 16px;
        color: #333;
      }
    }

    .sort {
      position: absolute;
      left: 0;
      top: 45px;
      width: 210px;
      height: 480px;
      position: absolute;
      background: #fafafa;
      z-index: 999;

      .all-sort-list2 {
        .item {
          h3 {
            line-height: 28px;
            font-size: 14px;
            font-weight: 400;
            overflow: hidden;
            padding: 0 10px;
            margin: 0;

            a {
              color: #333;
            }
          }

          .item-list {
            display: none;
            position: absolute;
            width: 734px;
            min-height: 460px;
            background: #f7f7f7;
            left: 210px;
            border: 1px solid #ddd;
            top: 0;
            z-index: 9999 !important;

            .subitem {
              float: left;
              width: 650px;
              padding: 0 4px 0 8px;

              dl {
                border-top: 1px solid #eee;
                padding: 6px 0;
                overflow: hidden;
                zoom: 1;

                &.fore {
                  border-top: 0;
                }

                dt {
                  float: left;
                  width: 54px;
                  line-height: 22px;
                  text-align: right;
                  padding: 3px 6px 0 0;
                  font-weight: 700;
                }

                dd {
                  float: left;
                  width: 415px;
                  padding: 3px 0 0;
                  overflow: hidden;

                  em {
                    float: left;
                    height: 14px;
                    line-height: 14px;
                    padding: 0 8px;
                    margin-top: 5px;
                    border-left: 1px solid #ccc;
                  }
                }
              }
            }
          }

          &:hover {
            .item-list {
              display: block;
            }
          }
          &:hover {
            background-color: #ccc;
          }
        }
      }
    }
  }
}
a:hover {
  color: black;
  cursor: pointer;
}
.trans-enter-active {
  //vue中的动画开始样式名,若transition标签起名字了前面开头就是名字,如（trans-）f否则默认（v-）
  animation: transAnimate 0.3s linear;
}
.trans-leave-active {
  //vue中的动画结束动画样式名（此处实现的是移入移出的简单动画）
  animation: transAnimate 0.3s reverse;
}
@keyframes transAnimate {
  from {
    height: 0;
  }
  to {
    height: 480px;
  }
}
.hidden {
  overflow: hidden;
}
</style>