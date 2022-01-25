<template>
  <div class="pagination">
    <!-- 若当前页不低于1，点击后当前页减一 -->
    <button :disabled="pageNo == 1" @click="$emit('getPageNo', pageNo - 1)">
      上一页
    </button>
    <!-- 控制前面部分是否重复，重复就隐藏 -->
    <button
      v-if="startNumAndEndNum.start > 1"
      @click="$emit('getPageNo', 1)"
      :class="pageNo == 1 ? 'active' : ''"
    >
      1
    </button>
    <button v-if="startNumAndEndNum.start > 2">···</button>

    <!-- 中间的结构,遍历对象中的数字 -->
    <button
      v-for="(num, index) in startNumAndEndNum.num"
      :key="index"
      @click="$emit('getPageNo', num + startNumAndEndNum.start - 1)"
      :class="pageNo == num + startNumAndEndNum.start - 1 ? 'active' : ''"
    >
      {{ num + startNumAndEndNum.start - 1 }}
    </button>

    <!-- 控制后面部分是否超出，超出则隐藏 -->
    <button v-if="startNumAndEndNum.end < totalPage - 1">···</button>
    <button
      v-if="startNumAndEndNum.end < totalPage"
      @click="$emit('getPageNo', totalPage)"
      :class="pageNo == totalPage ? 'active' : ''"
    >
      {{ totalPage }}
    </button>

    <button
      :disabled="pageNo == totalPage"
      @click="$emit('getPageNo', pageNo + 1)"
    >
      下一页
    </button>

    <button style="margin-left: 30px">共{{ total }}条</button>
  </div>
</template>

<script>
export default {
  name: "Pagination",
  props: ["pageNo", "pageSize", "total", "continues"],
  computed: {
    totalPage() {
      //计算出一共多少页
      return Math.ceil(this.total / this.pageSize);
    },
    startNumAndEndNum() {
      //计算出展示的起始页数和结束页数,最起码是五页
      let start = 0,
        end = 0;
      if (this.continues > this.totalPage) {
        //不正常情况，即总页数不足五页
        start = 1;
        end = this.totalPage;
      } else {
        start = this.pageNo - Math.floor(this.continues / 2);
        end = this.pageNo + Math.floor(this.continues / 2);
        if (start < 1) {
          //如果当前页数过小，起始页就可能计算出来为负值
          start = 1;
          end = this.continues;
        }
        if (end > this.totalPage) {
          //如果当前页数过大可能导致结束页超出总页数
          start = this.totalPage - this.continues + 1;
          end = this.totalPage;
        }
      }
      let num = end - start + 1; //展示的数据数
      return { start, end, num };
    },
  },
};
</script>

<style lang="less" scoped>
.pagination {
  text-align: center;
  button {
    margin: 0 5px;
    background-color: #f4f4f5;
    color: #606266;
    outline: none;
    border-radius: 2px;
    padding: 0 4px;
    vertical-align: top;
    display: inline-block;
    font-size: 13px;
    min-width: 35.5px;
    height: 28px;
    line-height: 28px;
    cursor: pointer;
    box-sizing: border-box;
    text-align: center;
    border: 0;

    &[disabled] {
      color: #c0c4cc;
      cursor: not-allowed;
    }

    &.active {
      cursor: not-allowed;
      background-color: #409eff;
      color: #fff;
    }
  }
}
</style>