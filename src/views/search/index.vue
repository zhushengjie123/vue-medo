<template>
  <div>
    <TypeNav />
    <div class="main">
      <div class="py-container">
        <!--bread，面包屑，带有×的结构-->
        <div class="bread">
          <ul class="fl sui-breadcrumb">
            <li>
              <a href="#">全部结果</a>
            </li>
          </ul>
          <ul class="fl sui-tag">
            <!-- 分类的面包屑 -->
            <li class="with-x" v-if="searchParams.categoryName">
              {{ searchParams.categoryName
              }}<i @click="delateCategoryName">×</i>
            </li>
            <!-- 关键字的面包屑 -->
            <li class="with-x" v-if="searchParams.keyWord">
              {{ searchParams.keyWord }}<i @click="delateKeyword">×</i>
            </li>
            <!-- 品牌的面包屑 -->
            <li class="with-x" v-if="searchParams.trademark">
              {{
                searchParams.trademark.split(":").pop() == "尚硅谷"
                  ? "一零七"
                  : searchParams.trademark.split(":").pop()
              }}<i @click="delateTradeMark">×</i>
            </li>
            <!-- 平台售卖属性的面包屑 因为不是简单的字符串而是一个需要遍历的数组所以不能使用v-if，而是要用v-for-->
            <li
              class="with-x"
              v-for="(prop, index) in searchParams.props"
              :key="index"
            >
              {{ prop.split(":")[1] }}<i @click="delateProp(index)">×</i>
            </li>
          </ul>
        </div>

        <!--selector-->
        <!-- 自定义事件，子给父传参 -->
        <SearchSelector @goTrademark="goTrademark" @goAttr="goAttr" />

        <!--details-->
        <div class="details clearfix">
          <div class="sui-navbar">
            <div class="navbar-inner filter">
              <!-- 排序 -->
              <ul class="sui-nav">
                <!-- 判断数据中是否含有'1'或'2'来决定active类名的归属,封装在计算属性中 -->
                <li :class="ifOrder1" @click="checkIt('1')">
                  <a href="###"
                    >综合<span v-show="ifOrder1" :class="orderWay"></span
                  ></a>
                </li>
                <li :class="ifOrder2" @click="checkIt('2')">
                  <a href="###"
                    >价格<span v-show="ifOrder2" :class="orderWay"></span
                  ></a>
                </li>
              </ul>
            </div>
          </div>
          <!-- 销售产品列表 -->
          <div class="goods-list">
            <ul class="yui3-g">
              <li class="yui3-u-1-5" v-for="goods in goodsList" :key="goods.id">
                <div class="list-wrap">
                  <div class="p-img">
                    <!-- 点击图片后跳转到详情路由组件 -->
                    <router-link
                      :to="{ name: 'detail', params: { skuid: goods.id } }"
                    >
                      <!-- 图片懒加载 -->
                      <img v-lazy="goods.defaultImg"
                    /></router-link>
                  </div>
                  <div class="price">
                    <strong>
                      <em>¥ </em>
                      <i>{{ goods.price }}.00</i>
                    </strong>
                  </div>
                  <div class="attr">
                    <a
                      target="_blank"
                      href="item.html"
                      title="促销信息，下单即赠送三个月CIBN视频会员卡！【小米电视新品4A 58 火爆预约中】"
                      >Apple苹果iPhone 6s (A1699)Apple苹果iPhone 6s
                      (A1699)Apple苹果iPhone 6s (A1699)Apple苹果iPhone 6s
                      (A1699)</a
                    >
                  </div>
                  <div class="commit">
                    <i class="command">已有<span>2000</span>人评价</i>
                  </div>
                  <div class="operate">
                    <a
                      href="success-cart.html"
                      target="_blank"
                      class="sui-btn btn-bordered btn-danger"
                      >加入购物车</a
                    >
                    <a href="javascript:void(0);" class="sui-btn btn-bordered"
                      >收藏</a
                    >
                  </div>
                </div>
              </li>
            </ul>
          </div>
          <Pagination
            :pageNo="searchParams.pageNo"
            :pageSize="searchParams.pageSize"
            :total="searchList.total"
            :continues="5"
            @getPageNo="getPageNo"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import SearchSelector from "./SearchSelector/SearchSelector";
