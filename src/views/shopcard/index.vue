<template>
  <div class="cart">
    <h4>全部商品</h4>
    <div class="cart-main">
      <div class="cart-th">
        <div class="cart-th1">全部</div>
        <div class="cart-th2">商品</div>
        <div class="cart-th3">单价（元）</div>
        <div class="cart-th4">数量</div>
        <div class="cart-th5">小计（元）</div>
        <div class="cart-th6">操作</div>
      </div>
      <div class="cart-body">
        <ul class="cart-list" v-for="card in cardInfoList" :key="card.id">
          <li class="cart-list-con1">
            <input
              type="checkbox"
              name="chk_list"
              :checked="card.isChecked == 1"
              @change="changeAndUpdata(card, $event)"
            />
          </li>
          <li class="cart-list-con2">
            <img :src="card.imgUrl" />
            <div class="item-msg">{{ card.skuName }}</div>
          </li>
          <li class="cart-list-con3">
            <div class="item-txt">{{card.operateTime}}</div>
          </li>
          <li class="cart-list-con4">
            <span class="price">{{ card.skuPrice }}.00</span>
          </li>
          <li class="cart-list-con5">
            <a href="javascript:void(0)" class="mins" @click="handler(-1, card)"
              >-</a
            >
            <input
              autocomplete="off"
              type="text"
              minnum="1"
              class="itxt"
              :value="card.skuNum"
              @blur="handler($event.target.value * 1, card, 'change')"
            />
            <a href="javascript:void(0)" class="plus" @click="handler(1, card)"
              >+</a
            >
          </li>
          <li class="cart-list-con6">
            <span class="sum">{{ card.skuNum * card.skuPrice }}</span>
          </li>
          <li class="cart-list-con7">
            <a href="#none" class="sindelet" @click="deletecard(card)">删除</a>
            <br />
            <a href="#none">移到收藏</a>
          </li>
        </ul>
      </div>
    </div>
    <div class="cart-tool">
      <div class="select-all">
        <input
          class="chooseAll"
          type="checkbox"
          :checked="isAllChecked"
          @click="changeAllChecked($event)"
        />
        <span>全选</span>
      </div>
      <div class="option">
        <a href="#none" @click="deleteAllCheckedCart">删除选中的商品</a>
        <a href="#none">移到我的关注</a>
        <a href="#none">清除下柜商品</a>
      </div>
      <div class="money-box">
        <div class="chosed">
          已选择 <span>{{ checkedNum }}</span
          >件商品
        </div>
        <div class="sumprice">
          <em>总价（不含运费） ：</em>
          <i class="summoney">{{ totalPrice }}</i>
        </div>
        <div class="sumbtn">
          <a class="sum-btn" @click="$router.push('/trade')">结算</a>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters} from "vuex";
export default {
  name: "ShopCart",
  data() {
    return {
      flag: true,
    };
  },
  mounted() {
    this.getData();
  },
  computed: {
    //获取购物车数据
    ...mapGetters("shopcard", ["cardList"]),
    //获取我们需要的购物车数据
    cardInfoList() {
      return this.cardList.cartInfoList || [];
    },
    // 计算商品总价
    totalPrice() {
      let sum = 0;
      this.cardInfoList.forEach((element) => {
        sum += element.skuNum * element.skuPrice;
      });
      return sum;
    },
    // 判断产品是否全部勾选
    isAllChecked() {
      //arr.every(),遍历函数并判断每一个值是否都满足条件,返回布尔值
      return this.cardInfoList.every((item) => item.isChecked == 1);
    },
    checkedNum() {
      let num = 0;
      this.cardInfoList.forEach((item) => {
        if (item.isChecked == 1) {
          num++;
        }
      });
      return num;
    },
  },
  methods: {
    getData() {
      //当发请求是服务器会返回一个空数据，因为服务器无法分辨发送请求的用户信息，
      // 所以要在datail模块点击购物车跳转时同时带上用户ID
      this.$store.dispatch("shopcard/shopcard");
    },
    async handler(changeNum, card, type) {
      // 带过来三个参数，第一个是改变的大小，第二个是改变的产品信息，第三个是为了分辨是否是input框触发的
      if (this.flag == true) {
        this.flag = false; //节流阀，防止点击过快出现负值
        if (!Number.isInteger(Number(changeNum)))
          //判断输入的是不是整数,如果不是整数则
          changeNum = card.skuNum;
        // 如果是通过直接修改input值修改，要求出实际改变值
        if (type) changeNum = changeNum - card.skuNum;
        // 如果修改后数值将为负值则，改变值应该为0
        if (card.skuNum + changeNum < 1) changeNum = 0;
        console.log(type, changeNum, card);
        try {
          await this.$store.dispatch("detail/addToCard", {
            skuId: card.skuId,
            skuNum: changeNum,
          });
          // 刷新数据
          this.getData();
        } catch (error) {
          throw error.message;
        }
      }
    },
    deletecard(card) {
      //删除购物车商品
      try {
        this.$store.dispatch("shopcard/deletecard", card.skuId);
        this.getData();
      } catch (error) {
        throw error.message;
      }
    },
    changeAndUpdata(card, event) {
      //改变商品的勾选状态
      let isChecked = event.target.checked ? "1" : "0";
      this.$store
        .dispatch("shopcard/changecardischecked", {
          skuId: card.skuId,
          isChecked,
        })
        .then(() => this.getData())
        .catch((error) => alert(error.message));
    },
    deleteAllCheckedCart() {
      //删除所有选中的商品
      let promiseAll = []; //将所有promise整合到一个数组里去
      this.cardInfoList.forEach((item) => {
        if (item.isChecked == "1") {
          let promise = this.$store.dispatch("shopcard/deletecard", item.skuId);
          promiseAll.push(promise);
        }
      });
      //利用Promise.all方法把多个promise整合成一个整体的promise来输出，一般为一个数组
      Promise.all(promiseAll)
        .then(() => this.getData())
        .catch((error) => alert(error.message));
    },
    changeAllChecked(event) {
      //点击全选按钮改变全部的状态
      let checkedAllChange = event.target.checked == true ? 1 : 0;
      let promiseAll = []; //将所有promise整合到一个数组里去
      this.cardInfoList.forEach((item) => {
        if (item.isChecked !== checkedAllChange) {
          let promise = this.$store.dispatch("shopcard/changecardischecked", {
            skuId: item.skuId,
            isChecked: checkedAllChange,
          });
          promiseAll.push(promise);
        }
      });
      //利用Promise.all方法把多个promise整合成一个整体的promise来输出，一般为一个数组
      Promise.all(promiseAll)
        .then(() => this.getData())
        .catch((error) => alert(error.message));
    },
  },
  updated() {
    // 节流阀                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                 ```````````````````
    this.flag = true;
  },
};
</script>

