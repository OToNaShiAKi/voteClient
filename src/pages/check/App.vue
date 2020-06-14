<template>
  <div id="app">
    <h1 class="title">科协换届信息管理</h1>
    <van-cell-group @click="removeCell" title="竞选人信息">
      <van-cell
        center
        v-for="cell in candidates"
        :title="cell.name"
        :label="cell.department | ments"
        :key="cell._id"
      >
        <template #right-icon>
          <van-button data-key="candidates" :data-id="cell._id" type="danger" size="small">删除</van-button>
        </template>
      </van-cell>
    </van-cell-group>
    <van-cell-group @click="removeCell" title="投票人信息">
      <van-cell v-for="cell in voters" :title="cell.voter" :key="cell._id">
        <template #right-icon>
          <van-button data-key="voters" type="danger" :data-id="cell._id" size="small">删除</van-button>
        </template>
      </van-cell>
    </van-cell-group>
  </div>
</template>

<script>
import { GetCandidates, GetVoters, RemoveCell } from "./../../serve/";

export default {
  name: "Check",
  created() {
    GetCandidates().then(res => {
      if (res) this.candidates = res;
    });
    GetVoters().then(res => {
      if (res) this.voters = res;
    });
  },
  data: () => ({
    candidates: [],
    voters: []
  }),
  methods: {
    removeCell(event) {
      const { id, key } = event.target.dataset;
      RemoveCell(id, key).then(res => {
        if (!res) return;
        this[key] = this[key].filter(item => item._id !== id);
      });
    }
  }
};
</script>

<style lang="less" scoped>
.title {
  margin: 0;
  padding: 20px 20px 10px;
  font-size: 18px;
  line-height: 30px;
  height: 30px;
}
</style>