import { mapState, mapGetters } from "vuex";
export default {
  name: "Search",
  data() {
    return {
      searchParams: {
        //一级分类ID
        category1Id: "6",
        // 二级分类ID
        category2Id: "",
        // 三级分类ID
        category3Id: "",
        // 分类名字
        categoryName: "",
        // 搜索关键字
        keyWord: "小米",
        // 排序,默认为综合：降序
        order: "1:desc",
        // 分页器，第几页
        pageNo: 2,
        // 每一页展示多少数据
        pageSize: 3,
        // 平台售卖物品属性所带的参数
        props: [],
        // 品牌
        trademark: "",
      },
    };
  },
  components: {
    SearchSelector,
  },
  beforeUpdate() {
    // console.log('beup')
  },
  updated() {
    // console.log('up')
  },
  beforeMount() {
    //页面挂载前先合并参数
    Object.assign(this.searchParams, this.$route.query, this.$route.params);
  },
  mounted() {
    //页面挂载时获取一次数据
    this.getDate();
    console.log("开始挂载");
  },
  computed: {
    ...mapState("search", { searchList: "searchList" }),
    ...mapGetters("search", ["goodsList", "trademarkList", "attrsList"]),
    ifOrder1() {
      return this.searchParams.order.includes("1") === true ? "active" : "";
    },
    ifOrder2() {
      return this.searchParams.order.includes("2") === true ? "active" : "";
    },
    orderWay() {
      //向下排序或者向上排序的图标
      return this.searchParams.order.includes("desc") === true
        ? "iconfont icon-paixu-jiangxu"
        : "iconfont icon-paixu-shengxu";
    },
  },
  watch: {
    $route() {
      //监听route，如果params和query改变了那么就合并data参数并重新派送请求
      //将之前的三级ID清空，以防带有不应该出现的ID
      this.searchParams.category1Id = "";
      this.searchParams.category2Id = "";
      this.searchParams.category3Id = "";
      Object.assign(this.searchParams, this.$route.query, this.$route.params);
      this.getDate();
    },
  },
  methods: {
    getDate() {
      //封装派发仓库函数
      this.$store.dispatch("search/searchList", this.searchParams);
    },
    delateCategoryName() {
      // 写undefined和空字符串都可以但是undefined就不会发该参数到请求里了即参数里没有这一条，更省宽带
      this.searchParams.category1Id = undefined;
      this.searchParams.category2Id = undefined;
      this.searchParams.category3Id = undefined;
      this.searchParams.categoryName = undefined;
      this.getDate();
      //同时让路由重新跳转将路径同步，query参数会清空，但是params参数不会改变
      this.$router.push({ name: "search" });
    },
    delateKeyword() {
      this.searchParams.keyWord = undefined;
      this.getDate();
      this.$bus.$emit("clear", this.keyWord);
    },
    delateTradeMark() {
      this.searchParams.trademark = undefined;
      this.getDate();
    },
    delateProp(index) {
      this.searchParams.props.splice(index, 1);
      this.getDate();
    },
    // 自定义事件回调
    goTrademark(value) {
      this.searchParams.trademark = `${value.tmId}:${value.tmName}`;
      this.getDate();
    },
    goAttr(attr, attrValue) {
      let prop = `${attr.attrId}:${attrValue}:${attr.attrName}`;
      // if (this.searchParams.props.includes(prop) == false) {//数组去重判断法
      //   this.searchParams.props.push(prop);
      // }
      this.searchParams.props.push(prop); //数组去重Set大法
      this.searchParams.props = [...new Set(this.searchParams.props)];
      this.getDate();
    },
    // 排序操作
    checkIt(value) {
      let data = this.searchParams.order;
      if (data.includes(value)) {
        //如果参数等于原有值则改变排序方式，否者就改变参数使类名跟着改变
        data.includes("desc")
          ? (this.searchParams.order = `${value}:asc`)
          : (this.searchParams.order = `${value}:desc`);
      } else {
        this.searchParams.order = `${value}:desc`;
      }
      this.getDate();
    },
    //自定义事件获取当前点击页数
    getPageNo(pageNo) {
      this.searchParams.pageNo = pageNo;
      this.getDate();
    },
  },
};
</script>

