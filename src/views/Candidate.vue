<template>
  <div class="candidate">
    <div class="avatar">
      <van-uploader :after-read="avatarRead" v-model="avatar" :max-count="1" />
      <span>{{ avatar.length ? avatar[0].file.name : "选择照片" }}</span>
    </div>
    <van-cell-group class="cells">
      <van-field label="竞选人" v-model="name" />
      <van-field label="竞选宣言" v-model="declaration" />
      <van-field label="竞选职位" readonly :value="department.name" @click="show = true" />
      <van-field type="textarea" label="个人简介" autosize v-model="introduce" />
    </van-cell-group>
    <van-button
      :disabled="!(avatar.length && declaration && department.key && introduce && name)"
      round
      type="warning"
      block
      @click="candidate"
    >添加候选人</van-button>
    <van-action-sheet
      close-on-click-action
      cancel-text="取消"
      :actions="departments"
      v-model="show"
      @select="select"
    />
  </div>
</template>

<script>
import { AddCandidate } from "./../serve/";

export default {
  name: "vote",
  data: () => ({
    name: "",
    department: {},
    introduce: "",
    declaration: "",
    avatar: [],
    show: false,
    departments: [
      { name: "科协主席", key: "president" },
      { name: "策划部部长", key: "office" },
      { name: "媒体部部长", key: "media" },
      { name: "编辑部部长", key: "editor" },
      { name: "雁祉作坊部长", key: "workshop" },
      { name: "One Echo部长", key: "onecho" }
    ]
  }),
  methods: {
    avatarRead(file) {
      this.avatar = [file];
    },
    select(ment) {
      this.department = ment;
    },
    candidate() {
      const person = new FormData();
      person.append("name", this.name);
      person.append("department", this.department.key);
      person.append("declaration", this.declaration);
      person.append("introduce", this.introduce);
      person.append("avatar", this.avatar[0].file);
      AddCandidate(person);
    }
  }
};
</script>

<style lang="less" scoped>
.candidate {
  padding: 20px;
  .avatar {
    color: white;
    margin: 0 0 10px;
    display: flex;
    align-items: center;
    span {
      word-break: break-all;
    }
  }
  .cells {
    margin-bottom: 30px;
  }
}
</style>