<style lang="less" scoped>
.cart {
  width: 1200px;
  margin: 0 auto;

  h4 {
    margin: 9px 0;
    font-size: 14px;
    line-height: 21px;
  }

  .cart-main {
    .cart-th {
      background: #f5f5f5;
      border: 1px solid #ddd;
      padding: 10px;
      overflow: hidden;

      & > div {
        float: left;
      }

      .cart-th1 {
        width: 25%;

        input {
          vertical-align: middle;
        }

        span {
          vertical-align: middle;
        }
      }

      .cart-th2 {
        width: 25%;
      }

      .cart-th3,
      .cart-th4,
      .cart-th5,
      .cart-th6 {
        width: 12.5%;
      }
    }

    .cart-body {
      margin: 15px 0;
      border: 1px solid #ddd;

      .cart-list {
        padding: 10px;
        border-bottom: 1px solid #ddd;
        overflow: hidden;

        & > li {
          float: left;
        }

        .cart-list-con1 {
          width: 4.1667%;
        }

        .cart-list-con2 {
          width: 25%;

          img {
            width: 82px;
            height: 82px;
            float: left;
          }

          .item-msg {
            float: left;
            width: 150px;
            margin: 0 10px;
            line-height: 18px;
          }
        }

        .cart-list-con3 {
          width: 20.8333%;

          .item-txt {
            text-align: center;
          }
        }

        .cart-list-con4 {
          width: 12.5%;
        }

        .cart-list-con5 {
          width: 12.5%;

          .mins {
            border: 1px solid #ddd;
            border-right: 0;
            float: left;
            color: #666;
            width: 6px;
            text-align: center;
            padding: 8px;
          }

          input {
            border: 1px solid #ddd;
            width: 40px;
            height: 33px;
            float: left;
            text-align: center;
            font-size: 14px;
          }

          .plus {
            border: 1px solid #ddd;
            border-left: 0;
            float: left;
            color: #666;
            width: 6px;
            text-align: center;
            padding: 8px;
          }
        }

        .cart-list-con6 {
          width: 12.5%;

          .sum {
            font-size: 16px;
          }
        }

        .cart-list-con7 {
          width: 12.5%;

          a {
            color: #666;
          }
        }
      }
    }
  }

  .cart-tool {
    overflow: hidden;
    border: 1px solid #ddd;

    .select-all {
      padding: 10px;
      overflow: hidden;
      float: left;

      span {
        vertical-align: middle;
      }

      input {
        vertical-align: middle;
      }
    }

    .option {
      padding: 10px;
      overflow: hidden;
      float: left;

      a {
        float: left;
        padding: 0 10px;
        color: #666;
      }
    }

    .money-box {
      float: right;

      .chosed {
        line-height: 26px;
        float: left;
        padding: 0 10px;
      }

      .sumprice {
        width: 200px;
        line-height: 22px;
        float: left;
        padding: 0 10px;

        .summoney {
          color: #c81623;
          font-size: 16px;
        }
      }

      .sumbtn {
        float: right;

        a {
          display: block;
          position: relative;
          width: 96px;
          height: 52px;
          line-height: 52px;
          color: #fff;
          text-align: center;
          font-size: 18px;
          font-family: "Microsoft YaHei";
          background: #e1251b;
          overflow: hidden;
        }
      }
    }
  }
}
</style>