<style lang="less" scoped>
.main {
  margin: 10px 0;

  .py-container {
    width: 1200px;
    margin: 0 auto;

    .bread {
      margin-bottom: 5px;
      overflow: hidden;

      .sui-breadcrumb {
        padding: 3px 15px;
        margin: 0;
        font-weight: 400;
        border-radius: 3px;
        float: left;

        li {
          display: inline-block;
          line-height: 18px;

          a {
            color: #666;
            text-decoration: none;

            &:hover {
              color: #4cb9fc;
            }
          }
        }
      }

      .sui-tag {
        margin-top: -5px;
        list-style: none;
        font-size: 0;
        line-height: 0;
        padding: 5px 0 0;
        margin-bottom: 18px;
        float: left;

        .with-x {
          font-size: 12px;
          margin: 0 5px 5px 0;
          display: inline-block;
          overflow: hidden;
          color: #000;
          background: #f7f7f7;
          padding: 0 7px;
          height: 20px;
          line-height: 20px;
          border: 1px solid #dedede;
          white-space: nowrap;
          transition: color 400ms;
          cursor: pointer;

          i {
            margin-left: 10px;
            cursor: pointer;
            font: 400 14px tahoma;
            display: inline-block;
            height: 100%;
            vertical-align: middle;
          }

          &:hover {
            color: #28a3ef;
          }
        }
      }
    }

    .details {
      margin-bottom: 5px;

      .sui-navbar {
        overflow: visible;
        margin-bottom: 0;

        .filter {
          min-height: 40px;
          padding-right: 20px;
          background: #fbfbfb;
          border: 1px solid #e2e2e2;
          padding-left: 0;
          border-radius: 0;
          box-shadow: 0 1px 4px rgba(0, 0, 0, 0.065);

          .sui-nav {
            position: relative;
            left: 0;
            display: block;
            float: left;
            margin: 0 10px 0 0;

            li {
              float: left;
              line-height: 18px;

              a {
                display: block;
                cursor: pointer;
                padding: 11px 15px;
                color: #777;
                text-decoration: none;
                span {
                  vertical-align: -2px;
                }
              }

              &.active {
                a {
                  background: #e1251b;
                  color: #fff;
                }
              }
            }
          }
        }
      }

      .goods-list {
        margin: 20px 0;

        ul {
          display: flex;
          flex-wrap: wrap;

          li {
            height: 100%;
            width: 20%;
            margin-top: 10px;
            line-height: 28px;

            .list-wrap {
              .p-img {
                padding-left: 15px;
                width: 215px;
                height: 255px;

                a {
                  color: #666;

                  img {
                    max-width: 100%;
                    height: auto;
                    vertical-align: middle;
                  }
                }
              }

              .price {
                padding-left: 15px;
                font-size: 18px;
                color: #c81623;

                strong {
                  font-weight: 700;

                  i {
                    margin-left: -5px;
                  }
                }
              }

              .attr {
                padding-left: 15px;
                width: 85%;
                overflow: hidden;
                margin-bottom: 8px;
                min-height: 38px;
                cursor: pointer;
                line-height: 1.8;
                display: -webkit-box;
                -webkit-box-orient: vertical;
                -webkit-line-clamp: 2;

                a {
                  color: #333;
                  text-decoration: none;
                }
              }

              .commit {
                padding-left: 15px;
                height: 22px;
                font-size: 13px;
                color: #a7a7a7;

                span {
                  font-weight: 700;
                  color: #646fb0;
                }
              }

              .operate {
                padding: 12px 15px;

                .sui-btn {
                  display: inline-block;
                  padding: 2px 14px;
                  box-sizing: border-box;
                  margin-bottom: 0;
                  font-size: 12px;
                  line-height: 18px;
                  text-align: center;
                  vertical-align: middle;
                  cursor: pointer;
                  border-radius: 0;
                  background-color: transparent;
                  margin-right: 15px;
                }

                .btn-bordered {
                  min-width: 85px;
                  background-color: transparent;
                  border: 1px solid #8c8c8c;
                  color: #8c8c8c;

                  &:hover {
                    border: 1px solid #666;
                    color: #fff !important;
                    background-color: #666;
                    text-decoration: none;
                  }
                }

                .btn-danger {
                  border: 1px solid #e1251b;
                  color: #e1251b;

                  &:hover {
                    border: 1px solid #e1251b;
                    background-color: #e1251b;
                    color: white !important;
                    text-decoration: none;
                  }
                }
              }
            }
          }
        }
      }

      .page {
        width: 733px;
        height: 66px;
        overflow: hidden;
        float: right;

        .sui-pagination {
          margin: 18px 0;

          ul {
            margin-left: 0;
            margin-bottom: 0;
            vertical-align: middle;
            width: 490px;
            float: left;

            li {
              line-height: 18px;
              display: inline-block;

              a {
                position: relative;
                float: left;
                line-height: 18px;
                text-decoration: none;
                background-color: #fff;
                border: 1px solid #e0e9ee;
                margin-left: -1px;
                font-size: 14px;
                padding: 9px 18px;
                color: #333;
              }

              &.active {
                a {
                  background-color: #fff;
                  color: #e1251b;
                  border-color: #fff;
                  cursor: default;
                }
              }

              &.prev {
                a {
                  background-color: #fafafa;
                }
              }

              &.disabled {
                a {
                  color: #999;
                  cursor: default;
                }
              }

              &.dotted {
                span {
                  margin-left: -1px;
                  position: relative;
                  float: left;
                  line-height: 18px;
                  text-decoration: none;
                  background-color: #fff;
                  font-size: 14px;
                  border: 0;
                  padding: 9px 18px;
                  color: #333;
                }
              }

              &.next {
                a {
                  background-color: #fafafa;
                }
              }
            }
          }

          div {
            color: #333;
            font-size: 14px;
            float: right;
            width: 241px;
          }
        }
      }
    }
  }
}
</style>