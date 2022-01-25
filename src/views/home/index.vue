<template>
  <div>
    <TypeNav /><listContainer /><recommend /><rank /><like /><floor
      v-for="list in floorList"
      :key="list.id"
      :list="list"
    /><brand />
  </div>
</template>

<script>
import listContainer from "./listContainer";
import recommend from "./recommend";
import rank from "./rank";
import like from "./like";
import floor from "./floor";
import brand from "./brand";
import { mapState } from "vuex";
export default {
  name: "Home",
  components: { listContainer, recommend, rank, like, floor, brand },
  mounted() {
    this.$store.dispatch("home/floorList");
    this.$store.dispatch("loginAndregister/getUserInfo");
  },
  computed: {
    ...mapState("home", { floorList: "floorList" }),
  },
};
</script>

<style>
</style>