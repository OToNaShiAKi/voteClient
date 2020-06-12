<template>
  <div class="vote">
    <van-cell-group v-for="(cells, key) in departments" :key="key" :title="cells.name">
      <van-cell v-for="(card, index) in cells.cards" :key="card._id" :value="`${card.votes} 票`">
        <template #title>
          <span class="custom-title">{{card.name}}&nbsp;</span>
          <van-tag mark v-if="index === 0" type="danger">当选</van-tag>
        </template>
      </van-cell>
    </van-cell-group>
  </div>
</template>

<script>
import { VoteResult } from "./../serve/";

export default {
  name: "Vote",
  data: () => ({
    departments: {
      president: { name: "科协主席", cards: [] },
      office: { name: "策划部", cards: [] },
      media: { name: "媒体部", cards: [] },
      editor: { name: "编辑部", cards: [] },
      workshop: { name: "雁祉作坊", cards: [] },
      onecho: { name: "One Echo", cards: [] }
    }
  }),
  async created() {
    const result = await VoteResult();
    let ments = JSON.parse(JSON.stringify(this.departments));
    for (let card of result) {
      let department = card.department;
      delete card.department;
      ments[department].cards.push(card);
    }
    for (let item in ments) {
      ments[item].cards = ments[item].cards.sort((a, b) => b.votes - a.votes);
    }
    this.departments = ments;
  }
};
</script>

<style lang="less" scoped>
.vote {
  padding: 0 20px;
}
</style>